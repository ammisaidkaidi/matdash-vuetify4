<script setup lang="ts">
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { DateTimeContext } from "./types";

defineProps<{ context: DateTimeContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.datePicker" heading="Date Time"
    ><div class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.datePicker"
        ><v-text-field
          v-model="context.date"
          type="date"
          :aria-label="context.contentConfig.texts.datePicker"
          variant="outlined"
          hide-details
          density="comfortable" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.timePicker"
        ><v-text-field
          v-model="context.time"
          type="time"
          :aria-label="context.contentConfig.texts.timePicker"
          variant="outlined"
          hide-details
          density="comfortable"
      /></ExampleCard>
    </div>
    <div
      v-if="context.date || context.time"
      class="example-footer"
      aria-live="polite"
    >
      <span
        >{{ context.contentConfig.texts.selected
        }}{{ context.date || context.contentConfig.texts.noDate
        }}{{ context.contentConfig.texts.text1
        }}{{ context.time || context.contentConfig.texts.noTime }}</span
      ><v-btn
        variant="text"
        color="primary"
        @click="
          context.date = context.contentConfig.texts.text2;
          context.time = context.contentConfig.texts.text2;
        "
        >{{ context.contentConfig.texts.clearSelection }}</v-btn
      >
    </div></FormPage
  >
</template>
