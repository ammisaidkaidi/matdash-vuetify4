<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Gallery/Gallery.vue";
import type { GalleryContext } from "../../com/Gallery/types";
import { useRoute } from "vue-router";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import ProfileHeader from "../../com/ui/ProfileHeader.vue";
import GalleryGrid from "../../com/ui/GalleryGrid.vue";
const profile = useRoute().path.includes("/profile/");

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: GalleryContext = __viewReactive({
  get GalleryGrid() {
    return __viewUnref(GalleryGrid);
  },
  get ProfileHeader() {
    return __viewUnref(ProfileHeader);
  },
  get profile() {
    return __viewUnref(profile);
  },
  set profile(value: any) {
    if (__viewIsRef(profile)) (profile as any).value = value;
  },
  contentConfig: {
    texts: {
      gallery: "Gallery",
      galleryLightbox: "Gallery Lightbox",
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
