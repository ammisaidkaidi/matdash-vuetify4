<script setup lang="ts">
import { VTreeview } from "vuetify/components";
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { TreeviewContext } from "./types";

defineProps<{ context: TreeviewContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.treeview" data-batch="3"
    ><div class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.basic"
        ><v-treeview
          :items="context.items"
          item-value="id"
          density="compact" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.activatable"
        ><v-treeview
          v-model:activated="context.active"
          :items="context.items"
          item-value="id"
          activatable
          color="primary"
          density="compact"
        />
        <p v-if="context.active.length" class="text-primary text-caption mt-3">
          {{ context.contentConfig.texts.selected
          }}{{ context.find(context.items, context.active[0]) }}
        </p></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.color"
        ><v-treeview
          :items="context.items"
          item-value="id"
          activatable
          color="secondary"
          base-color="secondary"
          density="compact" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.density"
        ><v-treeview
          :items="context.items"
          item-value="id"
          density="comfortable" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.openAll" wide
        ><v-treeview
          :items="context.items"
          item-value="id"
          open-all
          density="compact"
      /></ExampleCard></div
  ></FormPage>
</template>
