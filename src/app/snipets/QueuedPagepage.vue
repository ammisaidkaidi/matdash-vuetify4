<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/QueuedPage/QueuedPage.vue";
import type { QueuedPageContext } from "../../com/QueuedPage/types";
import { computed } from "vue";
import { useRoute } from "vue-router";
import PageHeader from "../../com/ui/PageHeader.vue";
import { routeCatalog } from "../../data/navigation";
const route = useRoute();
const related = computed(() =>
  routeCatalog
    .filter(
      (p) => p.category === route.meta.category && p.path !== route.meta.path,
    )
    .slice(0, 5),
);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: QueuedPageContext = __viewReactive({
  get related() {
    return __viewUnref(related);
  },
  set related(value: any) {
    if (__viewIsRef(related)) (related as any).value = value;
  },
  get route() {
    return __viewUnref(route);
  },
  set route(value: any) {
    if (__viewIsRef(route)) (route as any).value = value;
  },
  contentConfig: {
    texts: {
      mappedAwaitingRebuild: "Mapped · awaiting rebuild",
      thisRouteIsConnectedToYourAppButItsPageHasNotBeenRecrea:
        " This route is connected to your app, but its page has not been recreated yet. It is part of the next stages of the full MatDash rebuild. ",
      pagesAccountSettings: "/pages/account-settings",
      openAccountSettings: "Open Account Settings",
      pagesRouteDirectory: "/pages/route-directory",
      viewAllRoutes: "View all routes",
      thisIsAClearlyMarkedPlaceholderNotTheCompleted:
        "This is a clearly marked placeholder, not the completed ",
      page: " page.",
      moreIn: "More in ",
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
