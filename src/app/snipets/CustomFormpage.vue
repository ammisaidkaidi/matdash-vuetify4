<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/CustomForm/CustomForm.vue";
import type { CustomFormContext } from "../../com/CustomForm/types";
import { reactive, ref } from "vue";
import { VSlider, VRangeSlider } from "vuetify/components";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { required } from "../../composables/useFeedback";
const model = reactive({
  name: "",
  company: "",
  industry: "",
  select: "One",
  time: "",
  date: "",
  gender: "Male",
  check: [true, false],
  range: [750, 950],
  volume: 60,
  switches: [true, false],
});
const open = ref(false),
  newName = ref(""),
  entries = ref([]),
  form = ref(null);
async function add() {
  if ((await form.value.validate()).valid) {
    entries.value.push(newName.value.trim());
    newName.value = "";
    open.value = false;
  }
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: CustomFormContext = __viewReactive({
  get add() {
    return __viewUnref(add);
  },
  get entries() {
    return __viewUnref(entries);
  },
  set entries(value: any) {
    if (__viewIsRef(entries)) (entries as any).value = value;
  },
  get form() {
    return __viewUnref(form);
  },
  set form(value: any) {
    if (__viewIsRef(form)) (form as any).value = value;
  },
  get model() {
    return __viewUnref(model);
  },
  get newName() {
    return __viewUnref(newName);
  },
  set newName(value: any) {
    if (__viewIsRef(newName)) (newName as any).value = value;
  },
  get open() {
    return __viewUnref(open);
  },
  set open(value: any) {
    if (__viewIsRef(open)) (open as any).value = value;
  },
  get required() {
    return __viewUnref(required);
  },
  contentConfig: {
    texts: {
      formLayouts: "Form Layouts",
      name: "Name",
      enterText: "Enter Text",
      companyName: "Company Name",
      industryType: "Industry Type",
      selectDropdown: "Select Dropdown",
      time: "Time",
      date: "Date",
      loremIpsumDolorSitAmet: "Lorem ipsum dolor sit amet",
      male: "Male",
      female: "Female",
      disabled: "Disabled",
      enterText2: "Enter text",
      industryCheckbox: "Industry checkbox ",
      slider: "Slider",
      customPriceRange: "Custom price range",
      minimumPrice: "Minimum price",
      maximumPrice: "Maximum price",
      volume: "Volume",
      switch: "Switch",
      customSwitch: "Custom switch ",
      addNew: "Add New",
      addedEntries: "Added entries",
      remove: "Remove ",
      addNewEntry: "Add new entry",
      entryName: "Entry name",
      addEntry: "Add entry",
      cancel: "Cancel",
    },
    values: {
      items1: ["One", "Two", "Three"],
      items2: ["primary", "secondary", "warning", "error", "success"],
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
