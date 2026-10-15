<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/ErrorPage/ErrorPage.vue";
import type { ErrorPageContext } from "../../com/ErrorPage/types";
import { asset } from "../../data/app-seed";

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ErrorPageContext = __viewReactive({
  get asset() {
    return __viewUnref(asset);
  },
  contentConfig: {
    texts: {
      errorimg: "errorimg-",
      text1: "404 error illustration",
      opps: "Opps!!!",
      thisPageYouAreLookingForCouldNotBeFound:
        "This page you are looking for could not be found.",
      dashboardsDashboard1: "/dashboards/dashboard1",
      goBackToHome: "Go Back To Home",
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
