<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Alerts/Alerts.vue";
import type { AlertsContext } from "../../com/Alerts/types";
import { ref } from "vue";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
import { notify } from "../../composables/useFeedback";
const types = ["error", "warning", "info", "success"],
  visible = ref(true),
  warning = ref(true),
  info = ref(true);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: AlertsContext = __viewReactive({
  get info() {
    return __viewUnref(info);
  },
  set info(value: any) {
    if (__viewIsRef(info)) (info as any).value = value;
  },
  get notify() {
    return __viewUnref(notify);
  },
  get types() {
    return __viewUnref(types);
  },
  get visible() {
    return __viewUnref(visible);
  },
  set visible(value: any) {
    if (__viewIsRef(visible)) (visible as any).value = value;
  },
  get warning() {
    return __viewUnref(warning);
  },
  set warning(value: any) {
    if (__viewIsRef(warning)) (warning as any).value = value;
  },
  contentConfig: {
    texts: {
      alert: "Alert",
      basic: "Basic",
      thisIsAn: "This is an ",
      alertCheckItOut: " alert — check it out!",
      description: "Description",
      action: "Action",
      thisIsAWarningAlertCheckItOut: "This is a warning alert — check it out!",
      warningAcknowledgedLocally: "Warning acknowledged locally.",
      undo: "Undo",
      thisIsAnInfoAlertCheckItOut: "This is an info alert — check it out!",
      dismissInfoAlert: "Dismiss info alert",
      resetActionAlerts: "Reset action alerts",
      withIcons: "With Icons",
      thisIsA: "This is a ",
      alert2: " alert.",
      closable: "Closable",
      closableAlert: "Closable Alert",
      aeneanImperdietQuisqueIdOdioCrasDapibusPellentesqueUtNe:
        "Aenean imperdiet. Quisque id odio. Cras dapibus. Pellentesque ut neque. Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero.",
      restoreAlert: "Restore alert",
    },
    values: {
      items1: [
        ["Basic", "tonal"],
        ["Filled", "flat"],
        ["Outlined", "outlined"],
      ],
      items2: [
        ["success", "check"],
        ["info", "info"],
        ["warning", "bell"],
        ["error", "close"],
      ],
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
