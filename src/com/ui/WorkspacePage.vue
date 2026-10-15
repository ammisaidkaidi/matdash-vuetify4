<script setup>
import PageHeader from "./PageHeader.vue";
import { storageError } from "../../composables/useDemoStore";
defineProps({ title: String });
</script>
<template>
  <section class="workspace-page" data-page-ready="true">
    <PageHeader :title="title" /><slot />
    <p class="workspace-note">
      <Icon name="info" :size="14" />Demo workspace · Changes stay in this
      browser. No live services are connected.
    </p>
    <v-alert v-if="storageError" type="warning" variant="tonal" class="mt-3">{{
      storageError
    }}</v-alert>
  </section>
</template>
