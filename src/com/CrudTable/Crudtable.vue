<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, ref, useSlots } from "vue";
import TableCard from "../ui/TableCard.vue";
import {
  confirmDemo,
  notify as defaultNotify,
  required as requiredRule,
} from "../../composables/useFeedback";
import type {
  CrudField,
  CrudId,
  CrudLabels,
  CrudMode,
  CrudRule,
} from "./types";

const props = withDefaults(
  defineProps<{
    /** Single source of truth: drives the form AND the table columns. */
    fields: CrudField<T>[];
    /** Card title. Defaults to the plural entity name. */
    title?: string;
    /** Singular name used in default texts ("dessert"). */
    entity?: string;
    entityPlural?: string;
    /** Property that uniquely identifies a record. */
    itemKey?: Extract<keyof T, string>;
    /** Property (or function) used to name a record in dialogs / aria labels. */
    itemLabel?: Extract<keyof T, string> | ((item: T) => string);
    labels?: Partial<CrudLabels>;
    searchable?: boolean;
    pageSize?: number;
    pageSizeOptions?: Array<number | { value: number; title: string }>;
    sortBy?: Array<{ key: string; order?: "asc" | "desc" }>;
    /** Hides add / edit / delete. */
    readonly?: boolean;
    canEdit?: (item: T) => boolean;
    canDelete?: (item: T) => boolean;
    /** Override id generation for new records. */
    createId?: (items: T[]) => CrudId;
    /** Validate / transform / persist before the list changes. Return false to cancel. */
    beforeSave?: (record: T, mode: CrudMode) => T | false | Promise<T | false>;
    /** Defaults to confirmDemo from useFeedback. */
    confirm?: (title: string, message: string) => boolean | Promise<boolean>;
    /** Defaults to notify from useFeedback. */
    notify?: (message: string) => void;
    /** Warning banner under the table (e.g. storage errors). */
    warning?: string | null;
    /** Extra props forwarded to <v-data-table>. */
    tableProps?: Record<string, unknown>;
  }>(),
  {
    title: "",
    entity: "item",
    itemKey: "id" as never,
    searchable: true,
    pageSize: 10,
    pageSizeOptions: () => [5, 10, { value: -1, title: "All" }],
    sortBy: () => [],
    readonly: false,
    warning: null,
    tableProps: () => ({}),
  },
);

const items = defineModel<T[]>({ required: true });

const emit = defineEmits<{
  create: [item: T];
  update: [item: T, previous: T];
  delete: [item: T];
}>();

const slots = useSlots();

const open = ref(false);
const form = ref<{ validate: () => Promise<{ valid: boolean }> } | null>(null);
const draft = ref<Record<string, any>>({});
const editingKey = ref<CrudId | null>(null);
const page = ref(1);
const size = ref(props.pageSize);
const search = ref("");

/* ---------- labels ---------- */

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const L = computed<CrudLabels>(() => {
  const one = props.entity;
  const many = props.entityPlural ?? `${one}s`;
  return {
    heading: cap(many),
    add: "Add New Item",
    newTitle: "New Item",
    editTitle: "Edit Item",
    save: "Save",
    cancel: "Cancel",
    actions: "Actions",
    search: `Search ${many}`,
    empty: `No ${many} found. Add a new item or clear your search.`,
    tableAria: `${cap(one)} CRUD table`,
    closeEditor: `Close ${one} editor`,
    editAria: (name) => `Edit ${name}`,
    deleteAria: (name) => `Delete ${name}`,
    deleteTitle: (name) => `Delete ${name}?`,
    deleteMessage: `This permanently removes the ${one}.`,
    saved: `${cap(one)} saved.`,
    deleted: `${cap(one)} deleted.`,
    ...props.labels,
  };
});

/* ---------- fields, columns, rules ---------- */

const tableFields = computed(() =>
  props.fields.filter((f) => f.showInTable !== false),
);
const formFields = computed(() =>
  props.fields.filter((f) => f.showInForm !== false),
);

const headers = computed(() => [
  ...tableFields.value.map((f) => ({
    title: f.header ?? f.label,
    key: f.key,
    sortable: f.sortable !== false,
    align: f.align,
  })),
  ...(props.readonly
    ? []
    : [{ title: L.value.actions, key: "actions", sortable: false }]),
]);

/** Only forward `cell.<key>` slots the parent actually provides. */
const cellSlots = computed(() =>
  tableFields.value
    .filter((f) => slots[`cell.${f.key}`])
    .map((f) => ({ own: `cell.${f.key}`, host: `item.${f.key}` })),
);

