<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/DirectionalForms/DirectionalForms.vue";
import type { DirectionalFormsContext } from "../../com/DirectionalForms/types";
import { useRoute } from "vue-router";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import DemoForm from "../../com/ui/DemoForm.vue";
import FormExtras from "../../com/ui/FormExtras.vue";
import {
  basicFields,
  accountFields,
  personalFields,
} from "../../data/form-fields";
const horizontal = useRoute().path.endsWith("form-horizontal");
const multi = [
  {
    section: "Account Details",
  },
  {
    key: "username",
    label: "Username",
    required: true,
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    key: "confirm",
    label: "Confirm Password",
    type: "password",
    required: true,
    confirm: true,
  },
  {
    section: "Personal Info",
  },
  ...personalFields,
];

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: DirectionalFormsContext = __viewReactive({
  get DemoForm() {
    return __viewUnref(DemoForm);
  },
  get FormExtras() {
    return __viewUnref(FormExtras);
  },
  get accountFields() {
    return __viewUnref(accountFields);
  },
  get basicFields() {
    return __viewUnref(basicFields);
  },
  get horizontal() {
    return __viewUnref(horizontal);
  },
  set horizontal(value: any) {
    if (__viewIsRef(horizontal)) (horizontal as any).value = value;
  },
  get multi() {
    return __viewUnref(multi);
  },
  contentConfig: {
    texts: {
      horizontalForm: "Horizontal Form",
      verticalForm: "Vertical Form",
      basicLayout: "Basic Layout",
      basicWithIcons: "Basic with Icons",
      formSeparator: "Form Separator",
      formLabelAlignment: "Form Label Alignment",
      multiColumnWithFormSeparator: "Multi Column with Form Separator",
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
