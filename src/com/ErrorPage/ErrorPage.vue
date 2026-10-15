<script setup lang="ts">
import type { ErrorPageContext } from "./types";

defineProps<{ context: ErrorPageContext }>();
</script>

<template>
  <section class="b5-error-page" data-page-ready="true" data-batch="5">
    <img
      :src="context.asset(context.contentConfig.texts.errorimg)"
      :alt="context.contentConfig.texts.text1"
    />
    <h1>{{ context.contentConfig.texts.opps }}</h1>
    <p>
      {{ context.contentConfig.texts.thisPageYouAreLookingForCouldNotBeFound }}
    </p>
    <v-btn
      color="primary"
      :to="context.contentConfig.texts.dashboardsDashboard1"
      >{{ context.contentConfig.texts.goBackToHome }}</v-btn
    >
  </section>
</template>