function numberRule(f: CrudField<T>): CrudRule {
  const { min, max } = f;
  const message =
    min === 0 && max === undefined
      ? "Enter a non-negative number."
      : min !== undefined && max !== undefined
        ? `Enter a number between ${min} and ${max}.`
        : min !== undefined
          ? `Enter a number of at least ${min}.`
          : max !== undefined
            ? `Enter a number of at most ${max}.`
            : "Enter a valid number.";
  return (v) =>
    (v !== "" &&
      v !== null &&
      v !== undefined &&
      Number.isFinite(Number(v)) &&
      (min === undefined || Number(v) >= min) &&
      (max === undefined || Number(v) <= max)) ||
    message;
}

function buildRules(f: CrudField<T>): CrudRule[] {
  const list: CrudRule[] = [];
  if (f.required) list.push(requiredRule);
  if (f.type === "number") list.push(numberRule(f));
  if (f.maxLength) {
    const max = f.maxLength;
    list.push(
      (v) => String(v ?? "").length <= max || `Use ${max} characters or fewer.`,
    );
  }
  return [...list, ...(f.rules ?? [])];
}

// Cached so inputs don't receive a fresh rules array on every render.
const rulesByKey = computed(() =>
  Object.fromEntries(formFields.value.map((f) => [f.key, buildRules(f)])),
);

function controlProps(f: CrudField<T>) {
  const wide = f.wide ?? f.type === "textarea";
  return {
    label: f.label,
    rules: rulesByKey.value[f.key],
    hideDetails: "auto",
    class: wide ? "crud-wide b4-wide" : undefined,
    ...(f.type === "number"
      ? { type: "number", min: f.min, max: f.max, step: f.step ?? "any" }
      : {}),
    ...(f.type === "date" ? { type: "date" } : {}),
    ...(f.type === "select" ? { items: f.items ?? [] } : {}),
    ...f.props,
  };
}

function defaultFor(f: CrudField<T>): unknown {
  if (f.default !== undefined)
    return typeof f.default === "function" ? f.default() : f.default;
  if (f.type === "number") return 0;
  if (f.type === "switch") return false;
  if (f.type === "select") return null;
  return "";
}

/* ---------- helpers ---------- */

const allowEdit = (item: T) => props.canEdit?.(item) ?? true;
const allowDelete = (item: T) => props.canDelete?.(item) ?? true;

function labelOf(item: T): string {
  const l = props.itemLabel;
  if (typeof l === "function") return l(item);
  const key =
    l ??
    props.fields.find((f) => !f.type || f.type === "text")?.key ??
    props.itemKey;
  return String(item[key] ?? item[props.itemKey]);
}

