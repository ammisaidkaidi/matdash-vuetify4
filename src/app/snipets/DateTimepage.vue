<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/DateTime/DateTime.vue";
import type { DateTimeContext } from "../../com/DateTime/types";
import { ref } from "vue";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const date = ref(""),
  time = ref("");

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: DateTimeContext = __viewReactive({
  get date() {
    return __viewUnref(date);
  },
  set date(value: any) {
    if (__viewIsRef(date)) (date as any).value = value;
  },
  get time() {
    return __viewUnref(time);
  },
  set time(value: any) {
    if (__viewIsRef(time)) (time as any).value = value;
  },
  contentConfig: {
    texts: {
      datePicker: "Date Picker",
      timePicker: "Time Picker",
      selected: "Selected: ",
      noDate: "No date",
      text1: " · ",
      noTime: "No time",
      text2: "",
      clearSelection: "Clear selection",
    },
    values: {},
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
