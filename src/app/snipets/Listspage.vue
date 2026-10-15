<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Lists/Lists.vue";
import type { ListsContext } from "../../com/Lists/types";
import { ref } from "vue";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const selected = ref([]),
  rounded = ref([]),
  nested = ref([]),
  wifi = ref(true),
  bluetooth = ref(false),
  folder = ref(""),
  scrollItem = ref("");
const items = [
  ["Sample Page", "file"],
  ["Elements", "shapes"],
  ["Page Layouts", "layers"],
  ["Components", "grid"],
];

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ListsContext = __viewReactive({
  get bluetooth() {
    return __viewUnref(bluetooth);
  },
  set bluetooth(value: any) {
    if (__viewIsRef(bluetooth)) (bluetooth as any).value = value;
  },
  get folder() {
    return __viewUnref(folder);
  },
  set folder(value: any) {
    if (__viewIsRef(folder)) (folder as any).value = value;
  },
  get items() {
    return __viewUnref(items);
  },
  get nested() {
    return __viewUnref(nested);
  },
  set nested(value: any) {
    if (__viewIsRef(nested)) (nested as any).value = value;
  },
  get rounded() {
    return __viewUnref(rounded);
  },
  set rounded(value: any) {
    if (__viewIsRef(rounded)) (rounded as any).value = value;
  },
  get scrollItem() {
    return __viewUnref(scrollItem);
  },
  set scrollItem(value: any) {
    if (__viewIsRef(scrollItem)) (scrollItem as any).value = value;
  },
  get selected() {
    return __viewUnref(selected);
  },
  set selected(value: any) {
    if (__viewIsRef(selected)) (selected as any).value = value;
  },
  get wifi() {
    return __viewUnref(wifi);
  },
  set wifi(value: any) {
    if (__viewIsRef(wifi)) (wifi as any).value = value;
  },
  contentConfig: {
    texts: {
      lists: "Lists",
      simpleList: "Simple List",
      selected: " Selected: ",
      nestedList: "Nested List",
      nestedListItems: "Nested List Items",
      sentMail: "Sent Mail",
      drafts: "Drafts",
      inbox: "inbox",
      starred: "Starred",
      important: "Important",
      folderList: "Folder List",
      disabledList: "Disabled List",
      switchList: "Switch List",
      wiFi: "Wi-Fi",
      bluetooth: "Bluetooth",
      roundedList: "Rounded List",
      customAlignedList: "Custom Aligned List",
      textError: "text-error",
      textSuccess: "text-success",
      scrollableList: "Scrollable List",
      item: "Item ",
    },
    values: {
      items1: [
        ["Photos", "Jan 9, 2023"],
        ["Works", "Jan 17, 2023"],
        ["Vacation", "Jan 18, 2023"],
      ],
      items2: [
        ["Bajaj Finsery", "10% Profit", "$1839.00"],
        ["TTML", "10% Loss", "$100.00"],
        ["Reliance", "10% Profit", "$200.00"],
        ["TTML", "10% Loss", "$189.00"],
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
