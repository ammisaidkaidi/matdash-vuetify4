<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Auth/Auth.vue";
import type { AuthContext } from "../../com/Auth/types";
import { ref, reactive, computed, nextTick, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { asset } from "../../data/app-seed";
import { required, validEmail, notify } from "../../composables/useFeedback";
import { beginDemoSession } from "../../composables/useDemoAuth";
const route = useRoute(),
  router = useRouter();
const boxed = route.path.endsWith("2"),
  mode = route.path.includes("register")
    ? "register"
    : route.path.includes("forgot-password")
      ? "forgot"
      : "login";
const form = ref(),
  reveal = ref(false),
  remember = ref(false),
  success = ref(false),
  error = ref(""),
  slide = ref(0);
const values = reactive({
  name: "",
  email: mode === "login" ? "demo@matdash.local" : "",
  password: mode === "login" ? "Demo123!" : "",
});
const suffix = boxed ? "2" : "";
const loginPath = "/auth/login" + suffix;
const title = computed(() =>
  mode === "forgot"
    ? "Forgot your password?"
    : boxed
      ? mode === "login"
        ? "Let’s get you signed in"
        : "Let’s get you signed up"
      : mode === "login"
        ? "Sign in"
        : "Sign Up",
);
const slides = [
  [
    "Feature Rich 1D Charts",
    "Visualize sample data with clear, interactive charts.",
    "login-side-",
  ],
  [
    "Thoughtful Page Layouts",
    "Reusable layouts give your next application a strong starting point.",
    "main-banner-",
  ],
  [
    "Beautiful UI Components",
    "Explore forms, tables, and components built with Vuetify 4.",
    "feature-image-",
  ],
];
const passwordRule = (v) =>
  String(v || "").length >= 8 || "Use at least 8 characters.";
async function submit() {
  error.value = "";
  success.value = false;
  if (!(await form.value.validate()).valid) return;
  if (mode === "login") {
    if (
      values.email !== "demo@matdash.local" ||
      values.password !== "Demo123!"
    ) {
      error.value =
        "Use the displayed demo credentials. No account lookup was performed.";
      return;
    }
    const stored = beginDemoSession(remember.value);
    values.password = "";
    notify(
      stored
        ? "Demo session started. No real authentication was performed."
        : "Demo session started in memory. Browser storage is unavailable.",
    );
    await router.push("/dashboards/dashboard1");
  } else {
    success.value = true;
    values.password = "";
    if (mode === "forgot") values.email = "";
    await nextTick();
    form.value.resetValidation();
  }
}
onBeforeUnmount(() => {
  values.password = "";
  values.email = "";
  values.name = "";
});

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: AuthContext = __viewReactive({
  get asset() {
    return __viewUnref(asset);
  },
  get boxed() {
    return __viewUnref(boxed);
  },
  set boxed(value: any) {
    if (__viewIsRef(boxed)) (boxed as any).value = value;
  },
  get error() {
    return __viewUnref(error);
  },
  set error(value: any) {
    if (__viewIsRef(error)) (error as any).value = value;
  },
  get form() {
    return __viewUnref(form);
  },
  set form(value: any) {
    if (__viewIsRef(form)) (form as any).value = value;
  },
  get loginPath() {
    return __viewUnref(loginPath);
  },
  get mode() {
    return __viewUnref(mode);
  },
  set mode(value: any) {
    if (__viewIsRef(mode)) (mode as any).value = value;
  },
  get notify() {
    return __viewUnref(notify);
  },
  get passwordRule() {
    return __viewUnref(passwordRule);
  },
  get remember() {
    return __viewUnref(remember);
  },
  set remember(value: any) {
    if (__viewIsRef(remember)) (remember as any).value = value;
  },
  get required() {
    return __viewUnref(required);
  },
  get reveal() {
    return __viewUnref(reveal);
  },
  set reveal(value: any) {
    if (__viewIsRef(reveal)) (reveal as any).value = value;
  },
  get slide() {
    return __viewUnref(slide);
  },
  set slide(value: any) {
    if (__viewIsRef(slide)) (slide as any).value = value;
  },
  get slides() {
    return __viewUnref(slides);
  },
  get submit() {
    return __viewUnref(submit);
  },
  get success() {
    return __viewUnref(success);
  },
  set success(value: any) {
    if (__viewIsRef(success)) (success as any).value = value;
  },
  get suffix() {
    return __viewUnref(suffix);
  },
  set suffix(value: any) {
    if (__viewIsRef(suffix)) (suffix as any).value = value;
  },
  get title() {
    return __viewUnref(title);
  },
  set title(value: any) {
    if (__viewIsRef(title)) (title as any).value = value;
  },
  get validEmail() {
    return __viewUnref(validEmail);
  },
  get values() {
    return __viewUnref(values);
  },
  contentConfig: {
    texts: {
      b5AuthPage: "b5-auth-page",
      b5AuthBoxed: "b5-auth-boxed",
      b5AuthSide: "b5-auth-side",
      frontPageHomepage: "/front-page/homepage",
      matDashHomepage: "MatDash homepage",
      assetsLogoDq6uoDMSvg: "/assets/logo-Dq6uoD-m.svg",
      matDash: "MatDash",
      forgot: "forgot",
      enterTheEmailAddressAssociatedWithYourAccountToPreviewP:
        " Enter the email address associated with your account to preview password-reset validation. This demo does not send email or reset a password. ",
      yourAdminDashboard: "Your Admin Dashboard",
      facebook: "Facebook",
      google: "Google",
      authenticationIsNotConnectedInThisDemo:
        " authentication is not connected in this demo.",
      info: "info",
      b5Provider: "b5-provider",
      g: "G",
      f: "f",
      signInWith: "Sign in with ",
      text1: "",
      orSign: "Or sign ",
      login: "login",
      in: "in",
      up: "up",
      withEmail: " with email",
      orSignInWith: "or sign in with",
      demoForm: " demo form",
      register: "register",
      name: "Name",
      username: "Username",
      emailAddress: "Email Address",
      text: "text",
      email: "email",
      password: "Password",
      authForgotPassword: "/auth/forgot-password",
      forgotPassword: "Forgot Password ?",
      password2: "password",
      hidePassword: "Hide password",
      showPassword: "Show password",
      eyeoff: "eyeoff",
      eye: "eye",
      keepMeLoggedIn: "Keep me logged in",
      rememberThisDevice: "Remember this Device",
      emailFormatValidatedNoResetEmailWasSentAndNoPasswordWas:
        "Email format validated. No reset email was sent and no password was changed.",
      registrationValidatedLocallyNoAccountWasCreatedThePassw:
        "Registration validated locally. No account was created; the password was cleared.",
      text2: "#0b263c",
      primary: "primary",
      signIn: "Sign In",
      signUp: "Sign Up",
      forgotPassword2: "Forgot Password",
      backToLogin: "Back To Login",
      donTHaveAnAccountYet: "Don’t have an account yet?",
      alreadyHaveAnAccount: "Already have an Account?",
      authRegister: "/auth/register",
      signUpNow: "Sign Up Now",
      createAnAccount: "Create an account",
      signInNow: "Sign In Now",
      signIn2: "Sign in",
      localDemoOnly: "Local demo only",
      username2: " Username: ",
      demoMatdashLocal: "demo@matdash.local",
      password3: "Password: ",
      demo123: "Demo123!",
      onlyTheDemoSessionFlagCanBeRememberedCredentialsAreNeve:
        "Only the demo-session flag can be remembered; credentials are never stored.",
      useSampleInformationNoAccountEmailOrPasswordServiceIsCo:
        "Use sample information. No account, email, or password service is connected.",
      learnMore: "Learn More",
      featureSlide: "Feature slide ",
      welcomeTo: "Welcome to",
      matDashHelpsDevelopersToBuildOrganizedAndWellCodedDashb:
        " MatDash helps developers to build organized and well coded dashboards full of beautiful and rich modules. ",
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
