<script setup>
defineProps({ title: String, category: String });
</script>
<template>
  <v-card class="page-header"
    ><h1>{{ title }}</h1>
    <nav class="page-breadcrumb" aria-label="Breadcrumb">
      <v-btn
        to="/dashboards/dashboard1"
        variant="text"
        size="32"
        icon
        aria-label="Dashboard home"
        ><Icon name="home" :size="18" /></v-btn
      ><span v-if="category" class="breadcrumb-category">{{ category }}</span
      ><v-chip color="primary" size="small" rounded="sm">{{ title }}</v-chip>
    </nav></v-card
  >
</template>
