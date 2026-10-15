<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Avatars/Avatars.vue";
import type { AvatarsContext } from "../../com/Avatars/types";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { avatar } from "../../data/app-seed";
const colors = ["primary", "secondary", "error", "warning", "success"];

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: AvatarsContext = __viewReactive({
  get avatar() {
    return __viewUnref(avatar);
  },
  get colors() {
    return __viewUnref(colors);
  },
  contentConfig: {
    texts: {
      avatar: "Avatar",
      imageAvatars: "Image Avatars",
      samplePerson: "Sample person ",
      letterAvatars: "Letter Avatars",
      aBCDE: "ABCDE",
      iconAvatars: "Icon Avatars",
      variant: "Variant",
      sizes: "Sizes",
      pixelAvatar: " pixel avatar",
    },
    values: {
      items1: [2, 3, 4],
      items2: [0, "lg", "circle"],
      items3: [24, 32, 40, 50, 64],
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
