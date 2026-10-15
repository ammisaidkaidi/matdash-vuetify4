<script setup lang="ts">
import PageHeader from "../ui/PageHeader.vue";
import Icon from "../ui/Icon.vue";
import type { QueuedPageContext } from "./types";

defineProps<{ context: QueuedPageContext }>();
</script>

<template>
  <div class="queued-page">
    <PageHeader
      :title="context.route.meta.label || context.route.meta.title"
      :category="context.route.meta.category"
    /><v-card class="queued-content"
      ><v-avatar color="lightprimary" rounded="xl" size="76"
        ><Icon
          :name="context.route.meta.icon"
          :size="36"
          class="text-primary" /></v-avatar
      ><v-chip size="small" color="primary" variant="tonal" class="mt-6 mb-3">{{
        context.contentConfig.texts.mappedAwaitingRebuild
      }}</v-chip>
      <h2>{{ context.route.meta.title }}</h2>
      <p class="queued-description">
        {{
          context.contentConfig.texts
            .thisRouteIsConnectedToYourAppButItsPageHasNotBeenRecrea
        }}
      </p>
      <code class="queued-path">{{ context.route.path }}</code>
      <div class="queued-actions">
        <v-btn
          color="primary"
          :to="context.contentConfig.texts.pagesAccountSettings"
          >{{ context.contentConfig.texts.openAccountSettings }}</v-btn
        ><v-btn
          variant="outlined"
          color="primary"
          :to="context.contentConfig.texts.pagesRouteDirectory"
          >{{ context.contentConfig.texts.viewAllRoutes }}</v-btn
        >
      </div>
      <div class="queued-note">
        <Icon name="info" :size="18" /><span
          >{{
            context.contentConfig.texts
              .thisIsAClearlyMarkedPlaceholderNotTheCompleted
          }}{{ context.route.meta.label
          }}{{ context.contentConfig.texts.page }}</span
        >
      </div></v-card
    ><v-card v-if="context.related.length" class="related-routes"
      ><h3>
        {{ context.contentConfig.texts.moreIn
        }}{{ context.route.meta.category }}
      </h3>
      <div>
        <v-btn
          v-for="page in context.related"
          :key="page.path"
          :to="page.path"
          variant="tonal"
          color="primary"
          size="small"
          >{{ page.label }}<Icon name="right" :size="14" class="ml-1"
        /></v-btn></div
    ></v-card>
  </div>
</template>
