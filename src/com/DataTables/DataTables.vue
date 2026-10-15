<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, ref, useSlots, watch } from "vue";
import { VPagination } from "vuetify/components";
import Icon from "../ui/Icon.vue";
import TableCard from "../ui/TableCard.vue";
import type {
  DataTableColumn,
  DataTableDensity,
  DataTableFilter,
  DataTableGroup,
  DataTableItemLabel,
  DataTableItemSelectable,
  DataTableKey,
  DataTableLabels,
  DataTableOptions,
  DataTablePageSizeOption,
  DataTableSelectStrategy,
  DataTableSort,
} from "./types";

const props = withDefaults(
  defineProps<{
    /** Records and columns are always supplied by the parent. */
    items: T[];
    columns: DataTableColumn<T>[];
    title?: string;
    itemKey?: Extract<keyof T, string>;
    itemLabel?: DataTableItemLabel<T>;
    selection?: boolean;
    itemSelectable?: DataTableItemSelectable<T>;
    selectStrategy?: DataTableSelectStrategy;
    /** A nonempty list displays the strategy selector. */
    strategyOptions?: DataTableSelectStrategy[];
    showSelectionSummary?: boolean;
    showSelectedValues?: boolean;
    selectedValue?: (item: T) => unknown;
    selectionHint?: string;
    sortBy?: DataTableSort[];
    multiSort?: boolean;
    showSortValues?: boolean;
    density?: DataTableDensity;
    expandable?: boolean;
    groupBy?: DataTableGroup[];
    searchable?: boolean;
    initialSearch?: string;
    customFilter?: DataTableFilter;
    filterKeys?: string[];
    filterHint?: string;
    pageSize?: number;
    pageSizeOptions?: DataTablePageSizeOption[];
    externalPagination?: boolean;
    externalPageSizeOptions?: DataTablePageSizeOption[];
    labels?: Partial<DataTableLabels>;
    /** Extra native Vuetify table props, such as height or fixedHeader. */
    tableProps?: Record<string, unknown>;
  }>(),
  {
    title: "",
    itemKey: "id" as never,
    selection: false,
    selectStrategy: "page",
    strategyOptions: () => [],
    showSelectionSummary: true,
    showSelectedValues: false,
    selectionHint: "",
    sortBy: () => [],
    multiSort: false,
    showSortValues: false,
    density: "default",
    expandable: false,
    groupBy: () => [],
    searchable: false,
    initialSearch: "",
    filterHint: "",
    pageSize: 5,
    pageSizeOptions: () => [5, 10, { value: -1, title: "All" }],
    externalPagination: false,
    externalPageSizeOptions: () => [1, 2, 5, 10],
    tableProps: () => ({}),
  },
);

const selected = defineModel<DataTableKey[]>("selected", { default: () => [] });
const expanded = defineModel<DataTableKey[]>("expanded", { default: () => [] });

const emit = defineEmits<{
  "selection-change": [keys: DataTableKey[], items: T[]];
  "expansion-change": [keys: DataTableKey[]];
  "options-change": [options: DataTableOptions];
}>();

const slots = useSlots();
const page = ref(1);
const size = ref(props.pageSize);
const query = ref(props.initialSearch);
const sortBy = ref<DataTableSort[]>([...props.sortBy]);
const strategy = ref<DataTableSelectStrategy>(props.selectStrategy);

const L = computed<DataTableLabels>(() => ({
  search: "Search",
  tableAria: props.title || "Data table",
  empty: "No matching records.",
  selectionStrategy: "Selection strategy",
  strategyHelp: (value) =>
    ({
      single: "One row at a time.",
      page: "Select all applies to the current page.",
      all: "Select all includes every page.",
    })[value],
  selectedCount: (count) => `${count} selected`,
  clearSelection: "Clear selection",
  itemsPerPage: "Items per page",
  pagination: "Table pages",
  expandRow: (name) => `Expand row for ${name}`,
  collapseRow: (name) => `Collapse row for ${name}`,
  expandGroup: (name) => `Expand ${name} group`,
  collapseGroup: (name) => `Collapse ${name} group`,
  expandedEmpty: "No additional details provided.",
  ...props.labels,
}));

