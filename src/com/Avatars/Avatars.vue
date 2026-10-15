<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import Icon from "../ui/Icon.vue";
import type { AvatarsContext } from "./types";

defineProps<{ context: AvatarsContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.avatar"
    ><div class="example-grid three">
      <ExampleCard :title="context.contentConfig.texts.imageAvatars"
        ><div class="b5-avatar-row">
          <v-avatar
            v-for="n in context.contentConfig.values.items1"
            :key="n"
            size="44"
            ><img
              :src="context.avatar(n)"
              :alt="context.contentConfig.texts.samplePerson + n"
          /></v-avatar></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.letterAvatars"
        ><div class="b5-avatar-row">
          <v-avatar
            v-for="(color, i) in context.colors"
            :key="color"
            :color="color"
            size="40"
            >{{ context.contentConfig.texts.aBCDE[i] }}</v-avatar
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.iconAvatars"
        ><div class="b5-avatar-row">
          <v-avatar
            v-for="color in context.colors"
            :key="color"
            :color="color"
            size="40"
            ><Icon name="user" :size="22"
          /></v-avatar></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.variant"
        ><div class="b5-avatar-row">
          <v-avatar
            v-for="rounded in context.contentConfig.values.items2"
            :key="String(rounded)"
            :rounded="rounded"
            color="primary"
            size="44"
            ><Icon name="user" :size="23"
          /></v-avatar></div></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.sizes"
        class="b5-span-two"
        ><div class="b5-avatar-row">
          <v-avatar
            v-for="size in context.contentConfig.values.items3"
            :key="size"
            :size="size"
            ><img
              :src="context.avatar(4)"
              :alt="size + context.contentConfig.texts.pixelAvatar"
          /></v-avatar></div
      ></ExampleCard></div
  ></UiPage>
</template>