function nextId(list: T[]): CrudId {
  const keys = list.map((i) => i[props.itemKey]);
  if (keys.every((k) => typeof k === "number"))
    return (keys as number[]).reduce((max, k) => Math.max(max, k), 0) + 1;
  return (
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
}

function normalize(src: Record<string, any>): T {
  const out = { ...src };
  for (const f of formFields.value) {
    const v = out[f.key];
    if (f.type === "number") out[f.key] = Number(v);
    else if (
      typeof v === "string" &&
      (!f.type || f.type === "text" || f.type === "textarea")
    )
      out[f.key] = v.trim();
  }
  return out as T;
}

function clampPage() {
  const per = size.value < 1 ? items.value.length || 1 : size.value;
  page.value = Math.min(
    page.value,
    Math.max(1, Math.ceil(items.value.length / per)),
  );
}

/* ---------- actions ---------- */

function openEditor(item?: T) {
  editingKey.value = item ? item[props.itemKey] : null;
  draft.value = item
    ? { ...item }
    : Object.fromEntries(formFields.value.map((f) => [f.key, defaultFor(f)]));
  open.value = true;
}

async function save() {
  if (!form.value || !(await form.value.validate()).valid) return;
  const key = props.itemKey;
  const mode: CrudMode = editingKey.value === null ? "create" : "update";

  let record = normalize(draft.value);
  if (props.beforeSave) {
    const next = await props.beforeSave(record, mode);
    if (next === false) return;
    record = next;
  }

  if (mode === "update") {
    const previous = items.value.find((i) => i[key] === editingKey.value);
    items.value = items.value.map((i) =>
      i[key] === editingKey.value ? record : i,
    );
    emit("update", record, previous as T);
  } else {
    if (record[key] === undefined || record[key] === null || record[key] === "")
      (record as Record<string, any>)[key] = (props.createId ?? nextId)(
        items.value,
      );
    items.value = [...items.value, record];
    emit("create", record);
  }

  open.value = false;
  (props.notify ?? defaultNotify)(L.value.saved);
}

async function remove(item: T) {
  const ok = await (props.confirm ?? confirmDemo)(
    L.value.deleteTitle(labelOf(item)),
    L.value.deleteMessage,
  );
  if (!ok) return;
  items.value = items.value.filter(
    (i) => i[props.itemKey] !== item[props.itemKey],
  );
  clampPage();
  emit("delete", item);
  (props.notify ?? defaultNotify)(L.value.deleted);
}

defineExpose({ openEditor, remove });
</script>

<template>
  <TableCard :title="title || L.heading">
    <div class="crud-toolbar b4-crud-toolbar">
      <h3>{{ L.heading }}</h3>
      <slot name="toolbar" :open-editor="openEditor" />
      <v-btn v-if="!readonly" color="primary" @click="openEditor()">{{
        L.add
      }}</v-btn>
    </div>

    <v-text-field
      v-if="searchable"
      v-model="search"
      :label="L.search"
      density="compact"
      class="my-4"
      @update:model-value="page = 1"
    />

    <v-data-table
      v-model:page="page"
      v-model:items-per-page="size"
      :headers="headers"
      :items="items"
      :item-value="itemKey"
      :search="search"
      :sort-by="sortBy"
      :items-per-page-options="pageSizeOptions"
      :mobile="false"
      class="crud-data-table b4-data-table"
      :aria-label="L.tableAria"
      v-bind="tableProps"
    >
      <template v-for="c in cellSlots" #[c.host]="slotProps">
        <slot :name="c.own" v-bind="slotProps" />
      </template>

      <template #item.actions="{ item }">
        <div class="crud-row-actions b4-row-actions">
          <slot name="row-actions" :item="item" />
          <v-btn
            v-if="allowEdit(item)"
            icon
            variant="text"
            size="32"
            color="primary"
            :aria-label="L.editAria(labelOf(item))"
            @click="openEditor(item)"
          >
            <Icon name="edit" :size="17" />
          </v-btn>
          <v-btn
            v-if="allowDelete(item)"
            icon
            variant="text"
            size="32"
            color="error"
            :aria-label="L.deleteAria(labelOf(item))"
            @click="remove(item)"
          >
            <Icon name="trash" :size="17" />
          </v-btn>
        </div>
      </template>

      <template #no-data>
        <slot name="empty">
          <div class="pa-6">{{ L.empty }}</div>
        </slot>
      </template>
    </v-data-table>

    <v-alert v-if="warning" type="warning" variant="tonal" class="mt-4">{{
      warning
    }}</v-alert>

    <v-dialog v-model="open" max-width="560">
      <v-card class="dialog-body">
        <div class="dialog-title">
          <h2>{{ editingKey === null ? L.newTitle : L.editTitle }}</h2>
          <v-btn
            icon
            variant="text"
            :aria-label="L.closeEditor"
            @click="open = false"
          >
            <Icon name="close" />
          </v-btn>
        </div>

        <v-form ref="form" @submit.prevent="save">
          <div class="crud-fields b4-dessert-fields">
            <template v-for="f in formFields" :key="f.key">
              <slot
                :name="'field.' + f.key"
                :field="f"
                :draft="draft"
                :props="controlProps(f)"
              >
                <v-select
                  v-if="f.type === 'select'"
                  v-model="draft[f.key]"
                  v-bind="controlProps(f)"
                />
                <v-textarea
                  v-else-if="f.type === 'textarea'"
                  v-model="draft[f.key]"
                  v-bind="controlProps(f)"
                />
                <v-switch
                  v-else-if="f.type === 'switch'"
                  v-model="draft[f.key]"
                  v-bind="controlProps(f)"
                />
                <v-text-field
                  v-else
                  v-model="draft[f.key]"
                  v-bind="controlProps(f)"
                />
              </slot>
            </template>
            <slot name="form-append" :draft="draft" />
          </div>

          <div class="dialog-actions">
            <v-btn variant="text" @click="open = false">{{ L.cancel }}</v-btn>
            <v-btn color="primary" type="submit">{{ L.save }}</v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </TableCard>
</template>
