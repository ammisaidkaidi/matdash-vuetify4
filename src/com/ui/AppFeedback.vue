<script setup>
import { feedback, answerConfirm } from "../../composables/useFeedback";
</script>
<template>
  <v-snackbar
    v-model="feedback.show"
    :color="feedback.color"
    location="top right"
    :timeout="3500"
    >{{ feedback.text
    }}<template #actions
      ><v-btn
        icon
        variant="text"
        size="small"
        aria-label="Dismiss message"
        @click="feedback.show = false"
        ><Icon name="close" /></v-btn></template></v-snackbar
  ><v-dialog
    :model-value="feedback.confirm"
    @update:model-value="answerConfirm(false)"
    ><v-card class="dialog-body"
      ><h2>{{ feedback.title }}</h2>
      <p class="muted mt-3">{{ feedback.description }}</p>
      <div class="dialog-actions">
        <v-btn variant="text" @click="answerConfirm(false)">Cancel</v-btn
        ><v-btn color="error" @click="answerConfirm(true)">Confirm</v-btn>
      </div></v-card
    ></v-dialog
  >
</template>
