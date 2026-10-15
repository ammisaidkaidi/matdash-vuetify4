<script setup>
import PageHeader from "./PageHeader.vue";
defineProps({ title: String, heading: String, bare: Boolean });
</script>
<template>
  <section class="form-page" data-page-ready="true" data-batch="2">
    <PageHeader :title="title" /><template v-if="bare"><slot /></template
    ><v-card v-else class="form-showcase"
      ><header class="showcase-heading">
        <h2>{{ heading || title }}</h2>
      </header>
      <div class="showcase-content"><slot /></div
    ></v-card>
    <p class="form-demo-note">
      <Icon name="info" :size="14" />Interactive Vuetify 4 examples · No
      information is sent to a server.
    </p>
  </section>
</template>
