<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, useSlots } from "vue";
import Icon from "../ui/Icon.vue";
import type {
  PlainTableAction,
  PlainTableColumn,
  PlainTableDensity,
  PlainTableItemKey,
  PlainTableKey,
  PlainTableLabels,
} from "./types";

const props = withDefaults(
  defineProps<{
    /** All records, column definitions, and row actions come from the parent. */
    items: T[];
    columns: PlainTableColumn<T>[];
    itemKey?: PlainTableItemKey<T>;
    density?: PlainTableDensity;
    dark?: boolean;
    theme?: string;
    height?: string | number;
    fixedHeader?: boolean;
    minWidth?: string | number;
    actions?: PlainTableAction<T>[];
    labels?: Partial<PlainTableLabels>;
    rowProps?: (item: T, index: number) => Record<string, unknown>;
    tableProps?: Record<string, unknown>;
  }>(),
  {
    itemKey: "id" as never,
    density: "default",
    dark: false,
    fixedHeader: false,
    minWidth: 660,
    actions: () => [],
    tableProps: () => ({}),
  },
);

const emit = defineEmits<{
  action: [key: string, item: T, index: number];
  "row-click": [item: T, index: number, event: MouseEvent];
}>();
const slots = useSlots();
const L = computed<PlainTableLabels>(() => ({
  tableAria: "Table",
  actions: "Actions",
  empty: "No records found.",
  ...props.labels,
}));
const hasActions = computed(
  () => props.actions.length > 0 || Boolean(slots["row-actions"]),
);
const columnCount = computed(() =>
  Math.max(1, props.columns.length + (hasActions.value ? 1 : 0)),
);

function cssSize(value: string | number | undefined) {
  return typeof value === "number" ? `${value}px` : value;
}

function keyOf(item: T, index: number): PlainTableKey {
  if (typeof props.itemKey === "function") return props.itemKey(item, index);
  const value = item[props.itemKey];
  return typeof value === "string" || typeof value === "number" ? value : index;
}

function valueOf(column: PlainTableColumn<T>, item: T, index: number): unknown {
  if (typeof column.value === "function") return column.value(item, index);
  const path = column.value ?? column.key;
  return path.split(".").reduce((value: any, key) => value?.[key], item);
}

function displayValue(column: PlainTableColumn<T>, item: T, index: number) {
  const value = valueOf(column, item, index);
  return column.format
    ? column.format(value, item, index)
    : String(value ?? "");
}

function cellProps(column: PlainTableColumn<T>, item: T, index: number) {
  return typeof column.cellProps === "function"
    ? column.cellProps(item, index)
    : column.cellProps;
}

function availableActions(item: T) {
  return props.actions.filter((action) => action.visible?.(item) ?? true);
}

function actionLabel(action: PlainTableAction<T>, item: T) {
  return typeof action.label === "function" ? action.label(item) : action.label;
}

function actionDisabled(action: PlainTableAction<T>, item: T) {
  return typeof action.disabled === "function"
    ? action.disabled(item)
    : Boolean(action.disabled);
}
</script>

<template>
  <v-table
    :theme="dark ? 'dark' : theme"
    :density="density"
    :height="height"
    :fixed-header="fixedHeader"
    :aria-label="L.tableAria"
    :class="[
      'plain-table',
      'b4-sample-table',
      { 'plain-table--dark': dark, 'b4-dark-table': dark },
    ]"
    :style="{ '--plain-table-min-width': cssSize(minWidth) }"
    v-bind="tableProps"
  >
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.key"
          :class="column.headerClass"
          :style="{ textAlign: column.align, width: cssSize(column.width) }"
          scope="col"
          v-bind="column.headerProps"
        >
          <slot :name="'header.' + column.key" :column="column">{{
            column.title
          }}</slot>
        </th>
        <th v-if="hasActions" scope="col">
          <slot name="actions-header"
            ><span class="plain-table-sr-only">{{ L.actions }}</span></slot
          >
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, index) in items" :key="keyOf(item, index)">
        <slot name="row" :item="item" :index="index" :columns="columns">
          <tr
            v-bind="rowProps?.(item, index)"
            @click="emit('row-click', item, index, $event)"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              :class="column.cellClass"
              :style="{ textAlign: column.align }"
              v-bind="cellProps(column, item, index)"
            >
              <slot
                :name="'cell.' + column.key"
                :item="item"
                :index="index"
                :column="column"
                :value="valueOf(column, item, index)"
                >{{ displayValue(column, item, index) }}</slot
              >
            </td>
            <td v-if="hasActions">
              <slot name="row-actions" :item="item" :index="index">
                <v-btn
                  v-for="action in availableActions(item)"
                  :key="action.key"
                  :icon="Boolean(action.icon)"
                  :variant="action.variant || 'text'"
                  :color="action.color"
                  :disabled="actionDisabled(action, item)"
                  :aria-label="actionLabel(action, item)"
                  :size="action.icon ? 30 : 'small'"
                  @click.stop="emit('action', action.key, item, index)"
                >
                  <Icon v-if="action.icon" :name="action.icon" :size="17" />
                  <template v-else>{{ actionLabel(action, item) }}</template>
                </v-btn>
              </slot>
            </td>
          </tr>
        </slot>
      </template>
      <tr v-if="!items.length">
        <td :colspan="columnCount" class="plain-table-empty">
          <slot name="empty">{{ L.empty }}</slot>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="slots.footer">
      <slot name="footer" :columns="columns" :columnCount="columnCount" />
    </tfoot>
  </v-table>
</template>

<style scoped>
.plain-table {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
  overflow: hidden;
}
.plain-table :deep(table) {
  min-width: var(--plain-table-min-width, 660px);
}
.plain-table th {
  height: 52px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}
.plain-table td {
  height: 78px;
  padding: 12px 18px;
  font-size: 13px;
  white-space: nowrap;
}
.plain-table.v-table--density-compact td {
  height: 54px;
  padding-block: 8px;
}
.plain-table.v-table--density-comfortable td {
  height: 65px;
  padding-block: 10px;
}
.plain-table.v-table--fixed-header th {
  background: rgb(var(--v-theme-surface));
}
.plain-table--dark {
  background: #29343d;
  color: #eaeff4;
}
.plain-table-empty {
  text-align: center;
  white-space: normal !important;
}
.plain-table-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