/** Parent-facing cell.<key> and header.<key> slots map to native slots. */
const cellSlots = computed(() =>
  props.columns
    .filter((column) => slots[`cell.${column.key}`])
    .map((column) => ({
      own: `cell.${column.key}`,
      host: `item.${column.key}`,
    })),
);
const headerSlots = computed(() =>
  props.columns
    .filter((column) => slots[`header.${column.key}`])
    .map((column) => ({
      own: `header.${column.key}`,
      host: `header.${column.key}`,
    })),
);

const selectedRows = computed(() =>
  props.items.filter((item) => selected.value.includes(item[props.itemKey])),
);
const selectedValues = computed(() =>
  selectedRows.value.map((item) =>
    props.selectedValue ? props.selectedValue(item) : labelOf(item),
  ),
);

function labelOf(item: T): string {
  if (typeof props.itemLabel === "function") return props.itemLabel(item);
  const key = props.itemLabel ?? props.columns[0]?.key ?? props.itemKey;
  return String(item[key] ?? item[props.itemKey] ?? "");
}

function setSearch(value: unknown) {
  query.value = String(value ?? "");
}

function clearSelection() {
  selected.value = [];
}

function resetSearch() {
  query.value = "";
  page.value = 1;
}

function clampPage() {
  const perPage = size.value < 1 ? props.items.length || 1 : size.value;
  page.value = Math.min(
    page.value,
    Math.max(1, Math.ceil(props.items.length / Math.max(1, perPage))),
  );
}

watch(
  () => props.pageSize,
  (value) => (size.value = value),
);
watch(() => props.initialSearch, setSearch);
watch(
  () => props.selectStrategy,
  (value) => (strategy.value = value),
);
watch(
  () => props.sortBy,
  (value) => (sortBy.value = [...value]),
  { deep: true },
);
watch(() => props.items.length, clampPage);
watch([size, query], () => (page.value = 1));
watch(strategy, clearSelection);
watch(
  selected,
  (value) => emit("selection-change", [...value], selectedRows.value),
  {
    deep: true,
  },
);
watch(expanded, (value) => emit("expansion-change", [...value]), {
  deep: true,
});
watch(
  [page, size, query, sortBy, strategy],
  () =>
    emit("options-change", {
      page: page.value,
      pageSize: size.value,
      search: query.value,
      sortBy: [...sortBy.value],
      selectStrategy: strategy.value,
    }),
  { deep: true },
);

defineExpose({ clearSelection, resetSearch });
</script>

