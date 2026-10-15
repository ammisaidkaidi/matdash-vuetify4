<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Steppers/Steppers.vue";
import type { SteppersContext } from "../../com/Steppers/types";
import { reactive, ref } from "vue";
import {
  VStepper,
  VStepperHeader,
  VStepperItem,
  VStepperWindow,
  VStepperWindowItem,
} from "vuetify/components";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { notify } from "../../composables/useFeedback";
const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];
const values = reactive({
  locked: 2,
  editable: 3,
  alternate: 1,
  optional: 1,
  error: 1,
  linear: [1, 2, 3],
});
const active = ref(1),
  completed = ref(false);
const titles = ["Step One", "Step Two", "Step Three"];
function next() {
  if (active.value < 3) active.value++;
  else {
    completed.value = true;
    notify("All three demo steps completed.");
  }
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: SteppersContext = __viewReactive({
  get active() {
    return __viewUnref(active);
  },
  set active(value: any) {
    if (__viewIsRef(active)) (active as any).value = value;
  },
  get completed() {
    return __viewUnref(completed);
  },
  set completed(value: any) {
    if (__viewIsRef(completed)) (completed as any).value = value;
  },
  get next() {
    return __viewUnref(next);
  },
  get steps() {
    return __viewUnref(steps);
  },
  get titles() {
    return __viewUnref(titles);
  },
  get values() {
    return __viewUnref(values);
  },
  contentConfig: {
    texts: {
      stepper: "Stepper",
      nonEditableSteps: "Non editable steps",
      editableSteps: "Editable steps",
      alternateLabel: "Alternate label",
      linearSteppers: "Linear steppers",
      optionalSteps: "Optional steps",
      optional: "Optional",
      alternativeLabelWithErrors: "Alternative label with errors",
      alertMessage: "Alert message",
      itemsSteps: "Items steps",
      step: "Step ",
      startWithTheDetailsThatDefineYourProjectAStepperKeepsEa:
        "Start with the details that define your project. A stepper keeps each stage focused and easy to follow.",
      reviewTheOptionsAndOrganizeYourWorkIntoClearManageableS:
        "Review the options and organize your work into clear, manageable steps.",
      everythingIsReadyFinishThisDemonstrationOrGoBackToRevie:
        "Everything is ready. Finish this demonstration or go back to review an earlier step.",
      demoCompletedNoDataWasSubmitted: "Demo completed. No data was submitted.",
      previous: "Previous",
      startAgain: "Start again",
      finish: "Finish",
      next: "Next",
    },
    values: {
      items1: ["Ad unit details", "Ad sizes", "Ad templates"],
      items2: ["Ad type", "Ad style", "Custom channels", "Get code"],
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
