<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Ratings/Ratings.vue";
import type { RatingsContext } from "../../com/Ratings/types";
import { reactive } from "vue";
import {
  mdiHeart,
  mdiHeartOutline,
  mdiHeartHalfFull,
  mdiCircle,
  mdiCircleOutline,
  mdiCircleHalfFull,
} from "@mdi/js";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const ratings = reactive({
  basic: 3,
  clear: 3,
  hover: 3,
  half: 3.5,
  length: 5,
  label: 3,
  second: 3,
  heart: 3.5,
  circle: 3.5,
  sizes: [3, 3, 3],
});

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: RatingsContext = __viewReactive({
  get mdiCircle() {
    return __viewUnref(mdiCircle);
  },
  get mdiCircleHalfFull() {
    return __viewUnref(mdiCircleHalfFull);
  },
  get mdiCircleOutline() {
    return __viewUnref(mdiCircleOutline);
  },
  get mdiHeart() {
    return __viewUnref(mdiHeart);
  },
  get mdiHeartHalfFull() {
    return __viewUnref(mdiHeartHalfFull);
  },
  get mdiHeartOutline() {
    return __viewUnref(mdiHeartOutline);
  },
  get ratings() {
    return __viewUnref(ratings);
  },
  contentConfig: {
    texts: {
      rating: "Rating",
      basic: "Basic",
      text1: " / 5",
      readOnly: "Read Only",
      clearable: "Clearable",
      clickTheCurrentRatingAgainToClear:
        " Click the current rating again to clear. ",
      hover: "Hover",
      halfRatting: "Half Ratting",
      length: "Length",
      label: "Label",
      sad: "sad",
      happy: "happy",
      icons: "Icons",
      size: "Size",
    },
    values: {
      itemlabels1: ["1", "2", "3", "4", "5"],
      items2: [18, 25, 32],
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
