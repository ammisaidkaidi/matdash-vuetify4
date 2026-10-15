<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import Icon from "../ui/Icon.vue";
import type { TooltipsContext } from "./types";

defineProps<{ context: TooltipsContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.tooltip" bare
    ><div class="example-grid">
      <ExampleCard
        :title="context.contentConfig.texts.simple"
        class="standalone-example"
        ><div class="button-samples justify-center">
          <v-tooltip
            v-for="location in context.contentConfig.values.items1"
            :key="location"
            :text="
              location[0].toUpperCase() +
              location.slice(1) +
              context.contentConfig.texts.tooltip2
            "
            :location="location"
            ><template #activator="{ props }"
              ><v-btn v-bind="props" color="primary">{{
                location[0].toUpperCase() + location.slice(1)
              }}</v-btn></template
            ></v-tooltip
          >
        </div></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.icon"
        class="standalone-example"
        ><div class="button-samples justify-center">
          <v-tooltip
            v-for="[icon, color, label] in context.contentConfig.values.items2"
            :key="label"
            :text="label"
            location="top"
            ><template #activator="{ props }"
              ><v-btn
                v-bind="props"
                :aria-label="label"
                :color="color"
                icon
                size="38"
                ><Icon :name="icon" :size="21" /></v-btn></template
          ></v-tooltip></div></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.toggleTolltip"
        class="standalone-example"
        wide
        ><div class="button-samples">
          <v-btn
            color="primary"
            :aria-pressed="context.visible"
            @click="context.visible = !context.visible"
            >{{
              context.visible
                ? context.contentConfig.texts.hideTooltip
                : context.contentConfig.texts.showTooltip
            }}</v-btn
          ><v-tooltip
            v-model="context.visible"
            :text="context.contentConfig.texts.yourShoppingCart"
            location="top"
            :open-on-hover="false"
            :open-on-focus="false"
            :open-on-click="false"
            ><template #activator="{ props }"
              ><v-btn
                v-bind="props"
                color="primary"
                icon
                size="42"
                :aria-label="context.contentConfig.texts.demoCartTooltipTarget"
                ><Icon name="cart" :size="21" /></v-btn></template
          ></v-tooltip></div
      ></ExampleCard></div
  ></UiPage>
</template>
