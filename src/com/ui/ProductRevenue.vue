<script setup>
import { ref, computed } from "vue";
import { productSets } from "../../data/dashboard";
const tab = ref("App"),
  period = ref("Sept 2025"),
  selected = ref(null);
const rows = computed(() =>
  productSets[tab.value].map((p) => ({
    ...p,
    budget:
      p.budget *
      (period.value === "Sept 2025"
        ? 1
        : period.value === "Oct 2025"
          ? 1.08
          : 1.16),
  })),
);
</script>
<template>
  <v-card class="workspace-card b3-revenue-products"
    ><div class="b3-list-heading mt-0">
      <h2>Revenue by Product</h2>
      <v-select
        v-model="period"
        :items="['Sept 2025', 'Oct 2025', 'Nov 2025']"
        aria-label="Revenue period"
        density="compact"
      />
    </div>
    <v-tabs v-model="tab" color="primary" class="mb-3"
      ><v-tab
        v-for="name in Object.keys(productSets)"
        :key="name"
        :value="name"
        >{{ name }}</v-tab
      ></v-tabs
    ><v-table
      ><thead>
        <tr>
          <th>Assigned</th>
          <th>Progress</th>
          <th>Priority</th>
          <th>Budget</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in rows" :key="p.name">
          <td>
            <button class="b3-product-person" @click="selected = p">
              <img
                :src="'/assets/product-' + p.image + '.jpg'"
                :alt="p.name"
              /><span
                ><strong>{{ p.name }}</strong
                ><small>{{ p.person }}</small></span
              >
            </button>
          </td>
          <td>{{ p.progress }}%</td>
          <td>
            <v-chip :color="p.color" size="small">{{ p.priority }}</v-chip>
          </td>
          <td>${{ (p.budget / 1000).toFixed(1) }}K</td>
        </tr>
      </tbody></v-table
    ></v-card
  ><v-dialog :model-value="!!selected" @update:model-value="selected = null"
    ><v-card v-if="selected" class="dialog-body"
      ><h2>{{ selected.name }}</h2>
      <p class="my-4">
        Assigned to {{ selected.person }} · {{ selected.progress }}% complete
      </p>
      <p>Sample budget: ${{ selected.budget.toLocaleString() }}</p>
      <div class="dialog-actions">
        <v-btn @click="selected = null">Close</v-btn
        ><v-btn color="primary" to="/apps/kanban">Open project board</v-btn>
      </div></v-card
    ></v-dialog
  >
</template>
