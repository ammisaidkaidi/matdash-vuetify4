<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/FormLayouts/FormLayouts.vue";
import type { FormLayoutsContext } from "../../com/FormLayouts/types";
import { ref } from "vue";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import DemoForm from "../../com/ui/DemoForm.vue";
import { countries } from "../../data/form-fields";
const success = ref("Success value"),
  error = ref(""),
  errorText = ref("");
const ordinary = [
  {
    key: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    required: true,
    hint: "We'll never share your email with anyone else.",
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    required: true,
  },
];
const defaultFields = [
  {
    key: "text",
    label: "Default Text",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    required: true,
  },
  {
    key: "readonly",
    label: "Read Only",
    value: "This field is read only",
    readonly: true,
  },
  {
    key: "choice",
    label: "Select",
    items: ["One", "Two", "Three"],
    required: true,
  },
];
const header = [
  {
    section: "Person Info",
  },
  {
    key: "firstname",
    label: "First Name",
    required: true,
  },
  {
    key: "lastname",
    label: "Last Name",
    required: true,
  },
  {
    key: "gender",
    label: "Select Gender",
    items: ["Female", "Male", "Other", "Prefer not to say"],
  },
  {
    key: "birth",
    label: "Date of Birth",
    type: "date",
  },
  {
    key: "membership",
    label: "Membership",
    kind: "radio",
    options: ["Free", "Paid"],
    value: "Free",
    wide: true,
  },
  {
    section: "Address",
  },
  {
    key: "street",
    label: "Street",
    required: true,
    wide: true,
  },
  {
    key: "city",
    label: "City",
    required: true,
  },
  {
    key: "postcode",
    label: "Post Code",
    required: true,
  },
  {
    key: "state",
    label: "State",
    required: true,
  },
  {
    key: "country",
    label: "Country",
    items: countries,
    required: true,
  },
];
const iconFields = [
  {
    key: "username",
    label: "Username",
    icon: "user",
    required: true,
  },
  {
    key: "email",
    label: "Email",
    type: "email",
    icon: "email",
    required: true,
  },
  {
    key: "password",
    label: "Password",
    type: "password",
    icon: "lock",
    required: true,
  },
  {
    key: "confirm",
    label: "Confirm Password",
    type: "password",
    icon: "lock",
    confirm: true,
    required: true,
  },
];

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: FormLayoutsContext = __viewReactive({
  get DemoForm() {
    return __viewUnref(DemoForm);
  },
  get defaultFields() {
    return __viewUnref(defaultFields);
  },
  get error() {
    return __viewUnref(error);
  },
  set error(value: any) {
    if (__viewIsRef(error)) (error as any).value = value;
  },
  get errorText() {
    return __viewUnref(errorText);
  },
  set errorText(value: any) {
    if (__viewIsRef(errorText)) (errorText as any).value = value;
  },
  get header() {
    return __viewUnref(header);
  },
  get iconFields() {
    return __viewUnref(iconFields);
  },
  get ordinary() {
    return __viewUnref(ordinary);
  },
  get success() {
    return __viewUnref(success);
  },
  set success(value: any) {
    if (__viewIsRef(success)) (success as any).value = value;
  },
  contentConfig: {
    texts: {
      formLayouts: "Form Layouts",
      ordinaryForm: "Ordinary Form",
      inputVariants: "Input Variants",
      successInput: "Success Input",
      errorInput: "Error Input",
      inputWithErrorText: "Input with Error text",
      defaultForm: "Default Form",
      basicHeaderForm: "Basic Header Form",
      disabledForm: "Disabled Form",
      name: "name",
      name2: "Name",
      formWithLeftIcon: "Form with Left Icon",
      formWithRightIcon: "Form with Right Icon",
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
