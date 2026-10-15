<script setup lang="ts">
import {
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelTitle,
  VExpansionPanelText,
} from "vuetify/components";
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { AccordionContext } from "./types";

defineProps<{ context: AccordionContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.accordian"
    ><div class="example-stack">
      <ExampleCard
        v-for="title in Object.keys(context.state)"
        :key="title"
        :title="title"
        ><v-expansion-panels
          v-model="context.state[title]"
          :variant="
            title === context.contentConfig.texts.inset
              ? context.contentConfig.texts.inset2
              : title === context.contentConfig.texts.popout
                ? context.contentConfig.texts.popout2
                : context.contentConfig.texts.accordion
          "
          ><v-expansion-panel
            v-for="(label, i) in title === context.contentConfig.texts.advance
              ? [
                  context.contentConfig.texts.generalSettings,
                  context.contentConfig.texts.users,
                  context.contentConfig.texts.advanceSettings,
                  context.contentConfig.texts.personalData,
                ]
              : [
                  context.contentConfig.texts.accordion1,
                  context.contentConfig.texts.accordion2,
                  context.contentConfig.texts.accordion3,
                ]"
            :key="label"
            ><v-expansion-panel-title
              :expand-icon="
                title === context.contentConfig.texts.customizedIcon
                  ? context.mdiPlus
                  : undefined
              "
              :collapse-icon="
                title === context.contentConfig.texts.customizedIcon
                  ? context.mdiMinus
                  : undefined
              "
              ><div class="b5-accordion-title">
                <span>{{ label }}</span
                ><small
                  v-if="title === context.contentConfig.texts.advance"
                  class="muted"
                  >{{
                    [
                      context.contentConfig.texts.iAmAnAccordion,
                      context.contentConfig.texts.youAreCurrentlyNotAnOwner,
                      context.contentConfig.texts
                        .filteringHasBeenEntirelyDisabledForWholeWebServer,
                      context.contentConfig.texts.text1,
                    ][i]
                  }}</small
                >
              </div></v-expansion-panel-title
            ><v-expansion-panel-text
              ><p class="b5-prose">
                {{ context.text }}
              </p></v-expansion-panel-text
            ></v-expansion-panel
          ></v-expansion-panels
        ></ExampleCard
      >
    </div></UiPage
  >
</template>
