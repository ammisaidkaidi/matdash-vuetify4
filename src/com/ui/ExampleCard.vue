<script setup>
defineProps({ title: String, wide: Boolean, description: String });
</script>
<template>
  <section
    :class="['example-card', { wide }]"
    :aria-label="title"
    :data-example="title"
  >
    <header v-if="title">
      <h3>{{ title }}</h3>
    </header>
    <div class="example-content">
      <slot />
      <p v-if="description" class="example-description">{{ description }}</p>
    </div>
  </section>
</template>
