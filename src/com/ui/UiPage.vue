<script setup>
import PageHeader from "./PageHeader.vue";
defineProps({ title: String, heading: String, bare: Boolean });
</script>
<template>
  <section class="b5-ui-page form-page" data-page-ready="true" data-batch="5">
    <PageHeader :title="title" /><slot v-if="bare" /><v-card
      v-else
      class="form-showcase"
      ><header class="showcase-heading">
        <h2>{{ heading || title }}</h2>
      </header>
      <div class="showcase-content"><slot /></div
    ></v-card>
    <p class="form-demo-note">
      <Icon name="info" :size="14" />Interactive Vuetify 4 examples · Changes
      are local to this page.
    </p>
  </section>
</template>
