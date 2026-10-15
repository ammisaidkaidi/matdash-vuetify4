<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Search/Search.vue";
import type { SearchContext } from "../../com/Search/types";
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VPagination } from "vuetify/components";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
const route = useRoute(),
  router = useRouter();
const query = ref(String(route.query.q || "Angular Js")),
  page = ref(1);
const titles = [
  "AngularJs",
  "AngularJs — Superheroic JavaScript MVW Framework",
  "AngularJS Tutorial - W3Schools",
  "Introduction to AngularJS - W3Schools",
  "AngularJS Tutorial",
  "Angular 2: One framework",
];
const records = [
  ...Array.from(
    {
      length: 24,
    },
    (_, i) => ({
      id: i,
      title:
        titles[i % 6] +
        (i > 5
          ? " · " + ["Guide", "Examples", "Components"][Math.floor(i / 6) - 1]
          : ""),
      url:
        i % 2 ? "https://www.w3schools.com/angular/" : "https://angular.dev/",
      text: "Explore framework concepts, reusable components, application structure, and practical examples for your next project.",
    }),
  ),
  ...[
    "Vue 3 documentation",
    "Vue Router guide",
    "Vuetify components",
    "Vue forms and validation",
    "Vue dashboard layouts",
    "Vue state management",
  ].map((title, i) => ({
    id: 24 + i,
    title,
    url: "https://vuejs.org/guide/introduction.html",
    text: "Learn to build responsive Vue applications with components and reactive state.",
  })),
];
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const results = computed(() =>
  records.filter((r) => normalize(r.title).includes(normalize(query.value))),
);
const shown = computed(() =>
  results.value.slice((page.value - 1) * 6, page.value * 6),
);
watch(query, () => {
  page.value = 1;
  router.replace({
    query: {
      q: query.value,
    },
  });
});

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: SearchContext = __viewReactive({
  get page() {
    return __viewUnref(page);
  },
  set page(value: any) {
    if (__viewIsRef(page)) (page as any).value = value;
  },
  get query() {
    return __viewUnref(query);
  },
  set query(value: any) {
    if (__viewIsRef(query)) (query as any).value = value;
  },
  get results() {
    return __viewUnref(results);
  },
  set results(value: any) {
    if (__viewIsRef(results)) (results as any).value = value;
  },
  get shown() {
    return __viewUnref(shown);
  },
  set shown(value: any) {
    if (__viewIsRef(shown)) (shown as any).value = value;
  },
  contentConfig: {
    texts: {
      searchResults: "Search Results",
      searchSampleResults: "Search sample results",
      searchResultFor: "Search Result For “",
      text1: "”",
      localSampleResultsNotALiveWebSearch:
        " local sample results · Not a live web search ",
      noMatchingResultsTryAngularOrVue:
        " No matching results. Try Angular or Vue. ",
    },
    values: {},
  },
});
</script>

<template>
  <PresentationalView :context="__viewContext">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </PresentationalView>
</template>
