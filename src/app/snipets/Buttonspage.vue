<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Buttons/Buttons.vue";
import type { ButtonsContext } from "../../com/Buttons/types";
import { ref } from "vue";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { notify } from "../../composables/useFeedback";
const colors = ["primary", "secondary", "error", "warning", "success"];
const sizes = [
  ["x-small", "Extra Small"],
  ["small", "Small"],
  ["default", "Normal"],
  ["large", "Large"],
  ["x-large", "Extra Large"],
];
const iconNames = ["heart", "star", "send", "trash", "download"];
const groups = ref([0, 0, 0, 0]);
const clicked = (label) => notify(label + " button clicked.");

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ButtonsContext = __viewReactive({
  get clicked() {
    return __viewUnref(clicked);
  },
  get colors() {
    return __viewUnref(colors);
  },
  get groups() {
    return __viewUnref(groups);
  },
  set groups(value: any) {
    if (__viewIsRef(groups)) (groups as any).value = value;
  },
  get iconNames() {
    return __viewUnref(iconNames);
  },
  get sizes() {
    return __viewUnref(sizes);
  },
  contentConfig: {
    texts: {
      buttons: "Buttons",
      base: "Base",
      elevated: "elevated",
      primary: "primary",
      colors: "Colors",
      size: "Size",
      outlined: "Outlined",
      primary2: "Primary",
      secondary: "Secondary",
      disabled: "Disabled",
      formsFormElementsCombobox: "/forms/form-elements/combobox",
      link: "Link",
      outlinedIcon: "Outlined Icon",
      leftIcon: "Left Icon",
      rightIcon: "Right Icon",
      outlineSize: "Outline Size",
      textColor: "Text Color",
      outlinedIconColor: "Outlined Icon Color",
      iconColor: "Icon Color",
      outlined2: "outlined",
      flat: "flat",
      outlined3: "Outlined ",
      text1: "",
      button: " button",
      sizes: "sizes",
      outlinedIconSize: "Outlined Icon Size",
      iconSize: "Icon Size",
      icon: " icon",
      buttonGroup: "Button Group",
      default: "Default",
      text2: " ",
    },
    values: {
      items1: [
        ["elevated", "Elevates (Default)"],
        ["flat", "Flat"],
        ["tonal", "Tonal"],
        ["outlined", "Outlined"],
        ["text", "Text"],
        ["plain", "Plain"],
      ],
      items2: [false, true],
      items3: [false, true],
      items4: ["flat", "text", "plain", "outlined"],
      items5: ["Left", "Center", "Right"],
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
