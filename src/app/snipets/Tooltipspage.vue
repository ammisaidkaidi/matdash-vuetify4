<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Tooltips/Tooltips.vue";
import type { TooltipsContext } from "../../com/Tooltips/types";
import { ref } from "vue";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const visible = ref(false);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: TooltipsContext = __viewReactive({
  get visible() {
    return __viewUnref(visible);
  },
  set visible(value: any) {
    if (__viewIsRef(visible)) (visible as any).value = value;
  },
  contentConfig: {
    texts: {
      tooltip: "Tooltip",
      simple: "Simple",
      tooltip2: " tooltip",
      icon: "Icon",
      toggleTolltip: "Toggle Tolltip",
      hideTooltip: "Hide Tooltip",
      showTooltip: "Show Tooltip",
      yourShoppingCart: "Your shopping cart",
      demoCartTooltipTarget: "Demo cart tooltip target",
    },
    values: {
      items1: ["start", "end", "top", "bottom"],
      items2: [
        ["user", "primary", "Profile"],
        ["shield", "secondary", "Security"],
        ["bell", "warning", "Notifications"],
        ["heart", "error", "Favorites"],
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
