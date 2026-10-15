<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Icon from "../../com/ui/Icon.vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import DataTables from "../../com/DataTables/DataTables.vue";
import type {
  DataTableColumn,
  DataTableFilter,
  DataTableSelectStrategy,
  DataTableSort,
} from "../../com/DataTables/types";
import {
  projectRows,
  projectHeaders,
  budgetLabel,
  statusColor,
  gpuRows,
} from "../../data/table-seed";

interface Project {
  id: number;
  name: string;
  project: string;
  post: string;
  status: string;
  budget: number;
  selectable: boolean;
  description: string;
}

interface GraphicsCard {
  id: number;
  name: string;
  price: number;
  rating: number;
  stock: boolean;
}

/** Demo-only switches: these never enter the reusable component's data layer. */
interface ProjectExample {
  id: string;
  title: string;
  selection?: boolean;
  showValues?: boolean;
  selectable?: boolean;
  strategy?: boolean;
  sort?: DataTableSort[];
  multi?: boolean;
  dense?: boolean;
  chips?: boolean;
  expand?: boolean;
  customHeaders?: boolean;
  slotRow?: boolean;
  external?: boolean;
  filter?: "basic" | "upper";
  group?: boolean;
  pageSize?: number;
}

const route = useRoute();
const kind = computed(() => route.path.split("/").at(-1) || "basic");
const titles: Record<string, string> = {
  basic: "Basic Data Tables",
  header: "Data Table Headers",
  selection: "Data Tables Selection",
  sorting: "Data Table Sorting",
  pagination: "Data Table Pagination",
  filtering: "Data Table Filtering",
  grouping: "Data Tables Grouping",
  slots: "Data Table Slots",
};
const pageTitle = computed(() => titles[kind.value] || "Data Tables");

const rows = projectRows as unknown as Project[];
const graphicsCards = gpuRows as unknown as GraphicsCard[];
const columns: DataTableColumn<Project>[] = projectHeaders.map((header) => ({
  ...header,
  align: header.align as "start" | "center" | "end" | undefined,
}));
const customColumns: DataTableColumn<Project>[] = [
  columns[0],
  columns[2],
  { title: "Project", key: "project" },
  columns[3],
  columns[4],
];
const graphicsColumns: DataTableColumn<GraphicsCard>[] = [
  { title: "Name", key: "name" },
  { title: "Image", key: "image", sortable: false },
  { title: "Price", key: "price" },
  { title: "Rating", key: "rating" },
  { title: "Stock", key: "stock" },
];
const upperRows = rows.map((item) =>
  item.id === 5 ? { ...item, name: "MICHEL DOE" } : item,
);
const strategies: DataTableSelectStrategy[] = ["single", "page", "all"];
const upperCaseFilter: DataTableFilter = (value, search) =>
  String(value ?? "")
    .toUpperCase()
    .includes(String(search));

const examples = computed<ProjectExample[]>(() => {
  switch (kind.value) {
    case "basic":
      return [
        { id: "basic", title: "Basic Table" },
        { id: "selection", title: "Selection", selection: true },
        { id: "density", title: "Density", dense: true },
        { id: "item", title: "Item", chips: true },
        { id: "expand", title: "Expandable Rows", expand: true, pageSize: 10 },
      ];
    case "header":
      return [{ id: "header", title: "Column Slot", customHeaders: true }];
    case "selection":
      return [
        { id: "selection-basic", title: "Basic Selection", selection: true },
        {
          id: "selection-values",
          title: "Selected Values",
          selection: true,
          showValues: true,
        },
        {
          id: "selection-disabled",
          title: "Selectable Rows",
          selection: true,
          selectable: true,
        },
        {
          id: "selection-strategy",
          title: "Select Strategies",
          selection: true,
          strategy: true,
        },
      ];
    case "sorting":
      return [
        {
          id: "sort-basic",
          title: "Basic Sorting",
          sort: [{ key: "name", order: "desc" }],
        },
        {
          id: "sort-multi",
          title: "Multi Sorting",
          multi: true,
          sort: [
            { key: "project", order: "asc" },
            { key: "post", order: "asc" },
          ],
        },
      ];
    case "pagination":
      return [
        { id: "pagination", title: "External Pagination", external: true },
      ];
    case "filtering":
      return [
        { id: "filter-basic", title: "Basic Filter", filter: "basic" },
        { id: "filter-upper", title: "Custom Filter", filter: "upper" },
      ];
    case "grouping":
      return [{ id: "grouping", title: "Grouping", group: true }];
    default:
      return [{ id: "slots", title: "Item Slot", slotRow: true, pageSize: 10 }];
  }
});

