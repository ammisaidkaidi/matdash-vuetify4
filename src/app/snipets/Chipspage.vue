<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Chips/Chips.vue";
import type { ChipsContext } from "../../com/Chips/types";
import { ref } from "vue";
import { mdiCheck } from "@mdi/js";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { avatar } from "../../data/app-seed";
const colors = ["primary", "secondary", "warning", "success", "error", "info"],
  hidden = ref([]);
const rows = [undefined, "primary", "secondary", "success", "warning", "error"];
function remove(id) {
  hidden.value.push(id);
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ChipsContext = __viewReactive({
  get avatar() {
    return __viewUnref(avatar);
  },
  get colors() {
    return __viewUnref(colors);
  },
  get hidden() {
    return __viewUnref(hidden);
  },
  set hidden(value: any) {
    if (__viewIsRef(hidden)) (hidden as any).value = value;
  },
  get mdiCheck() {
    return __viewUnref(mdiCheck);
  },
  get remove() {
    return __viewUnref(remove);
  },
  get rows() {
    return __viewUnref(rows);
  },
  contentConfig: {
    texts: {
      chip: "Chip",
      tonal: "tonal",
      filled: "Filled",
      outlined: "Outlined",
      primary: "primary",
      primary2: "Primary",
      secondary: "secondary",
      secondary2: "Secondary",
      default: "Default",
      filled2: " Filled",
      delete: "Delete ",
      chip2: " chip ",
      deletable: " Deletable",
      customOutlinedIcon: "Custom Outlined Icon",
      customIcon: "Custom Icon",
      outlined2: "outlined",
      disabled: "Disabled",
      sizes: "Sizes",
      default2: "default",
      closable: "Closable",
      chip3: " chip",
      closeChipsIndividuallyThenRestoreTheExamples:
        "Close chips individually, then restore the examples.",
      resetChips: "Reset chips",
    },
    values: {
      items1: ["tonal", "outlined"],
      items2: [false, true],
      items3: ["primary", "secondary"],
      items4: ["primary", "secondary"],
      items5: ["x-small", "small", "default", "large", "x-large"],
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
