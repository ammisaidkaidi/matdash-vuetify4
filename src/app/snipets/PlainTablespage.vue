<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Icon from "../../com/ui/Icon.vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import TableCard from "../../com/ui/TableCard.vue";
import PlainTables from "../../com/PlainTables/PlainTables.vue";
import type {
  PlainTableAction,
  PlainTableColumn,
  PlainTableDensity,
} from "../../com/PlainTables/types";
import {
  projectRows,
  customerRows,
  authors,
  budgetLabel,
  statusColor,
} from "../../data/table-seed";
import { avatar } from "../../data/app-seed";

/** Records are demo configuration, not part of the reusable table interface. */
interface DemoRecord {
  id: string | number;
  name: string;
  avatar?: string;
  post?: string;
  project?: string;
  team?: string[];
  status?: string;
  budget?: number;
  handle?: string;
  email?: string;
  teams?: string[];
  projectStatus?: string;
  progress?: number;
  invoice?: string;
  invoiceStatus?: string;
  subtitle?: string;
  image?: string;
  courses?: string[];
  users?: number;
}

type ExampleKind = "projects" | "users" | "customers" | "invoices" | "authors";
interface TableExample {
  id: string;
  kind: ExampleKind;
  items: DemoRecord[];
  columns: PlainTableColumn<DemoRecord>[];
  actions: PlainTableAction<DemoRecord>[];
  dark?: boolean;
  height?: number;
  fixedHeader?: boolean;
  density: PlainTableDensity;
}

const route = useRoute();
const kind = computed(() => route.path.split("/").at(-1) || "basic");
const titles: Record<string, string> = {
  basic: "Basic Table",
  dark: "Dark Table",
  density: "Density Table",
  "fixed-header": "Fixed Header Table",
  height: "Height Table",
};
const pageTitle = computed(() => titles[kind.value] || "Height Table");
const cardTitle = computed(() =>
  kind.value === "fixed-header" ? "Header Fixed Table" : pageTitle.value,
);
const density = ref<PlainTableDensity>("compact");
const selected = ref<DemoRecord | null>(null);
const detailsOpen = computed({
  get: () => selected.value !== null,
  set: (value: boolean) => {
    if (!value) selected.value = null;
  },
});

const projects = projectRows as unknown as DemoRecord[];
const customers = customerRows as unknown as DemoRecord[];
const authorRecords = authors as unknown as DemoRecord[];
const fullProjects: DemoRecord[] = [
  ...projects.slice(1, 4),
  projects[0],
  projects[4],
  { ...projects[0], id: 11, name: "John Deo" },
];
const columnsByKind: Record<ExampleKind, PlainTableColumn<DemoRecord>[]> = {
  projects: [
    { key: "name", title: "Users" },
    { key: "project", title: "Project Name" },
    { key: "team", title: "Team" },
    { key: "status", title: "Status" },
    {
      key: "budget",
      title: "Budget",
      format: (value) => budgetLabel(Number(value ?? 0)),
    },
  ],
  users: [
    { key: "name", title: "User" },
    { key: "project", title: "Project Name" },
    { key: "users", title: "Users" },
    { key: "projectStatus", title: "Status" },
  ],
  customers: [
    { key: "name", title: "Customer" },
    { key: "status", title: "Status" },
    { key: "email", title: "Email Address" },
    { key: "teams", title: "Teams" },
  ],
  invoices: [
    { key: "invoice", title: "Invoice" },
    { key: "invoiceStatus", title: "Status" },
    { key: "name", title: "Customer" },
    { key: "progress", title: "Progress" },
  ],
  authors: [
    { key: "name", title: "Authors" },
    { key: "courses", title: "Courses" },
    { key: "users", title: "Users" },
  ],
};

function example(
  exampleKind: ExampleKind,
  options: {
    full?: boolean;
    actions?: boolean;
    dark?: boolean;
    height?: number;
    fixedHeader?: boolean;
    density?: PlainTableDensity;
  } = {},
): TableExample {
  const items =
    exampleKind === "projects"
      ? options.full
        ? fullProjects
        : projects.slice(0, 5)
      : exampleKind === "authors"
        ? options.full
          ? authorRecords
          : authorRecords.slice(0, 5)
        : customers;
  return {
    id: exampleKind,
    kind: exampleKind,
    items,
    columns: columnsByKind[exampleKind],
    density: options.density || "default",
    dark: options.dark,
    height: options.height,
    fixedHeader: options.fixedHeader,
    actions: options.actions
      ? [
          {
            key: "details",
            icon: "more",
            label: (item) =>
              `Details for ${exampleKind === "invoices" ? item.invoice : item.name}`,
          },
        ]
      : [],
  };
}

const examples = computed<TableExample[]>(() => {
  switch (kind.value) {
    case "basic":
      return [
        example("projects"),
        example("users", { actions: true }),
        example("customers", { actions: true }),
        example("invoices", { actions: true }),
        example("authors", { actions: true }),
      ];
    case "dark":
      return [example("projects", { dark: true, full: true })];
    case "density":
      return [example("users", { density: density.value })];
    case "fixed-header":
      return [example("customers", { fixedHeader: true, height: 320 })];
    default:
      return [example("authors", { full: true, actions: true, height: 320 })];
  }
});

