<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { MenusContext } from "./types";

defineProps<{ context: MenusContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.menus"
    ><div class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.anchor"
        ><v-select
          v-model="context.location"
          :label="context.contentConfig.texts.location"
          :items="context.contentConfig.values.items1"
          class="mb-5" />
        <div class="b5-demo-center">
          <v-menu :location="context.location"
            ><template #activator="{ props }"
              ><v-btn v-bind="props" color="primary">{{
                context.contentConfig.texts.dropdown
              }}</v-btn></template
            ><v-list density="compact"
              ><v-list-item
                v-for="n in 4"
                :key="n"
                :title="context.contentConfig.texts.item + n"
                @click="
                  context.choose(context.contentConfig.texts.item + n)
                " /></v-list
          ></v-menu></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.hover"
        ><div class="b5-demo-center b5-tall-example">
          <v-menu open-on-hover :open-on-click="true"
            ><template #activator="{ props }"
              ><v-btn v-bind="props" color="secondary">{{
                context.contentConfig.texts.dropdown
              }}</v-btn></template
            ><v-list density="compact"
              ><v-list-item
                v-for="n in 4"
                :key="n"
                :title="context.contentConfig.texts.hoverItem + n"
                @click="
                  context.choose(context.contentConfig.texts.hoverItem + n)
                " /></v-list
          ></v-menu></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.activatorAndTooltip"
        ><div class="b5-demo-center">
          <v-menu
            ><template #activator="{ props: menuProps }"
              ><v-tooltip
                :text="context.contentConfig.texts.openTheExampleMenu"
                location="top"
                ><template #activator="{ props: tipProps }"
                  ><v-btn
                    v-bind="context.mergeProps(menuProps, tipProps)"
                    color="primary"
                    >{{ context.contentConfig.texts.dropdownWTooltip }}</v-btn
                  ></template
                ></v-tooltip
              ></template
            ><v-list
              ><v-list-item
                v-for="label in context.contentConfig.values.items2"
                :key="label"
                :title="label"
                @click="context.choose(label)" /></v-list
          ></v-menu></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.popover"
        ><div class="b5-demo-center">
          <v-menu
            v-model="context.popover"
            :close-on-content-click="false"
            location="bottom"
            ><template #activator="{ props }"
              ><v-btn v-bind="props" color="secondary">{{
                context.contentConfig.texts.menuAsPopover
              }}</v-btn></template
            ><v-card class="pa-6 b5-popover"
              ><h3>{{ context.contentConfig.texts.aLittleMoreInformation }}</h3>
              <p class="my-4 muted">
                {{
                  context.contentConfig.texts
                    .menusCanHoldMoreThanAListThisPopoverKeepsAShortPieceOfI
                }}
              </p>
              <v-btn color="primary" @click="context.popover = false">{{
                context.contentConfig.texts.gotIt
              }}</v-btn></v-card
            ></v-menu
          >
        </div></ExampleCard
      >
    </div></UiPage
  >
</template>
