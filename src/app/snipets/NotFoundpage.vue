<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/NotFound/NotFound.vue";
import type { NotFoundContext } from "../../com/NotFound/types";
import { useRoute } from "vue-router";
const route = useRoute();

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: NotFoundContext = __viewReactive({
  get route() {
    return __viewUnref(route);
  },
  set route(value: any) {
    if (__viewIsRef(route)) (route as any).value = value;
  },
  contentConfig: {
    texts: {
      text1: "404",
      thisPageIsnTInYourWorkspace: "This page isn’t in your workspace",
      noRouteMatches: " No route matches ",
      text2: ". ",
      dashboardsDashboard1: "/dashboards/dashboard1",
      backToDashboard: "Back to dashboard",
      pagesRouteDirectory: "/pages/route-directory",
      browseRoutes: "Browse routes",
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
