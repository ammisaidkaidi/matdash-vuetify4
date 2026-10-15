<script setup>
defineProps({ title: String });
</script>
<template>
  <v-card class="b4-table-card" :data-example="title"
    ><header>
      <h2>{{ title }}</h2>
      <slot name="actions" />
    </header>
    <div class="b4-table-content"><slot /></div
  ></v-card>
</template>
