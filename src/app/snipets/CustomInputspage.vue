<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/CustomInputs/CustomInputs.vue";
import type { CustomInputsContext } from "../../com/CustomInputs/types";
import { reactive } from "vue";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { required, validEmail } from "../../composables/useFeedback";
const model = reactive({
  error: "",
  errors: "",
  loading: "",
  amount: 0,
  main: "",
  email: "",
});

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: CustomInputsContext = __viewReactive({
  get model() {
    return __viewUnref(model);
  },
  get required() {
    return __viewUnref(required);
  },
  get validEmail() {
    return __viewUnref(validEmail);
  },
  contentConfig: {
    texts: {
      customInputs: "Custom Inputs",
      error: "Error",
      input: "Input",
      multipleError: "Multiple Error",
      inputWithMultipleErrors: "Input with multiple errors",
      loading: "Loading",
      loadingInput: "Loading input",
      appendAndPrepend: "Append and Prepend",
      amount: "Amount",
      decreaseAmount: "Decrease amount",
      text1: "−",
      increaseAmount: "Increase amount",
      text2: "+",
      hideDetails: "Hide Details",
      mainInput: "Main input",
      rules: "Rules",
      enterEmail: "Enter Email",
    },
    values: {
      errormessages1: ["Fatal error"],
      errormessages2: ["Fatal error", "Another error"],
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
