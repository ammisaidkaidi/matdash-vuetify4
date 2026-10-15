<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Accordion/Accordion.vue";
import type { AccordionContext } from "../../com/Accordion/types";
import { reactive } from "vue";
import {
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelTitle,
  VExpansionPanelText,
} from "vuetify/components";
import { mdiPlus, mdiMinus } from "@mdi/js";
import UiPage from "../../com/ui/UiPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const state = reactive({
  Basic: undefined,
  "Default Expand": 0,
  Inset: undefined,
  Popout: undefined,
  Advance: undefined,
  "Customized Icon": undefined,
});
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.";

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: AccordionContext = __viewReactive({
  get mdiMinus() {
    return __viewUnref(mdiMinus);
  },
  get mdiPlus() {
    return __viewUnref(mdiPlus);
  },
  get state() {
    return __viewUnref(state);
  },
  get text() {
    return __viewUnref(text);
  },
  contentConfig: {
    texts: {
      accordian: "Accordian",
      inset: "Inset",
      inset2: "inset",
      popout: "Popout",
      popout2: "popout",
      accordion: "accordion",
      advance: "Advance",
      generalSettings: "General settings",
      users: "Users",
      advanceSettings: "Advance Settings",
      personalData: "Personal data",
      accordion1: "Accordion 1",
      accordion2: "Accordion 2",
      accordion3: "Accordion 3",
      customizedIcon: "Customized Icon",
      iAmAnAccordion: "I am an accordion",
      youAreCurrentlyNotAnOwner: "You are currently not an owner",
      filteringHasBeenEntirelyDisabledForWholeWebServer:
        "Filtering has been entirely disabled for whole web server",
      text1: "",
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
