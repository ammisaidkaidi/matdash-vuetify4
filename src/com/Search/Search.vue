<script setup lang="ts">
import { VPagination } from "vuetify/components";
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { SearchContext } from "./types";

defineProps<{ context: SearchContext }>();
</script>

<template>
  <WorkspacePage
    :title="context.contentConfig.texts.searchResults"
    data-batch="3"
    ><v-card class="workspace-card"
      ><v-text-field
        v-model="context.query"
        :label="context.contentConfig.texts.searchSampleResults"
        density="comfortable"
        class="mb-6"
        ><template #prepend-inner><Icon name="search" :size="20" /></template
      ></v-text-field>
      <h2>
        {{ context.contentConfig.texts.searchResultFor }}{{ context.query
        }}{{ context.contentConfig.texts.text1 }}
      </h2>
      <p class="muted text-caption mt-1">
        {{ context.results.length
        }}{{ context.contentConfig.texts.localSampleResultsNotALiveWebSearch }}
      </p>
      <article
        v-for="result in context.shown"
        :key="result.id"
        class="b3-search-result"
      >
        <a :href="result.url" target="_blank" rel="noopener noreferrer"
          ><h3>{{ result.title }}</h3>
          <span>{{ result.url }}</span></a
        >
        <p class="muted">{{ result.text }}</p>
      </article>
      <p v-if="!context.shown.length" class="workspace-empty">
        {{ context.contentConfig.texts.noMatchingResultsTryAngularOrVue }}
      </p>
      <v-pagination
        v-if="context.results.length > 6"
        v-model="context.page"
        :length="Math.ceil(context.results.length / 6)"
        :total-visible="4"
        color="primary"
        class="b3-pagination" /></v-card
  ></WorkspacePage>
</template>
