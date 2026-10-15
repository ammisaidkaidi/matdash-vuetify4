<script setup lang="ts">
import { VSlider, VRangeSlider } from "vuetify/components";
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { SlidersContext } from "./types";

defineProps<{ context: SlidersContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.slider"
    ><div class="example-grid three">
      <ExampleCard :title="context.contentConfig.texts.default"
        ><v-slider
          v-model="context.model.basic"
          :aria-label="context.contentConfig.texts.defaultSlider"
          color="primary"
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.icon"
        ><v-slider
          v-model="context.model.volume"
          :aria-label="context.contentConfig.texts.volumeSlider"
          color="primary"
          :prepend-icon="context.mdiVolumeLow"
          :append-icon="context.mdiVolumeHigh"
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.disabled"
        ><v-slider
          :model-value="40"
          :aria-label="context.contentConfig.texts.disabledSlider"
          disabled
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.steps"
        ><v-slider
          v-model="context.model.steps"
          :aria-label="context.contentConfig.texts.steppedSlider"
          :step="10"
          color="primary"
          thumb-label="always"
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.ticks"
        ><v-slider
          v-model="context.model.ticks"
          :aria-label="context.contentConfig.texts.ticksSlider"
          :step="10"
          color="primary"
          show-ticks="always"
          thumb-label="always"
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.tickSize"
        ><v-slider
          v-model="context.model.tickSize"
          :aria-label="context.contentConfig.texts.largeTicksSlider"
          :step="10"
          :tick-size="4"
          color="primary"
          show-ticks="always"
          thumb-label="always"
          hide-details
      /></ExampleCard>
    </div>
    <div class="example-grid mt-6">
      <ExampleCard :title="context.contentConfig.texts.custom"
        ><div class="control-stack">
          <v-slider
            v-for="(_, i) in context.model.custom"
            :key="i"
            v-model="context.model.custom[i]"
            :aria-label="context.contentConfig.texts.customSlider + (i + 1)"
            :color="
              i === 1
                ? context.contentConfig.texts.secondary
                : context.contentConfig.texts.primary
            "
            :thumb-color="
              i === 3 ? context.contentConfig.texts.secondary : undefined
            "
            :track-color="
              i > 1 ? context.contentConfig.texts.secondary : undefined
            "
            :thumb-size="i === 0 ? 22 : undefined"
            hide-details
          /><v-slider
            v-model="context.model.fruit"
            :aria-label="context.contentConfig.texts.fruitSlider"
            :min="0"
            :max="3"
            :step="1"
            :ticks="context.fruitTicks"
            show-ticks="always"
            color="primary"
            hide-details
          /><v-slider
            v-model="context.model.mood"
            :aria-label="context.contentConfig.texts.moodSlider"
            color="primary"
            thumb-label="always"
            hide-details
            ><template #thumb-label="{ modelValue }">{{
              modelValue < 30
                ? context.contentConfig.texts.text1
                : modelValue < 70
                  ? context.contentConfig.texts.text2
                  : context.contentConfig.texts.text3
            }}</template></v-slider
          ><v-range-slider
            v-model="context.model.range"
            :aria-label="context.contentConfig.texts.rangeSlider"
            color="primary"
            thumb-label
            hide-details
          /></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.vertical"
        ><div class="vertical-sliders">
          <v-slider
            v-for="(_, i) in context.model.vertical"
            :key="i"
            v-model="context.model.vertical[i]"
            :aria-label="context.contentConfig.texts.verticalSlider + (i + 1)"
            direction="vertical"
            :disabled="i === 4"
            color="primary"
            thumb-label
            hide-details
          /></div
      ></ExampleCard></div
  ></FormPage>
</template>
