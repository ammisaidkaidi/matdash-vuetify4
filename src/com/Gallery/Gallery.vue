<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import type { GalleryContext } from "./types";

defineProps<{ context: GalleryContext }>();
</script>

<template>
  <WorkspacePage
    :title="
      context.profile
        ? context.contentConfig.texts.gallery
        : context.contentConfig.texts.galleryLightbox
    "
    data-batch="3"
    ><component :is="context.ProfileHeader" v-if="context.profile" /><component
      :is="context.GalleryGrid"
      :searchable="context.profile"
  /></WorkspacePage>
</template>
