<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Sliders/Sliders.vue";
import type { SlidersContext } from "../../com/Sliders/types";
import { reactive } from "vue";
import { VSlider, VRangeSlider } from "vuetify/components";
import { mdiVolumeHigh, mdiVolumeLow } from "@mdi/js";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const model = reactive({
  basic: 50,
  volume: 30,
  steps: 40,
  ticks: 40,
  tickSize: 40,
  custom: [30, 50, 70, 80],
  fruit: 0,
  mood: 50,
  vertical: [20, 30, 50, 60, 45],
  range: [25, 75],
});
const fruitTicks = {
  0: "Figs",
  1: "Lemon",
  2: "Pear",
  3: "Apple",
};

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: SlidersContext = __viewReactive({
  get fruitTicks() {
    return __viewUnref(fruitTicks);
  },
  get mdiVolumeHigh() {
    return __viewUnref(mdiVolumeHigh);
  },
  get mdiVolumeLow() {
    return __viewUnref(mdiVolumeLow);
  },
  get model() {
    return __viewUnref(model);
  },
  contentConfig: {
    texts: {
      slider: "Slider",
      default: "Default",
      defaultSlider: "Default slider",
      icon: "Icon",
      volumeSlider: "Volume slider",
      disabled: "Disabled",
      disabledSlider: "Disabled slider",
      steps: "Steps",
      steppedSlider: "Stepped slider",
      ticks: "Ticks",
      ticksSlider: "Ticks slider",
      tickSize: "Tick Size",
      largeTicksSlider: "Large ticks slider",
      custom: "Custom",
      customSlider: "Custom slider ",
      secondary: "secondary",
      primary: "primary",
      fruitSlider: "Fruit slider",
      moodSlider: "Mood slider",
      text1: "🙁",
      text2: "😐",
      text3: "😊",
      rangeSlider: "Range slider",
      vertical: "Vertical",
      verticalSlider: "Vertical slider ",
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
