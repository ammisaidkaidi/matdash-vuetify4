<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Dialogs/Dialogs.vue";
import type { DialogsContext } from "../../com/Dialogs/types";
import { ref, reactive } from "vue";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { required, validEmail, notify } from "../../composables/useFeedback";
const active = ref(null),
  nested = ref(false),
  form = ref();
const profile = reactive({
    name: "",
    email: "",
  }),
  settings = reactive({
    notifications: true,
    sound: false,
  }),
  choice = ref("United States");
const demos = [
  ["Simple", "Open Simple Dialog", "primary"],
  ["V-model", "Open Dialog", "secondary"],
  ["Transition", "Open Transition Dialog", "success"],
  ["Form", "Open Form Dialog", "warning"],
  ["Full screen", "Open Fullscreen Dialog", "error"],
  ["Persistent", "Open Dialog", "primary"],
  ["Scrollable", "Open Scrolling Dialog", "success"],
  ["Nested Dialog", "Open Dialog 1", "secondary"],
];
function close() {
  nested.value = false;
  active.value = null;
}
async function save() {
  if (active.value === "Form" && !(await form.value.validate()).valid) return;
  notify(
    active.value === "Form"
      ? "Demo form validated. Nothing was sent."
      : active.value === "Scrollable"
        ? "Selected locally: " + choice.value
        : "Dialog changes applied to this page.",
  );
  close();
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: DialogsContext = __viewReactive({
  get active() {
    return __viewUnref(active);
  },
  set active(value: any) {
    if (__viewIsRef(active)) (active as any).value = value;
  },
  get choice() {
    return __viewUnref(choice);
  },
  set choice(value: any) {
    if (__viewIsRef(choice)) (choice as any).value = value;
  },
  get close() {
    return __viewUnref(close);
  },
  get demos() {
    return __viewUnref(demos);
  },
  get form() {
    return __viewUnref(form);
  },
  set form(value: any) {
    if (__viewIsRef(form)) (form as any).value = value;
  },
  get nested() {
    return __viewUnref(nested);
  },
  set nested(value: any) {
    if (__viewIsRef(nested)) (nested as any).value = value;
  },
  get profile() {
    return __viewUnref(profile);
  },
  get required() {
    return __viewUnref(required);
  },
  get save() {
    return __viewUnref(save);
  },
  get settings() {
    return __viewUnref(settings);
  },
  get validEmail() {
    return __viewUnref(validEmail);
  },
  contentConfig: {
    texts: {
      dialog: "Dialog",
      persistent: "Persistent",
      fullScreen: "Full screen",
      none: "none",
      scrollable: "Scrollable",
      transition: "Transition",
      dialogBottomTransition: "dialog-bottom-transition",
      dialogTransition: "dialog-transition",
      settings: "Settings",
      form: "Form",
      userProfile: "User profile",
      selectACountry: "Select a country",
      nestedDialog: "Nested Dialog",
      dialog1: "Dialog 1",
      dialog2: " Dialog",
      closeDialog: "Close dialog",
      b5DialogBody: "b5-dialog-body",
      fullName: "Full name",
      email: "Email",
      notificationsPreferences: "Notifications & preferences",
      enableNotifications: "Enable notifications",
      soundEffects: "Sound effects",
      theseSettingsAreDemonstrationValuesOnly:
        " These settings are demonstration values only. ",
      thisDialogStaysOpenWhenYouClickOutsideOrPressEscapeChoo:
        "This dialog stays open when you click outside or press Escape. Choose Agree or Disagree to close it.",
      aDialogFocusesAttentionOnADecisionOrASmallPieceOfInform:
        "A dialog focuses attention on a decision or a small piece of information. This is a local demonstration of Vuetify dialog behaviour.",
      openDialog2: "Open Dialog 2",
      disagree: "Disagree",
      cancel: "Cancel",
      agree: "Agree",
      save: "Save",
      select: "Select",
      done: "Done",
      dialog22: "Dialog 2",
      thisNestedDialogAppearsAboveDialog1:
        "This nested dialog appears above Dialog 1.",
      closeDialog2: "Close Dialog 2",
    },
    values: {
      items1: [
        "United States",
        "United Kingdom",
        "Algeria",
        "Australia",
        "Austria",
        "Belgium",
        "Brazil",
        "Canada",
        "China",
        "Denmark",
        "Egypt",
        "Finland",
        "France",
        "Germany",
        "India",
        "Indonesia",
        "Italy",
        "Japan",
        "Mexico",
        "Morocco",
        "Netherlands",
        "New Zealand",
        "Norway",
        "Portugal",
        "South Africa",
        "Spain",
        "Sweden",
        "Switzerland",
        "Tunisia",
        "Turkey",
      ],
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
