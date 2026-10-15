<script setup lang="ts">
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { ChoicesContext } from "./types";

defineProps<{ context: ChoicesContext }>();
</script>

<template>
  <FormPage
    :title="
      context.kind === context.contentConfig.texts.checkbox
        ? context.contentConfig.texts.checkboxes
        : context.kind === context.contentConfig.texts.radio
          ? context.contentConfig.texts.radio2
          : context.contentConfig.texts.switch
    "
    :heading="
      context.kind === context.contentConfig.texts.checkbox
        ? context.contentConfig.texts.checkbox2
        : undefined
    "
    ><div
      v-if="context.kind === context.contentConfig.texts.checkbox"
      class="example-grid"
    >
      <ExampleCard :title="context.contentConfig.texts.custom"
        ><div class="controls-row spread">
          <v-checkbox
            v-for="(_, i) in context.state.custom"
            :key="i"
            v-model="context.state.custom[i]"
            :indeterminate="context.state.custom[i] === null"
            :aria-label="
              [
                context.contentConfig.texts.customChecked,
                context.contentConfig.texts.customUnchecked,
                context.contentConfig.texts.customIndeterminate,
              ][i]
            "
            color="primary"
            hide-details
          /></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.colors"
        ><div class="controls-row">
          <v-checkbox
            v-for="(color, i) in context.colors"
            :key="color"
            v-model="context.state.colors[i]"
            :color="color"
            :aria-label="color + context.contentConfig.texts.checkbox3"
            hide-details
          /></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.default"
        ><div class="controls-row">
          <v-checkbox
            v-for="(label, i) in context.contentConfig.values.items1"
            :key="label"
            v-model="context.state.labels[i]"
            :label="label"
            :color="label.toLowerCase()"
            hide-details
          /></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.states"
        ><div class="controls-row">
          <v-checkbox
            v-model="context.state.checked"
            :label="context.contentConfig.texts.checked"
            color="primary"
            hide-details
          /><v-checkbox
            v-model="context.state.unchecked"
            :label="context.contentConfig.texts.unchecked"
            disabled
            hide-details
          /></div
      ></ExampleCard>
    </div>
    <div
      v-else-if="context.kind === context.contentConfig.texts.radio"
      class="example-grid"
    >
      <ExampleCard :title="context.contentConfig.texts.default"
        ><v-radio-group v-model="context.state.radio[0]" inline hide-details
          ><v-radio
            v-for="v in context.contentConfig.values.items2"
            :key="v"
            :value="v"
            :aria-label="context.contentConfig.texts.radio3 + v"
            color="primary" /></v-radio-group></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.label"
        ><v-radio-group v-model="context.state.radio[1]" inline hide-details
          ><v-radio
            v-for="v in context.contentConfig.values.items3"
            :key="v"
            :value="v"
            :label="v"
            :color="v.toLowerCase()" /></v-radio-group></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.colors"
        ><v-radio-group v-model="context.state.radio[2]" inline hide-details
          ><v-radio
            v-for="v in context.colors.slice(0, 4)"
            :key="v"
            :value="v"
            :aria-label="v + context.contentConfig.texts.radio4"
            :color="v" /></v-radio-group></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.colorsWithLabel"
        ><v-radio-group v-model="context.state.radio[3]" inline hide-details
          ><v-radio
            v-for="v in context.colors.slice(0, 4)"
            :key="v"
            :value="v"
            :label="v"
            :color="v" /></v-radio-group></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.defaultDirection"
        ><v-radio-group v-model="context.state.radio[4]" hide-details
          ><v-radio
            v-for="n in 2"
            :key="n"
            :value="context.contentConfig.texts.option + n"
            :label="context.contentConfig.texts.option + n"
            color="primary" /></v-radio-group></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.inlineDirection"
        ><v-radio-group v-model="context.state.radio[5]" inline hide-details
          ><v-radio
            v-for="n in 8"
            :key="n"
            :value="context.contentConfig.texts.option + n"
            :label="context.contentConfig.texts.option + n"
            color="primary" /></v-radio-group
      ></ExampleCard>
    </div>
    <div v-else class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.default"
        ><div class="controls-row">
          <v-switch
            v-for="(_, i) in context.state.default"
            :key="i"
            v-model="context.state.default[i]"
            :disabled="i > 1"
            :aria-label="context.contentConfig.texts.defaultSwitch + (i + 1)"
            color="primary"
            hide-details
          /></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.inset"
        ><div class="controls-row">
          <v-switch
            v-for="(_, i) in context.state.inset"
            :key="i"
            v-model="context.state.inset[i]"
            :disabled="i > 1"
            :aria-label="context.contentConfig.texts.insetSwitch + (i + 1)"
            color="primary"
            inset
            hide-details
          /></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.withLabel"
        ><v-switch
          v-model="context.state.withLabel"
          :label="context.contentConfig.texts.label"
          color="primary"
          hide-details /><v-switch
          :label="context.contentConfig.texts.disabled"
          disabled
          hide-details /></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.states"
        :description="
          context.contentConfig.texts
            .loadingIndicatorsAreStaticExamplesNoRequestIsRunning
        "
        ><v-switch
          :model-value="true"
          :label="context.contentConfig.texts.onLoading"
          loading="warning"
          disabled
          color="primary"
          hide-details /><v-switch
          :model-value="false"
          :label="context.contentConfig.texts.offLoading"
          loading="warning"
          disabled
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.colors"
        ><div class="controls-row">
          <v-switch
            v-for="(color, i) in context.colors"
            :key="color"
            v-model="context.state.colorSwitch[i]"
            :color="color"
            :aria-label="color + context.contentConfig.texts.switch2"
            hide-details
          /></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.insetColors"
        ><div class="controls-row">
          <v-switch
            v-for="(color, i) in context.colors"
            :key="color"
            v-model="context.state.insetColors[i]"
            :color="color"
            :aria-label="color + context.contentConfig.texts.insetSwitch2"
            inset
            hide-details
          /></div
      ></ExampleCard></div
  ></FormPage>
</template>
