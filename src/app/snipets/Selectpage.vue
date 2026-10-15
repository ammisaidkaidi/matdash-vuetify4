<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Select/Select.vue";
import type { SelectContext } from "../../com/Select/types";
import { reactive } from "vue";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const items = [
  "California",
  "Colorado",
  "Florida",
  "Georgia",
  "Texas",
  "Wyoming",
];
const model = reactive({
  basic: null,
  read: "California",
  multiple: [],
  chips: [],
  densities: [null, null, null],
});

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: SelectContext = __viewReactive({
  get items() {
    return __viewUnref(items);
  },
  get model() {
    return __viewUnref(model);
  },
  contentConfig: {
    texts: {
      select: "Select",
      basic: "Basic",
      selectItem: "Select Item",
      readOnly: "Read only",
      readOnlyItem: "Read only item",
      multiple: "Multiple",
      selectMultiple: "Select Multiple",
      pickYourFavoriteStates: "Pick your favorite states",
      chips: "Chips",
      selectRegions: "Select regions",
      whatAreTheTargetRegions: "What are the target regions",
      density: "Density",
    },
    values: {
      items1: ["compact", "comfortable", "default"],
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
