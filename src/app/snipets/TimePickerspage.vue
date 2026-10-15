<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/TimePickers/TimePickers.vue";
import type { TimePickersContext } from "../../com/TimePickers/types";
import { reactive } from "vue";
import { VTimePicker } from "vuetify/components";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const times = reactive({
  basic: null,
  format: null,
  scroll: null,
  seconds: null,
  primary: null,
  secondary: null,
  start: "09:00",
  end: "17:00",
});

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: TimePickersContext = __viewReactive({
  get times() {
    return __viewUnref(times);
  },
  contentConfig: {
    texts: {
      timePicker: "Time Picker",
      default: "Default",
      sELECTTIME: "SELECT TIME",
      chooseATime: "Choose a time",
      format: "Format",
      text1: " 24-hour format · ",
      notSelected: "Not selected",
      scrollable: "Scrollable",
      useSeconds: "Use seconds",
      colors: "Colors",
      pRIMARY: "PRIMARY",
      sECONDARY: "SECONDARY",
      range: "Range",
      sTARTTIME: "START TIME",
      startTime: "Start time",
      eNDTIME: "END TIME",
      endTime: "End time",
      text2: " – ",
      endTimeMustBeAfterStartTime: "End time must be after start time.",
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
