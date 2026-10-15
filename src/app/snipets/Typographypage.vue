<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Typography/Typography.vue";
import type { TypographyContext } from "../../com/Typography/types";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const text =
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur";
const headingSizes = [
  [36, 60],
  [30, 36],
  [22, 32],
  [20, 25],
  [18, 25],
  [16, 25],
];
const bodyStyles = [
  ["Subtitle 1", 15, 17.6],
  ["Subtitle 2", 13, 16],
  ["Body 1", 14, 24],
  ["Body 2", 12, 24],
  ["Caption", 14, 24],
  ["Overline", 12, 24],
];

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: TypographyContext = __viewReactive({
  get bodyStyles() {
    return __viewUnref(bodyStyles);
  },
  get headingSizes() {
    return __viewUnref(headingSizes);
  },
  get text() {
    return __viewUnref(text);
  },
  contentConfig: {
    texts: {
      typography: "Typography",
      heading: "Heading",
      h: "h",
      px: "px",
      heading2: ".Heading",
      fontSize: " font size: ",
      lineHeight: " | line-height: ",
      fontWeight600: " | font weight: 600 ",
      overline: "Overline",
      uppercase: "uppercase",
      text1: ". ",
      fontWeight400: " | font weight: 400 ",
      defaultText: "Default Text",
      text: "text-",
      text2: "Text ",
      textAlignment: "Text-alignment",
      leftAlignedOnAllViewportSizes: "Left aligned on all viewport sizes.",
      centerAlignedOnAllViewportSizes: "Center aligned on all viewport sizes.",
      rightAlignedOnAllViewportSizes: "Right aligned on all viewport sizes.",
      left: "-left",
      leftAlignedOnViewports: " Left aligned on viewports ",
      orWider: " or wider. ",
      decoration: "Decoration",
      pagesRouteDirectory: "/pages/route-directory",
      nonUnderlinedLink: "Non-underlined link",
      lineThroughText: "Line-through text",
      overlineText: "Overline text",
      underlineText: "Underline text",
      opacity: "Opacity",
      highEmphasisHasAnOpacityOf87InLightSkinAnd100InDark:
        " High-emphasis has an opacity of 87% in light skin and 100% in dark. ",
      mediumEmphasisTextAndHintTextHaveOpacitiesOf60InLightSk:
        " Medium-emphasis text and hint text have opacities of 60% in light skin and 70% in dark. ",
      disabledTextHasAnOpacityOf38InLightSkinAnd50InDark:
        " Disabled text has an opacity of 38% in light skin and 50% in dark. ",
    },
    values: {
      items1: ["primary", "secondary", "info", "warning", "error", "success"],
      items2: ["sm", "md", "lg", "xl"],
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
