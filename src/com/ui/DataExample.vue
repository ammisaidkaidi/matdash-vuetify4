<script setup>
import { ref, computed, watch } from "vue";
import { VPagination } from "vuetify/components";
import TableCard from "./TableCard.vue";
import {
  projectRows,
  projectHeaders,
  budgetLabel,
  statusColor,
} from "../../data/table-seed";
const props = defineProps({
  title: String,
  selection: Boolean,
  showValues: Boolean,
  selectable: Boolean,
  strategy: Boolean,
  sort: Array,
  multi: Boolean,
  dense: Boolean,
  chips: Boolean,
  expand: Boolean,
  customHeaders: Boolean,
  slotRow: Boolean,
  external: Boolean,
  filter: String,
  group: Boolean,
  pageSize: { type: Number, default: 5 },
});
const selected = ref([]),
  expanded = ref([]),
  sortBy = ref(props.sort || []),
  page = ref(1),
  size = ref(props.pageSize),
  query = ref(""),
  strategy = ref("page");
const headers = computed(() =>
  props.customHeaders || props.group
    ? [
        projectHeaders[0],
        projectHeaders[2],
        { title: "Project", key: "project" },
        projectHeaders[3],
        projectHeaders[4],
      ]
    : projectHeaders,
);
const items = computed(() =>
  props.filter === "upper"
    ? projectRows.map((p) => (p.id === 5 ? { ...p, name: "MICHEL DOE" } : p))
    : projectRows,
);
const names = computed(() =>
  items.value.filter((p) => selected.value.includes(p.id)).map((p) => p.name),
);
const filterFunction = (value, search) =>
  String(value ?? "")
    .toUpperCase()
    .includes(String(search));
const externalCount = computed(() =>
  Math.max(
    1,
    Math.ceil(items.value.length / Math.max(1, Number(size.value) || 1)),
  ),
);
watch([size, query], () => (page.value = 1));
watch(strategy, () => (selected.value = []));
</script>
<template>
  <TableCard :title="title"
    ><div v-if="filter" class="b4-filter">
      <v-text-field
        v-model="query"
        :label="filter === 'upper' ? 'Search (UPPER CASE ONLY)' : 'Search'"
        variant="outlined"
        density="comfortable"
        clearable
        @update:model-value="query = query || ''"
        ><template #prepend-inner><Icon name="search" :size="18" /></template
      ></v-text-field>
      <p v-if="filter === 'upper'" class="field-help">
        Only uppercase queries match this custom filter. Try MICHEL or ACTIVE.
      </p>
    </div>
    <div v-if="props.strategy" class="b4-strategy">
      <v-select
        v-model="strategy"
        :items="['single', 'page', 'all']"
        label="Selection strategy"
      />
      <p class="field-help">
        {{
          strategy === "single"
            ? "One row at a time."
            : strategy === "all"
              ? "Select all includes every page."
              : "Select all applies to the current page."
        }}
      </p>
    </div>
    <v-data-table
      v-model="selected"
      v-model:expanded="expanded"
      v-model:sort-by="sortBy"
      v-model:page="page"
      v-model:items-per-page="size"
      :headers="headers"
      :items="items"
      item-value="id"
      :show-select="selection"
      :item-selectable="selectable ? 'selectable' : undefined"
      :select-strategy="props.strategy ? strategy : 'page'"
      :show-expand="expand"
      :multi-sort="multi"
      :density="dense ? 'compact' : 'default'"
      :search="query"
      :custom-filter="filter === 'upper' ? filterFunction : undefined"
      :hide-default-footer="external"
      :items-per-page-options="[5, 10, { value: -1, title: 'All' }]"
      :group-by="group ? [{ key: 'status', order: 'asc' }] : []"
      :mobile="false"
      class="b4-data-table"
      :aria-label="title"
      ><template #item.budget="{ item }">{{
        budgetLabel(item.budget)
      }}</template
      ><template
        v-if="expand"
        #item.data-table-expand="{
          item,
          internalItem,
          isExpanded,
          toggleExpand,
        }"
        ><v-btn
          icon
          variant="text"
          size="small"
          :aria-label="
            (isExpanded(internalItem)
              ? 'Collapse row for '
              : 'Expand row for ') + item.name
          "
          :aria-expanded="isExpanded(internalItem)"
          @click.stop="toggleExpand(internalItem)"
          ><Icon
            :name="isExpanded(internalItem) ? 'down' : 'right'"
            :size="18" /></v-btn
      ></template>
      <template v-if="chips" #item.status="{ item }"
        ><v-chip :color="statusColor(item.status)" size="small" rounded="sm">{{
          item.status
        }}</v-chip></template
      ><template v-if="customHeaders" #header.project="{ column }"
        ><span class="b4-custom-column"
          ><Icon name="folder" :size="15" />{{ column.title }}</span
        ></template
      ><template v-if="expand" #expanded-row="{ columns, item }"
        ><tr class="b4-expanded-row">
          <td :colspan="columns.length">
            <h3>{{ item.project }}</h3>
            <p>{{ item.description }}</p>
            <small
              >Assigned to {{ item.name }} · Budget
              {{ budgetLabel(item.budget) }}</small
            >
          </td>
        </tr></template
      ><template
        v-if="group"
        #group-header="{ item, columns, toggleGroup, isGroupOpen }"
        ><tr class="b4-group-row">
          <td :colspan="columns.length">
            <v-btn
              variant="text"
              :aria-label="
                (isGroupOpen(item) ? 'Collapse ' : 'Expand ') +
                item.value +
                ' group'
              "
              :aria-expanded="isGroupOpen(item)"
              @click="toggleGroup(item)"
              ><Icon
                :name="isGroupOpen(item) ? 'down' : 'right'"
                :size="17"
                class="mr-3"
              />{{ item.value }} ({{ item.items.length }})</v-btn
            >
          </td>
        </tr></template
      ><template v-if="slotRow" #item="{ item }"
        ><tr class="b4-slotted-row">
          <td>
            <strong>{{ item.name }}</strong>
          </td>
          <td>{{ item.project }}</td>
          <td>{{ item.post }}</td>
          <td>
            <span :class="'b4-status-text text-' + statusColor(item.status)">{{
              item.status
            }}</span>
          </td>
          <td class="text-right">{{ budgetLabel(item.budget) }}</td>
        </tr></template
      ><template #no-data
        ><div class="pa-6">No matching records.</div></template
      ></v-data-table
    ><template v-if="external"
      ><v-pagination
        v-model="page"
        :length="externalCount"
        :total-visible="5"
        color="primary"
        class="my-4" /><v-select
        v-model="size"
        label="Items per page"
        :items="[1, 2, 5, 10]"
        variant="outlined"
        density="comfortable"
    /></template>
    <div v-if="selection" class="b4-selection-summary" role="status">
      <span
        >{{ selected.length }} selected{{
          selectable ? " · Cancelled projects cannot be selected." : ""
        }}</span
      ><v-btn
        v-if="selected.length"
        size="small"
        variant="text"
        color="primary"
        @click="selected = []"
        >Clear selection</v-btn
      >
    </div>
    <pre v-if="showValues" class="b4-code-output">{{
      JSON.stringify(names, null, 2)
    }}</pre>
    <pre v-if="sort" class="b4-code-output">{{
      JSON.stringify(sortBy, null, 2)
    }}</pre>
  </TableCard>
</template>
