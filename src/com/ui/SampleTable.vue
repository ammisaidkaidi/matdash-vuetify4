<script setup>
import { ref, computed } from "vue";
import {
  projectRows,
  customerRows,
  authors,
  budgetLabel,
  statusColor,
} from "../../data/table-seed";
import { avatar } from "../../data/app-seed";
const props = defineProps({
  kind: { type: String, default: "projects" },
  dark: Boolean,
  density: { type: String, default: "default" },
  height: [Number, String],
  fixed: Boolean,
  full: Boolean,
  actions: Boolean,
});
const selected = ref(null);
const rows = computed(() =>
  props.kind === "projects"
    ? props.full
      ? [
          ...projectRows.slice(1, 4),
          projectRows[0],
          projectRows[4],
          { ...projectRows[0], id: 11, name: "John Deo" },
        ]
      : projectRows.slice(0, 5)
    : props.kind === "authors"
      ? props.full
        ? authors
        : authors.slice(0, 5)
      : customerRows,
);
const columns = computed(
  () =>
    ({
      projects: ["Users", "Project Name", "Team", "Status", "Budget"],
      users: ["User", "Project Name", "Users", "Status"],
      customers: ["Customer", "Status", "Email Address", "Teams"],
      invoices: ["Invoice", "Status", "Customer", "Progress"],
      authors: ["Authors", "Courses", "Users"],
    })[props.kind],
);
</script>
<template>
  <v-table
    :theme="dark ? 'dark' : undefined"
    :class="['b4-sample-table', { 'b4-dark-table': dark }]"
    :density="density"
    :height="height"
    :fixed-header="fixed"
    :aria-label="kind + ' example table'"
    ><thead>
      <tr>
        <th v-for="column in columns" :key="column">{{ column }}</th>
        <th v-if="actions"><span class="b3-sr-only">Actions</span></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="row.id">
        <template v-if="kind === 'projects'"
          ><td>
            <div class="b4-person">
              <v-avatar size="40"
                ><img :src="row.avatar" :alt="row.name"
              /></v-avatar>
              <div>
                <strong>{{ row.name }}</strong
                ><small>{{ row.post }}</small>
              </div>
            </div>
          </td>
          <td>{{ row.project }}</td>
          <td>
            <div class="b4-team">
              <v-avatar
                v-for="(letter, i) in row.team"
                :key="i"
                :color="['primary', 'secondary', 'error'][i % 3]"
                size="29"
                >{{ letter }}</v-avatar
              >
            </div>
          </td>
          <td>
            <v-chip
              :color="statusColor(row.status)"
              size="small"
              rounded="sm"
              >{{ row.status }}</v-chip
            >
          </td>
          <td>{{ budgetLabel(row.budget) }}</td></template
        ><template v-else-if="kind === 'users'"
          ><td>
            <div class="b4-person">
              <v-avatar size="38"
                ><img :src="row.avatar" :alt="row.name" /></v-avatar
              ><strong>{{ row.name }}</strong>
            </div>
          </td>
          <td>{{ row.project }}</td>
          <td>
            <div class="b4-team">
              <v-avatar v-for="n in (index % 3) + 2" :key="n" size="28"
                ><img
                  :src="avatar(((index + n) % 10) + 1)"
                  alt="Sample team member"
              /></v-avatar>
            </div>
          </td>
          <td>
            <v-chip
              :color="statusColor(row.projectStatus)"
              size="small"
              rounded="sm"
              >{{ row.projectStatus }}</v-chip
            >
          </td></template
        ><template v-else-if="kind === 'customers'"
          ><td>
            <div class="b4-person">
              <v-avatar size="38"
                ><img :src="row.avatar" :alt="row.name"
              /></v-avatar>
              <div>
                <strong>{{ row.name }}</strong
                ><small>{{ row.handle }}</small>
              </div>
            </div>
          </td>
          <td>
            <v-chip
              :color="row.status === 'active' ? 'success' : 'grey'"
              size="small"
              rounded="sm"
              ><Icon name="circle" :size="10" class="mr-1" />{{
                row.status
              }}</v-chip
            >
          </td>
          <td>{{ row.email }}</td>
          <td>
            <div class="b4-tags">
              <v-chip
                v-for="(team, i) in row.teams"
                :key="team"
                :color="['primary', 'secondary', 'error'][i % 3]"
                variant="tonal"
                rounded="sm"
                size="small"
                >{{ team }}</v-chip
              >
            </div>
          </td></template
        ><template v-else-if="kind === 'invoices'"
          ><td>
            <strong>{{ row.invoice }}</strong>
          </td>
          <td>
            <v-chip
              :color="statusColor(row.invoiceStatus)"
              size="small"
              rounded="sm"
              >{{ row.invoiceStatus }}</v-chip
            >
          </td>
          <td>
            <div class="b4-person">
              <v-avatar size="38"
                ><img :src="row.avatar" :alt="row.name"
              /></v-avatar>
              <div>
                <strong>{{ row.name }}</strong
                ><small>{{ row.email }}</small>
              </div>
            </div>
          </td>
          <td>
            <div class="b4-progress">
              <v-progress-linear
                :model-value="row.progress"
                color="primary"
                height="5"
                rounded
              /><span>{{ row.progress }}%</span>
            </div>
          </td></template
        ><template v-else
          ><td>
            <div class="b4-person">
              <v-avatar size="42" rounded="lg"
                ><img :src="row.image" :alt="row.name"
              /></v-avatar>
              <div>
                <strong>{{ row.name }}</strong
                ><small>{{ row.subtitle }}</small>
              </div>
            </div>
          </td>
          <td>
            <div class="b4-tags">
              <v-chip
                v-for="(course, i) in row.courses"
                :key="course"
                :color="['error', 'primary', 'success'][(index + i) % 3]"
                rounded="sm"
                size="small"
                >{{ course }}</v-chip
              >
            </div>
          </td>
          <td>{{ row.users }} Users</td></template
        >
        <td v-if="actions">
          <v-btn
            icon
            variant="text"
            size="30"
            :aria-label="
              'Details for ' + (kind === 'invoices' ? row.invoice : row.name)
            "
            @click="selected = row"
            ><Icon name="more" :size="17"
          /></v-btn>
        </td>
      </tr></tbody></v-table
  ><v-dialog :model-value="!!selected" @update:model-value="selected = null"
    ><v-card v-if="selected" class="dialog-body"
      ><h2>{{ selected.name }}</h2>
      <p class="my-4">
        {{ selected.project || selected.subtitle || selected.invoice }} · Sample
        table record
      </p>
      <p v-if="selected.email">{{ selected.email }}</p>
      <div class="dialog-actions">
        <v-btn color="primary" @click="selected = null">Close</v-btn>
      </div></v-card
    ></v-dialog
  >
</template>
