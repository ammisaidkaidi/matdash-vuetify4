<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Combobox/Combobox.vue";
import type { ComboboxContext } from "../../com/Combobox/types";
import { reactive } from "vue";
import { VCombobox } from "vuetify/components";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const activities = ["Programming", "Design", "Vue", "Vuetify"];
const initial = () => ({
  density: ["foo", "foo", "foo"],
  multiple: ["Vuetify", "Programming"],
  chips: ["Vuetify", "Programming"],
  custom: ["Vuetify", "Programming"],
  readonly: ["Vuetify", "Programming"],
});
const model = reactive(initial());

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ComboboxContext = __viewReactive({
  get activities() {
    return __viewUnref(activities);
  },
  get initial() {
    return __viewUnref(initial);
  },
  get model() {
    return __viewUnref(model);
  },
  contentConfig: {
    texts: {
      combobox: "Combobox",
      density: "Density",
      multiple: "Multiple",
      selectAFavoriteActivityOrCreateANewOne:
        "Select a favorite activity or create a new one",
      iUseChips: "I use chips",
      iUseAScopedSlot: "I use a scoped slot",
      iMReadonly: "I'm readonly",
      typeANewActivityAndPressEnterToAddIt:
        "Type a new activity and press Enter to add it.",
      resetExamples: "Reset examples",
    },
    values: {
      items1: ["default", "comfortable", "compact"],
      items2: ["foo", "bar", "fizz", "buzz"],
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
