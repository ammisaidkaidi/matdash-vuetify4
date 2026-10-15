<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/RouteDirectory/RouteDirectory.vue";
import type { RouteDirectoryContext } from "../../com/RouteDirectory/types";
import { computed, ref } from "vue";
import { routeCatalog } from "../../data/navigation";
import PageHeader from "../../com/ui/PageHeader.vue";
const query = ref(""),
  category = ref("All categories"),
  status = ref("All statuses");
const categories = [
  "All categories",
  ...new Set(routeCatalog.map((p) => p.category)),
];
const ready = routeCatalog.filter((p) => p.status === "ready");
const filtered = computed(() =>
  routeCatalog.filter(
    (p) =>
      (category.value === "All categories" || p.category === category.value) &&
      (status.value === "All statuses" ||
        p.status === (status.value === "Ready" ? "ready" : "queued")) &&
      `${p.title} ${p.path}`.toLowerCase().includes(query.value.toLowerCase()),
  ),
);
const byCategory = computed(() =>
  categories
    .slice(1)
    .map((name) => ({
      name,
      pages: filtered.value.filter((p) => p.category === name),
    }))
    .filter((g) => g.pages.length),
);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: RouteDirectoryContext = __viewReactive({
  get byCategory() {
    return __viewUnref(byCategory);
  },
  set byCategory(value: any) {
    if (__viewIsRef(byCategory)) (byCategory as any).value = value;
  },
  get categories() {
    return __viewUnref(categories);
  },
  get category() {
    return __viewUnref(category);
  },
  set category(value: any) {
    if (__viewIsRef(category)) (category as any).value = value;
  },
  get filtered() {
    return __viewUnref(filtered);
  },
  set filtered(value: any) {
    if (__viewIsRef(filtered)) (filtered as any).value = value;
  },
  get query() {
    return __viewUnref(query);
  },
  set query(value: any) {
    if (__viewIsRef(query)) (query as any).value = value;
  },
  get ready() {
    return __viewUnref(ready);
  },
  set ready(value: any) {
    if (__viewIsRef(ready)) (ready as any).value = value;
  },
  get routeCatalog() {
    return __viewUnref(routeCatalog);
  },
  get status() {
    return __viewUnref(status);
  },
  set status(value: any) {
    if (__viewIsRef(status)) (status as any).value = value;
  },
  contentConfig: {
    texts: {
      routeDirectory: "Route Directory",
      mATDASHBUILDPROGRESS: "MATDASH · BUILD PROGRESS",
      oneWorkspaceEveryRouteConnected: "One workspace. Every route connected.",
      allOriginalSidebarDestinationsNowOpenLocallyFollowTheSt:
        " All original sidebar destinations now open locally. Follow the staged rebuild below. ",
      mappedRoutes: "Mapped routes",
      localNavigationWithVueRouter: "Local navigation with Vue Router",
      readyPages: "Ready pages",
      implementedFrontEndPagesAcrossCompletedBatches:
        "Implemented front-end pages across completed batches",
      queuedPages: "Queued pages",
      explicitPlaceholdersNotFinishedRecreations:
        "Explicit placeholders, not finished recreations",
      findARoute: "Find a route",
      searchPagesOrPaths: "Search pages or paths…",
      filterRouteCategory: "Filter route category",
      filterRouteStatus: "Filter route status",
      routesFoundReadyRefersToTheFrontEndDemoNoBackendIsConne:
        " routes found · “Ready” refers to the front-end demo; no backend is connected. ",
      ready: "ready",
      success: "success",
      primary: "primary",
      ready2: "Ready",
      queued: "Queued",
      noMatchingRoutes: "No matching routes",
      tryADifferentPageNameCategoryOrStatus:
        "Try a different page name, category, or status.",
      text1: "",
      allCategories: "All categories",
      allStatuses: "All statuses",
      clearFilters: "Clear filters",
    },
    values: {
      items1: ["All statuses", "Ready", "Queued"],
    },
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