function subtitleFor(exampleKind: ExampleKind, item: DemoRecord) {
  if (exampleKind === "projects") return item.post;
  if (exampleKind === "customers") return item.handle;
  if (exampleKind === "invoices") return item.email;
  if (exampleKind === "authors") return item.subtitle;
  return "";
}

function handleAction(action: string, item: DemoRecord) {
  if (action === "details") selected.value = item;
}
</script>

<template>
  <WorkspacePage :title="pageTitle" class="b4-page" data-batch="4">
    <TableCard :title="cardTitle">
      <template v-if="kind === 'density'" #actions>
        <v-select
          v-model="density"
          :items="['default', 'comfortable', 'compact']"
          label="Row density"
          density="compact"
          class="b4-density-control"
        />
      </template>

      <PlainTables
        v-for="(table, tableIndex) in examples"
        :key="table.id"
        :items="table.items"
        :columns="table.columns"
        :actions="table.actions"
        :dark="table.dark"
        :density="table.density"
        :height="table.height"
        :fixed-header="table.fixedHeader"
        :labels="{ tableAria: table.kind + ' example table' }"
        :class="{ 'mt-8': tableIndex > 0 }"
        @action="handleAction"
      >
        <template #cell.name="{ item }">
          <div class="b4-person">
            <v-avatar
              :size="
                table.kind === 'authors'
                  ? 42
                  : table.kind === 'projects'
                    ? 40
                    : 38
              "
              :rounded="table.kind === 'authors' ? 'lg' : undefined"
              ><img
                :src="table.kind === 'authors' ? item.image : item.avatar"
                :alt="item.name"
            /></v-avatar>
            <div>
              <strong>{{ item.name }}</strong>
              <small v-if="subtitleFor(table.kind, item)">{{
                subtitleFor(table.kind, item)
              }}</small>
            </div>
          </div>
        </template>

        <template #cell.team="{ item }">
          <div class="b4-team">
            <v-avatar
              v-for="(letter, index) in item.team"
              :key="index"
              :color="['primary', 'secondary', 'error'][index % 3]"
              size="29"
              >{{ letter }}</v-avatar
            >
          </div>
        </template>

        <template #cell.users="{ item, index }">
          <div v-if="table.kind === 'users'" class="b4-team">
            <v-avatar v-for="n in (index % 3) + 2" :key="n" size="28">
              <img
                :src="avatar(((index + n) % 10) + 1)"
                alt="Sample team member"
              />
            </v-avatar>
          </div>
          <template v-else>{{ item.users }} Users</template>
        </template>

        <template #cell.status="{ item }">
          <v-chip
            :color="
              table.kind === 'customers'
                ? item.status === 'active'
                  ? 'success'
                  : 'grey'
                : statusColor(item.status)
            "
            size="small"
            rounded="sm"
          >
            <Icon
              v-if="table.kind === 'customers'"
              name="circle"
              :size="10"
              class="mr-1"
            />
            {{ item.status }}
          </v-chip>
        </template>
        <template #cell.projectStatus="{ item }">
          <v-chip
            :color="statusColor(item.projectStatus)"
            size="small"
            rounded="sm"
            >{{ item.projectStatus }}</v-chip
          >
        </template>
        <template #cell.invoiceStatus="{ item }">
          <v-chip
            :color="statusColor(item.invoiceStatus)"
            size="small"
            rounded="sm"
            >{{ item.invoiceStatus }}</v-chip
          >
        </template>
        <template #cell.invoice="{ item }"
          ><strong>{{ item.invoice }}</strong></template
        >

        <template #cell.teams="{ item }">
          <div class="b4-tags">
            <v-chip
              v-for="(team, index) in item.teams"
              :key="team"
              :color="['primary', 'secondary', 'error'][index % 3]"
              variant="tonal"
              rounded="sm"
              size="small"
              >{{ team }}</v-chip
            >
          </div>
        </template>
        <template #cell.courses="{ item, index }">
          <div class="b4-tags">
            <v-chip
              v-for="(course, courseIndex) in item.courses"
              :key="course"
              :color="
                ['error', 'primary', 'success'][(index + courseIndex) % 3]
              "
              rounded="sm"
              size="small"
              >{{ course }}</v-chip
            >
          </div>
        </template>
        <template #cell.progress="{ item }">
          <div class="b4-progress">
            <v-progress-linear
              :model-value="item.progress"
              color="primary"
              height="5"
              rounded
            />
            <span>{{ item.progress }}%</span>
          </div>
        </template>
      </PlainTables>
    </TableCard>

    <v-dialog v-model="detailsOpen">
      <v-card v-if="selected" class="dialog-body">
        <h2>{{ selected.name }}</h2>
        <p class="my-4">
          {{ selected.project || selected.subtitle || selected.invoice }} ·
          Sample table record
        </p>
        <p v-if="selected.email">{{ selected.email }}</p>
        <div class="dialog-actions">
          <v-btn color="primary" @click="selected = null">Close</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </WorkspacePage>
</template>
