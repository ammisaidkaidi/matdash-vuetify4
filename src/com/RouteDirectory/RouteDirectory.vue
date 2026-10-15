<script setup lang="ts">
import PageHeader from "../ui/PageHeader.vue";
import Icon from "../ui/Icon.vue";
import type { RouteDirectoryContext } from "./types";

defineProps<{ context: RouteDirectoryContext }>();
</script>

<template>
  <div class="route-directory">
    <PageHeader :title="context.contentConfig.texts.routeDirectory" /><v-card
      class="directory-intro"
      ><div>
        <span class="eyebrow">{{
          context.contentConfig.texts.mATDASHBUILDPROGRESS
        }}</span>
        <h2>
          {{ context.contentConfig.texts.oneWorkspaceEveryRouteConnected }}
        </h2>
        <p class="muted">
          {{
            context.contentConfig.texts
              .allOriginalSidebarDestinationsNowOpenLocallyFollowTheSt
          }}
        </p>
      </div>
      <v-avatar size="72" color="lightprimary" rounded="xl"
        ><Icon name="layers" :size="34" class="text-primary" /></v-avatar
    ></v-card>
    <div class="route-metrics">
      <v-card
        ><span>{{ context.contentConfig.texts.mappedRoutes }}</span
        ><strong>{{ context.routeCatalog.length }}</strong>
        <p>
          {{ context.contentConfig.texts.localNavigationWithVueRouter }}
        </p></v-card
      ><v-card
        ><span>{{ context.contentConfig.texts.readyPages }}</span
        ><strong class="text-success">{{ context.ready.length }}</strong>
        <p>
          {{
            context.contentConfig.texts
              .implementedFrontEndPagesAcrossCompletedBatches
          }}
        </p></v-card
      ><v-card
        ><span>{{ context.contentConfig.texts.queuedPages }}</span
        ><strong class="text-primary">{{
          context.routeCatalog.length - context.ready.length
        }}</strong>
        <p>
          {{
            context.contentConfig.texts
              .explicitPlaceholdersNotFinishedRecreations
          }}
        </p></v-card
      >
    </div>
    <v-card class="directory-content"
      ><div class="directory-filters">
        <v-text-field
          v-model="context.query"
          :aria-label="context.contentConfig.texts.findARoute"
          :placeholder="context.contentConfig.texts.searchPagesOrPaths"
          density="compact"
          ><template #prepend-inner
            ><Icon name="search" :size="19" /></template></v-text-field
        ><v-select
          v-model="context.category"
          :items="context.categories"
          :aria-label="context.contentConfig.texts.filterRouteCategory"
        /><v-select
          v-model="context.status"
          :items="context.contentConfig.values.items1"
          :aria-label="context.contentConfig.texts.filterRouteStatus"
        />
      </div>
      <p class="text-caption muted mb-5">
        {{ context.filtered.length
        }}{{
          context.contentConfig.texts
            .routesFoundReadyRefersToTheFrontEndDemoNoBackendIsConne
        }}
      </p>
      <section
        v-for="group in context.byCategory"
        :key="group.name"
        class="route-group"
      >
        <h3>
          {{ group.name }} <span>{{ group.pages.length }}</span>
        </h3>
        <div class="route-card-grid">
          <router-link
            v-for="page in group.pages"
            :key="page.path"
            :to="page.path"
            class="route-link"
            ><v-avatar size="40" color="rail" rounded="lg"
              ><Icon :name="page.icon" :size="20"
            /></v-avatar>
            <div>
              <h4>{{ page.title }}</h4>
              <code>{{ page.path }}</code>
            </div>
            <v-chip
              :color="
                page.status === context.contentConfig.texts.ready
                  ? context.contentConfig.texts.success
                  : context.contentConfig.texts.primary
              "
              variant="tonal"
              size="x-small"
              >{{
                page.status === context.contentConfig.texts.ready
                  ? context.contentConfig.texts.ready2
                  : context.contentConfig.texts.queued
              }}</v-chip
            ></router-link
          >
        </div>
      </section>
      <div v-if="!context.filtered.length" class="route-empty">
        <Icon name="search" :size="32" />
        <h3>{{ context.contentConfig.texts.noMatchingRoutes }}</h3>
        <p class="muted">
          {{
            context.contentConfig.texts.tryADifferentPageNameCategoryOrStatus
          }}
        </p>
        <v-btn
          variant="tonal"
          color="primary"
          class="mt-4"
          @click="
            context.query = context.contentConfig.texts.text1;
            context.category = context.contentConfig.texts.allCategories;
            context.status = context.contentConfig.texts.allStatuses;
          "
          >{{ context.contentConfig.texts.clearFilters }}</v-btn
        >
      </div></v-card
    >
  </div>
</template>
