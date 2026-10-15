<script setup>
import { ref } from "vue";
import {
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelTitle,
  VExpansionPanelText,
} from "vuetify/components";
defineProps({ items: Array });
const open = ref();
</script>
<template>
  <v-expansion-panels v-model="open" variant="accordion" class="b3-faq-list"
    ><v-expansion-panel v-for="[question, answer] in items" :key="question"
      ><v-expansion-panel-title>{{ question }}</v-expansion-panel-title
      ><v-expansion-panel-text
        ><p class="b3-faq-answer">{{ answer }}</p></v-expansion-panel-text
      ></v-expansion-panel
    ></v-expansion-panels
  >
</template>
