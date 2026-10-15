<script setup lang="ts">
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import CrudTable from "../../com/CrudTable/Crudtable.vue";
import type { CrudField, CrudLabels } from "../../com/CrudTable/types";
import { tableDemos, tableStorageError } from "../../composables/useTableDemos";

interface Dessert {
  id: number;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

const fields: CrudField<Dessert>[] = [
  {
    key: "name",
    label: "Dessert name",
    header: "Dessert (100g serving)",
    required: true,
    maxLength: 100,
    wide: true,
  },
  { key: "calories", label: "Calories", type: "number", min: 0 },
  { key: "fat", label: "Fat (g)", type: "number", min: 0 },
  { key: "carbs", label: "Carbs (g)", type: "number", min: 0 },
  { key: "protein", label: "Protein (g)", type: "number", min: 0 },
];

const labels: Partial<CrudLabels> = {
  heading: "My Crud Table",
  saved: "Dessert saved locally.",
  deleted: "Dessert deleted locally.",
  deleteMessage: "This removes only the dessert record stored in this browser.",
};
</script>

<template>
  <WorkspacePage title="CRUD Table" class="b4-page" data-batch="4">
    <CrudTable
      v-model="tableDemos.desserts"
      title="Crud Table"
      entity="dessert"
      :fields="fields"
      :labels="labels"
      :sort-by="[{ key: 'calories', order: 'asc' }]"
      :warning="tableStorageError"
    />
  </WorkspacePage>
</template>
