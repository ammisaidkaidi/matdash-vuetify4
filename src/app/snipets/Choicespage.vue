<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Choices/Choices.vue";
import type { ChoicesContext } from "../../com/Choices/types";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const kind = useRoute().path.split("/").at(-1);
const colors = ["primary", "secondary", "success", "error", "warning"];
const state = reactive({
  custom: [true, false, null],
  colors: [true, true, true, true, true],
  labels: [true, false, false, false],
  checked: true,
  unchecked: false,
  default: [true, false, true, false],
  inset: [true, false, true, false],
  withLabel: true,
  colorSwitch: [true, true, true, true, true],
  insetColors: [true, true, true, true, true],
  radio: ["one", "Primary", "primary", "primary", "Option 1", "Option 1"],
});

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ChoicesContext = __viewReactive({
  get colors() {
    return __viewUnref(colors);
  },
  get kind() {
    return __viewUnref(kind);
  },
  set kind(value: any) {
    if (__viewIsRef(kind)) (kind as any).value = value;
  },
  get state() {
    return __viewUnref(state);
  },
  contentConfig: {
    texts: {
      checkbox: "checkbox",
      checkboxes: "Checkboxes",
      radio: "radio",
      radio2: "Radio",
      switch: "Switch",
      checkbox2: "Checkbox",
      custom: "Custom",
      customChecked: "Custom checked",
      customUnchecked: "Custom unchecked",
      customIndeterminate: "Custom indeterminate",
      colors: "Colors",
      checkbox3: " checkbox",
      default: "Default",
      states: "States",
      checked: "Checked",
      unchecked: "Unchecked",
      radio3: "Radio ",
      label: "Label",
      radio4: " radio",
      colorsWithLabel: "Colors with Label",
      defaultDirection: "Default Direction",
      option: "Option ",
      inlineDirection: "Inline Direction",
      defaultSwitch: "Default switch ",
      inset: "Inset",
      insetSwitch: "Inset switch ",
      withLabel: "With Label",
      disabled: "Disabled",
      loadingIndicatorsAreStaticExamplesNoRequestIsRunning:
        "Loading indicators are static examples; no request is running.",
      onLoading: "on loading",
      offLoading: "off loading",
      switch2: " switch",
      insetColors: "Inset Colors",
      insetSwitch2: " inset switch",
    },
    values: {
      items1: ["Primary", "Secondary", "Success", "Warning"],
      items2: ["one", "two", "three"],
      items3: ["Primary", "Secondary", "Success", "Warning"],
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