function propsFor(example: ProjectExample) {
  return {
    title: example.title,
    items: example.filter === "upper" ? upperRows : rows,
    columns: example.customHeaders || example.group ? customColumns : columns,
    itemLabel: "name" as const,
    selection: Boolean(example.selection),
    showSelectedValues: Boolean(example.showValues),
    selectedValue: (item: Project) => item.name,
    itemSelectable: example.selectable ? ("selectable" as const) : undefined,
    selectionHint: example.selectable
      ? "Cancelled projects cannot be selected."
      : "",
    strategyOptions: example.strategy ? strategies : [],
    sortBy: example.sort || [],
    multiSort: Boolean(example.multi),
    showSortValues: Boolean(example.sort),
    density: example.dense ? ("compact" as const) : ("default" as const),
    expandable: Boolean(example.expand),
    externalPagination: Boolean(example.external),
    searchable: Boolean(example.filter),
    customFilter: example.filter === "upper" ? upperCaseFilter : undefined,
    filterHint:
      example.filter === "upper"
        ? "Only uppercase queries match this custom filter. Try MICHEL or ACTIVE."
        : "",
    groupBy: example.group ? [{ key: "status", order: "asc" as const }] : [],
    pageSize: example.pageSize || 5,
    labels: {
      search:
        example.filter === "upper" ? "Search (UPPER CASE ONLY)" : "Search",
      tableAria: example.title,
    },
  };
}
</script>

<template>
  <WorkspacePage :title="pageTitle" class="b4-page" data-batch="4">
    <div class="b4-table-stack">
      <DataTables
        v-for="example in examples"
        :key="example.id"
        v-bind="propsFor(example)"
      >
        <template #cell.budget="{ item }">{{
          budgetLabel(item.budget)
        }}</template>

        <template v-if="example.chips" #cell.status="{ item }">
          <v-chip :color="statusColor(item.status)" size="small" rounded="sm">
            {{ item.status }}
          </v-chip>
        </template>

        <template v-if="example.customHeaders" #header.project="{ column }">
          <span class="b4-custom-column">
            <Icon name="folder" :size="15" />{{ column.title }}
          </span>
        </template>

        <template v-if="example.expand" #expanded="{ item }">
          <h3>{{ item.project }}</h3>
          <p>{{ item.description }}</p>
          <small
            >Assigned to {{ item.name }} · Budget
            {{ budgetLabel(item.budget) }}</small
          >
        </template>

        <template v-if="example.slotRow" #row="{ item }">
          <tr class="b4-slotted-row">
            <td>
              <strong>{{ item.name }}</strong>
            </td>
            <td>{{ item.project }}</td>
            <td>{{ item.post }}</td>
            <td>
              <span
                :class="'b4-status-text text-' + statusColor(item.status)"
                >{{ item.status }}</span
              >
            </td>
            <td class="text-right">{{ budgetLabel(item.budget) }}</td>
          </tr>
        </template>
      </DataTables>

      <DataTables
        v-if="kind === 'filtering'"
        title="Filterable"
        :items="graphicsCards"
        :columns="graphicsColumns"
        item-label="name"
        :filter-keys="['name']"
        :page-size="10"
        :page-size-options="[5, 10]"
        :labels="{ tableAria: 'Graphics card table' }"
      >
        <template #toolbar="{ search, setSearch }">
          <div class="b4-gpu-toolbar">
            <h3>My Table</h3>
            <v-text-field
              :model-value="search"
              label="Search graphics cards"
              density="compact"
              clearable
              @update:model-value="setSearch"
            />
          </div>
        </template>

        <template #cell.image="{ item }">
          <svg
            width="80"
            height="45"
            viewBox="0 0 120 64"
            role="img"
            :aria-label="item.name + ' illustration'"
          >
            <rect x="8" y="10" width="104" height="44" rx="6" fill="#29343d" />
            <rect x="15" y="52" width="48" height="6" fill="#dbc26c" />
            <circle
              v-for="x in [39, 82]"
              :key="x"
              :cx="x"
              cy="32"
              r="17"
              fill="#526174"
            />
            <circle
              v-for="x in [39, 82]"
              :key="'in' + x"
              :cx="x"
              cy="32"
              r="10"
              fill="#182436"
            />
            <circle
              v-for="x in [39, 82]"
              :key="'center' + x"
              :cx="x"
              cy="32"
              r="4"
              fill="#16cdc7"
            />
          </svg>
        </template>
        <template #cell.price="{ item }">${{ item.price.toFixed(2) }}</template>
        <template #cell.rating="{ item }">
          <v-rating
            :model-value="item.rating"
            readonly
            color="warning"
            size="19"
            density="compact"
          />
        </template>
        <template #cell.stock="{ item }">
          <v-chip
            :color="item.stock ? 'success' : 'error'"
            size="small"
            rounded="sm"
          >
            {{ item.stock ? "IN STOCK" : "OUT OF STOCK" }}
          </v-chip>
        </template>
        <template #footer>
          <p class="field-help mt-3">
            Only product names are searchable in this filter-key example. Images
            are generic graphics-card illustrations.
          </p>
        </template>
      </DataTables>
    </div>
  </WorkspacePage>
</template>
