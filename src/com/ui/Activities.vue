<script setup>
import { activities } from "../../data/batch03";
</script>
<template>
  <v-card class="workspace-card"
    ><h2 class="mb-6">Daily activities</h2>
    <div
      v-for="[time, text, color] in activities"
      :key="time + text"
      class="b3-activity"
    >
      <time>{{ time }}</time
      ><i :class="'text-' + color" />
      <p>{{ text }}</p>
    </div></v-card
  >
</template>