<template>
  <TableCard :title="title">
    <template v-if="slots.actions" #actions>
      <slot name="actions" :selected="selected" :selectedItems="selectedRows" />
    </template>

    <slot
      name="toolbar"
      :search="query"
      :setSearch="setSearch"
      :selected="selected"
      :selectedItems="selectedRows"
      :clearSelection="clearSelection"
    />

    <div v-if="searchable" class="data-table-filter b4-filter">
      <v-text-field
        :model-value="query"
        :label="L.search"
        variant="outlined"
        density="comfortable"
        clearable
        @update:model-value="setSearch"
      >
        <template #prepend-inner><Icon name="search" :size="18" /></template>
      </v-text-field>
      <p v-if="filterHint" class="field-help">{{ filterHint }}</p>
    </div>

    <div v-if="strategyOptions.length" class="data-table-strategy b4-strategy">
      <v-select
        v-model="strategy"
        :items="strategyOptions"
        :label="L.selectionStrategy"
      />
      <p class="field-help">{{ L.strategyHelp(strategy) }}</p>
    </div>

    <v-data-table
      v-model="selected"
      v-model:expanded="expanded"
      v-model:sort-by="sortBy"
      v-model:page="page"
      v-model:items-per-page="size"
      :headers="columns"
      :items="items"
      :item-value="itemKey"
      :show-select="selection"
      :item-selectable="itemSelectable"
      :select-strategy="strategy"
      :show-expand="expandable"
      :multi-sort="multiSort"
      :density="density"
      :search="query"
      :custom-filter="customFilter"
      :filter-keys="filterKeys"
      :items-per-page-options="pageSizeOptions"
      :group-by="groupBy"
      :mobile="false"
      :aria-label="L.tableAria"
      class="data-table b4-data-table"
      v-bind="tableProps"
    >
      <template v-for="cell in cellSlots" #[cell.host]="slotProps">
        <slot :name="cell.own" v-bind="slotProps" />
      </template>
      <template v-for="header in headerSlots" #[header.host]="slotProps">
        <slot :name="header.own" v-bind="slotProps" />
      </template>

      <template v-if="slots.row" #item="slotProps">
        <slot name="row" v-bind="slotProps" />
      </template>

      <template
        v-if="expandable"
        #item.data-table-expand="{
          item,
          internalItem,
          isExpanded,
          toggleExpand,
        }"
      >
        <v-btn
          icon
          variant="text"
          size="small"
          :aria-label="
            isExpanded(internalItem)
              ? L.collapseRow(labelOf(item))
              : L.expandRow(labelOf(item))
          "
          :aria-expanded="isExpanded(internalItem)"
          @click.stop="toggleExpand(internalItem)"
        >
          <Icon
            :name="isExpanded(internalItem) ? 'down' : 'right'"
            :size="18"
          />
        </v-btn>
      </template>
      <template v-if="expandable" #expanded-row="slotProps">
        <tr class="data-table-expanded-row b4-expanded-row">
          <td :colspan="slotProps.columns.length">
            <slot name="expanded" v-bind="slotProps">
              <p>{{ L.expandedEmpty }}</p>
            </slot>
          </td>
        </tr>
      </template>

      <template v-if="groupBy.length" #group-header="slotProps">
        <slot name="group-header" v-bind="slotProps">
          <tr class="data-table-group-row b4-group-row">
            <td :colspan="slotProps.columns.length">
              <v-btn
                variant="text"
                :aria-label="
                  slotProps.isGroupOpen(slotProps.item)
                    ? L.collapseGroup(String(slotProps.item.value ?? ''))
                    : L.expandGroup(String(slotProps.item.value ?? ''))
                "
                :aria-expanded="slotProps.isGroupOpen(slotProps.item)"
                @click="slotProps.toggleGroup(slotProps.item)"
              >
                <Icon
                  :name="
                    slotProps.isGroupOpen(slotProps.item) ? 'down' : 'right'
                  "
                  :size="17"
                  class="mr-3"
                />
                {{ slotProps.item.value }} ({{ slotProps.item.items.length }})
              </v-btn>
            </td>
          </tr>
        </slot>
      </template>

      <template #no-data>
        <slot name="empty"
          ><div class="pa-6">{{ L.empty }}</div></slot
        >
      </template>

      <template v-if="externalPagination" #bottom="{ pageCount }">
        <v-pagination
          v-model="page"
          :length="Math.max(1, pageCount || 1)"
          :total-visible="5"
          :aria-label="L.pagination"
          color="primary"
          class="my-4"
        />
        <v-select
          v-model="size"
          :label="L.itemsPerPage"
          :items="externalPageSizeOptions"
          variant="outlined"
          density="comfortable"
          class="data-table-page-size"
        />
      </template>
    </v-data-table>

    <div
      v-if="selection && showSelectionSummary"
      class="data-table-selection-summary b4-selection-summary"
      role="status"
    >
      <span
        >{{ L.selectedCount(selected.length)
        }}{{ selectionHint ? " · " + selectionHint : "" }}</span
      >
      <v-btn
        v-if="selected.length"
        size="small"
        variant="text"
        color="primary"
        @click="clearSelection"
        >{{ L.clearSelection }}</v-btn
      >
    </div>
    <pre
      v-if="showSelectedValues"
      class="data-table-code-output b4-code-output"
      >{{ JSON.stringify(selectedValues, null, 2) }}</pre>
    <pre v-if="showSortValues" class="data-table-code-output b4-code-output">{{
      JSON.stringify(sortBy, null, 2)
    }}</pre>

    <slot name="footer" :selected="selected" :selectedItems="selectedRows" />
  </TableCard>
</template>

<style scoped>
.data-table-filter {
  max-width: 460px;
  margin-bottom: 20px;
}
.data-table-strategy {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}
.data-table-strategy > .v-select {
  max-width: 240px;
}
.data-table-selection-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
}
.data-table-code-output {
  padding: 16px;
  overflow: auto;
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.04);
}
.data-table-expanded-row td {
  padding: 24px;
}
.data-table-group-row td {
  background: rgba(var(--v-theme-on-surface), 0.03);
}
.data-table-page-size {
  max-width: 220px;
}
@media (max-width: 600px) {
  .data-table-strategy {
    align-items: stretch;
    flex-direction: column;
    gap: 8px;
  }
  .data-table-strategy > .v-select {
    max-width: none;
  }
  .data-table-selection-summary {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
