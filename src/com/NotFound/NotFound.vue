<script setup lang="ts">
import type { NotFoundContext } from "./types";

defineProps<{ context: NotFoundContext }>();
</script>

<template>
  <v-card class="not-found"
    ><span>{{ context.contentConfig.texts.text1 }}</span>
    <h1>{{ context.contentConfig.texts.thisPageIsnTInYourWorkspace }}</h1>
    <p class="muted">
      {{ context.contentConfig.texts.noRouteMatches
      }}<code>{{ context.route.path }}</code
      >{{ context.contentConfig.texts.text2 }}
    </p>
    <div class="queued-actions">
      <v-btn
        color="primary"
        :to="context.contentConfig.texts.dashboardsDashboard1"
        >{{ context.contentConfig.texts.backToDashboard }}</v-btn
      ><v-btn
        variant="outlined"
        color="primary"
        :to="context.contentConfig.texts.pagesRouteDirectory"
        >{{ context.contentConfig.texts.browseRoutes }}</v-btn
      >
    </div></v-card
  >
</template>
