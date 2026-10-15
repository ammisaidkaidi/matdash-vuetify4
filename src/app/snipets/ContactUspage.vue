<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/ContactUs/ContactUs.vue";
import type { ContactUsContext } from "../../com/ContactUs/types";
import { ref, reactive } from "vue";
import { required, validEmail } from "../../composables/useFeedback";
const menu = ref(false),
  form = ref(),
  submitted = ref(false);
const values = reactive({
  first: "",
  last: "",
  phone: "",
  email: "",
  enquiry: "General Enquiry",
  message: "",
});
const links = [
  ["About Us", "/front-page/about-us"],
  ["Blog", "/front-page/blog/posts"],
  ["Portfolio", "/front-page/portfolio"],
  ["Dashboard", "/dashboards/dashboard1"],
  ["Pricing", "/front-page/pricing"],
  ["Contact", "/front-page/contact-us"],
];
async function submit() {
  if ((await form.value.validate()).valid) submitted.value = true;
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ContactUsContext = __viewReactive({
  get form() {
    return __viewUnref(form);
  },
  set form(value: any) {
    if (__viewIsRef(form)) (form as any).value = value;
  },
  get links() {
    return __viewUnref(links);
  },
  get menu() {
    return __viewUnref(menu);
  },
  set menu(value: any) {
    if (__viewIsRef(menu)) (menu as any).value = value;
  },
  get required() {
    return __viewUnref(required);
  },
  get submit() {
    return __viewUnref(submit);
  },
  get submitted() {
    return __viewUnref(submitted);
  },
  set submitted(value: any) {
    if (__viewIsRef(submitted)) (submitted as any).value = value;
  },
  get validEmail() {
    return __viewUnref(validEmail);
  },
  get values() {
    return __viewUnref(values);
  },
  contentConfig: {
    texts: {
      dashboardsDashboard1: "/dashboards/dashboard1",
      matDashDashboard: "MatDash dashboard",
      assetsLogoDq6uoDMSvg: "/assets/logo-Dq6uoD-m.svg",
      matDash: "MatDash",
      frontNav: "front-nav",
      frontPageNavigation: "Front page navigation",
      contact: "Contact",
      authLogin: "/auth/login",
      logIn: "Log In",
      toggleNavigation: "Toggle navigation",
      close: "close",
      menu: "menu",
      weDLoveToHearFromYou: "We’d love to hear from you",
      mATDASH: "MATDASH",
      text1: "•",
      cONTACTUS: "CONTACT US ",
      reachOutToday: "Reach Out Today",
      haveQuestionsOrNeedAssistanceWeReJustAMessageAway:
        "Have questions or need assistance? We're just a message away.",
      ourLocation: "Our Location",
      visitUsInPersonOrFindOurContactDetailsToConnectWithUsDi:
        " Visit us in person or find our contact details to connect with us directly. ",
      contactEnquiry: "Contact enquiry",
      firstName: "First Name ",
      text2: "*",
      name: "Name",
      lastName: "Last Name ",
      lastName2: "Last Name",
      phoneNumber: "Phone Number ",
      xxxXxxXxxx: "xxx xxx xxxx",
      enterAValidPhoneNumber: "Enter a valid phone number.",
      email: "Email ",
      emailAddress: "Email address",
      enquireRelatedTo: "Enquire related to ",
      message: "Message",
      writeYourMessageHere: "Write your message here...",
      yourEnquiryWasValidatedInThisBrowserThisDemoDoesNotSend:
        "Your enquiry was validated in this browser. This demo does not send messages.",
      submit: "Submit",
      frontEndDemoOnlyYourInformationIsNotSentOrSaved:
        " Front-end demo only. Your information is not sent or saved. ",
      focusOnWhatTrulyMattersCreatingStunningFunctionalDesign:
        " Focus on what truly matters—creating stunning, functional designs. ",
      designedForEaseOfUseAndCustomizationThisTemplateHelpsYo:
        " Designed for ease of use and customization, this template helps you build professional dashboards faster. ",
      authRegister: "/auth/register",
      register: "Register",
      matDashVue3Vuetify4FrontEndRecreation:
        "MatDash · Vue 3 + Vuetify 4 front-end recreation",
      pagesRouteDirectory: "/pages/route-directory",
      viewRouteProgress: "View route progress",
    },
    values: {
      items1: ["General Enquiry", "Product Support", "Partnership", "Feedback"],
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
