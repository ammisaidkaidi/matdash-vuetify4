<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/FileInputs/FileInputs.vue";
import type { FileInputsContext } from "../../com/FileInputs/types";
import { reactive, computed } from "vue";
import { VFileInput } from "vuetify/components";
import { mdiCamera } from "@mdi/js";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const files = reactive({
  accept: null,
  chips: [],
  counter: [],
  density: null,
  multiple: [],
  icon: null,
  avatar: null,
  selection: [],
});
const normalize = (v) => (v ? (Array.isArray(v) ? v : [v]) : []);
const avatarRules = [
  (v) =>
    normalize(v).every((f) => f.size <= 2 * 1024 * 1024) ||
    "Avatar must be 2 MB or smaller.",
  (v) =>
    normalize(v).every((f) =>
      ["image/jpeg", "image/png", "image/gif"].includes(f.type),
    ) || "Choose a JPG, PNG, or GIF image.",
];
const selectedCount = computed(() =>
  Object.values(files).reduce((sum, list) => sum + normalize(list).length, 0),
);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: FileInputsContext = __viewReactive({
  get avatarRules() {
    return __viewUnref(avatarRules);
  },
  get files() {
    return __viewUnref(files);
  },
  get mdiCamera() {
    return __viewUnref(mdiCamera);
  },
  get selectedCount() {
    return __viewUnref(selectedCount);
  },
  set selectedCount(value: any) {
    if (__viewIsRef(selectedCount)) (selectedCount as any).value = value;
  },
  contentConfig: {
    texts: {
      fileInputs: "File Inputs",
      accept: "Accept",
      fileInput: "File input",
      chips: "Chips",
      fileInputWChips: "File input w/ chips",
      counter: "Counter",
      fileInputWithCounter: "File input with counter",
      density: "Density",
      compactFileInput: "Compact file input",
      multiple: "Multiple",
      multipleFiles: "Multiple files",
      prependIcon: "Prepend Icon",
      fileWithCameraIcon: "File with camera icon",
      validation: "Validation",
      avatar: "Avatar",
      complexSelectionSlots: "Complex selection slots",
      customSelectionFiles: "Custom selection files",
      text1: "+",
      files: " files",
      filesSelectedFilesRemainInMemoryAndAreNotUploaded:
        " files selected · Files remain in memory and are not uploaded.",
      clearAllFiles: "Clear all files",
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
