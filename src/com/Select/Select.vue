<script setup lang="ts">
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { SelectContext } from "./types";

defineProps<{ context: SelectContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.select"
    ><div class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.basic"
        ><v-select
          v-model="context.model.basic"
          :items="context.items"
          :label="context.contentConfig.texts.selectItem"
          density="comfortable"
          clearable /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.readOnly"
        ><v-select
          v-model="context.model.read"
          :items="context.items"
          :label="context.contentConfig.texts.readOnlyItem"
          density="comfortable"
          readonly /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.multiple"
        ><v-select
          v-model="context.model.multiple"
          :items="context.items"
          :label="context.contentConfig.texts.selectMultiple"
          multiple
          :hint="context.contentConfig.texts.pickYourFavoriteStates"
          persistent-hint
          hide-details="auto"
          density="comfortable" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.chips"
        ><v-select
          v-model="context.model.chips"
          :items="context.items"
          :label="context.contentConfig.texts.selectRegions"
          multiple
          chips
          closable-chips
          :hint="context.contentConfig.texts.whatAreTheTargetRegions"
          persistent-hint
          hide-details="auto"
          density="comfortable" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.density" wide
        ><div class="control-stack">
          <v-select
            v-for="(d, i) in context.contentConfig.values.items1"
            :key="d"
            v-model="context.model.densities[i]"
            :items="context.items"
            :label="d[0].toUpperCase() + d.slice(1)"
            :density="d"
          /></div
      ></ExampleCard></div
  ></FormPage>
</template>
