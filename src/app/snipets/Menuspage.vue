<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Menus/Menus.vue";
import type { MenusContext } from "../../com/Menus/types";
import { ref, mergeProps } from "vue";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { notify } from "../../composables/useFeedback";
const location = ref("bottom"),
  popover = ref(false);
const choose = (item) => notify(item + " selected in this demo.");

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: MenusContext = __viewReactive({
  get choose() {
    return __viewUnref(choose);
  },
  get location() {
    return __viewUnref(location);
  },
  set location(value: any) {
    if (__viewIsRef(location)) (location as any).value = value;
  },
  get mergeProps() {
    return __viewUnref(mergeProps);
  },
  get popover() {
    return __viewUnref(popover);
  },
  set popover(value: any) {
    if (__viewIsRef(popover)) (popover as any).value = value;
  },
  contentConfig: {
    texts: {
      menus: "Menus",
      anchor: "Anchor",
      location: "Location",
      dropdown: "Dropdown",
      item: "Item ",
      hover: "Hover",
      hoverItem: "Hover item ",
      activatorAndTooltip: "Activator and tooltip",
      openTheExampleMenu: "Open the example menu",
      dropdownWTooltip: "Dropdown W/ Tooltip",
      popover: "Popover",
      menuAsPopover: "Menu As Popover",
      aLittleMoreInformation: "A little more information",
      menusCanHoldMoreThanAListThisPopoverKeepsAShortPieceOfI:
        " Menus can hold more than a list. This popover keeps a short piece of information close to its activator. ",
      gotIt: "Got it",
    },
    values: {
      items1: ["top", "bottom", "start", "end"],
      items2: ["Profile", "Settings", "Help"],
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
