<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import type { TabsContext } from "./types";

defineProps<{ context: TabsContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.tabs"
    ><div class="example-stack">
      <component
        :is="context.TabExample"
        v-for="title in context.contentConfig.values.items1"
        :key="title"
        :title="title"
      /></div
  ></UiPage>
</template>
