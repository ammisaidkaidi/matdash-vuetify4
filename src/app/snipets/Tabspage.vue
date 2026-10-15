<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Tabs/Tabs.vue";
import type { TabsContext } from "../../com/Tabs/types";
import UiPage from "../../com/ui/UiPage.vue";
import TabExample from "../../com/ui/TabExample.vue";

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: TabsContext = __viewReactive({
  get TabExample() {
    return __viewUnref(TabExample);
  },
  contentConfig: {
    texts: {
      tabs: "Tabs",
    },
    values: {
      items1: [
        "Basic",
        "Stacked",
        "Center Active",
        "Custom Icons",
        "Align Center",
        "Align End",
        "Icon",
        "Disabled",
        "Colors",
      ],
    },
  },
});
</script>

<template>
  <PresentationalView :context="__viewContext">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </PresentationalView>
</template>
