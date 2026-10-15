<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Validation/Validation.vue";
import type { ValidationContext } from "../../com/Validation/types";
import { reactive, ref } from "vue";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { required, validEmail, notify } from "../../composables/useFeedback";
const signup = reactive({
    name: "",
    email: "",
    password: "",
    confirm: "",
    remember: false,
  }),
  login = reactive({
    email: "",
    password: "",
    remember: false,
  }),
  leave = reactive({
    email: "",
    password: "",
  });
const signupForm = ref(),
  loginForm = ref(),
  ageForm = ref(),
  leaveForm = ref();
const age = ref(null),
  checks = ref([]),
  drink = ref(null),
  checkError = ref(false),
  radioError = ref(true);
const passwordRule = (v) =>
  String(v || "").length >= 8 || "Use at least 8 characters.";
async function submit(form, model) {
  if ((await form.validate()).valid) {
    if (model?.password !== undefined) model.password = "";
    if (model?.confirm !== undefined) model.confirm = "";
    form.resetValidation();
    notify("Validation passed. Nothing was sent or saved.", "success");
  }
}
function submitChoices(radio) {
  if (radio) {
    radioError.value = !drink.value;
    if (!radioError.value) notify("Drink selected: " + drink.value, "success");
  } else {
    checkError.value = !checks.value.length;
    if (!checkError.value)
      notify("Drinks selected: " + checks.value.join(", "), "success");
  }
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ValidationContext = __viewReactive({
  get age() {
    return __viewUnref(age);
  },
  set age(value: any) {
    if (__viewIsRef(age)) (age as any).value = value;
  },
  get ageForm() {
    return __viewUnref(ageForm);
  },
  set ageForm(value: any) {
    if (__viewIsRef(ageForm)) (ageForm as any).value = value;
  },
  get checkError() {
    return __viewUnref(checkError);
  },
  set checkError(value: any) {
    if (__viewIsRef(checkError)) (checkError as any).value = value;
  },
  get checks() {
    return __viewUnref(checks);
  },
  set checks(value: any) {
    if (__viewIsRef(checks)) (checks as any).value = value;
  },
  get drink() {
    return __viewUnref(drink);
  },
  set drink(value: any) {
    if (__viewIsRef(drink)) (drink as any).value = value;
  },
  get leave() {
    return __viewUnref(leave);
  },
  get leaveForm() {
    return __viewUnref(leaveForm);
  },
  set leaveForm(value: any) {
    if (__viewIsRef(leaveForm)) (leaveForm as any).value = value;
  },
  get login() {
    return __viewUnref(login);
  },
  get loginForm() {
    return __viewUnref(loginForm);
  },
  set loginForm(value: any) {
    if (__viewIsRef(loginForm)) (loginForm as any).value = value;
  },
  get passwordRule() {
    return __viewUnref(passwordRule);
  },
  get radioError() {
    return __viewUnref(radioError);
  },
  set radioError(value: any) {
    if (__viewIsRef(radioError)) (radioError as any).value = value;
  },
  get required() {
    return __viewUnref(required);
  },
  get signup() {
    return __viewUnref(signup);
  },
  get signupForm() {
    return __viewUnref(signupForm);
  },
  set signupForm(value: any) {
    if (__viewIsRef(signupForm)) (signupForm as any).value = value;
  },
  get submit() {
    return __viewUnref(submit);
  },
  get submitChoices() {
    return __viewUnref(submitChoices);
  },
  get validEmail() {
    return __viewUnref(validEmail);
  },
  contentConfig: {
    texts: {
      formValidation: "Form Validation",
      signUpValidation: "Sign up validation",
      assetsLogoDq6uoDMSvg: "/assets/logo-Dq6uoD-m.svg",
      matDash: "MatDash",
      name: "Name",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      passwordsDoNotMatch: "Passwords do not match.",
      rememberThisDevice: "Remember this Device",
      authForgotPassword: "/auth/forgot-password",
      forgotPassword: "Forgot password?",
      submit: "Submit",
      loginValidation: "Login validation",
      select: "Select",
      ageValidation: "Age validation",
      age: "Age",
      onLeave: "On Leave",
      onLeaveValidation: "On leave validation",
      checkboxes: "Checkboxes",
      checkboxValidation: "Checkbox validation",
      text1: ", ",
      none: "None",
      youHaveToChooseAtLeastOneDrink: " You have to choose at least one Drink ",
      radio: "Radio",
      radioValidation: "Radio validation",
      youHaveToChooseOneDrink: "You have to choose one Drink",
      text2: "",
    },
    values: {
      items1: ["Under 18", "18–25", "26–35", "36–50", "Over 50"],
      items2: ["Tea", "Coffee"],
      items3: ["Tea", "Coffee"],
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
