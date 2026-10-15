<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import Icon from "../ui/Icon.vue";
import type { ChipsContext } from "./types";

defineProps<{ context: ChipsContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.chip"
    ><div class="example-grid">
      <ExampleCard
        v-for="variant in context.contentConfig.values.items1"
        :key="variant"
        :title="
          variant === context.contentConfig.texts.tonal
            ? context.contentConfig.texts.filled
            : context.contentConfig.texts.outlined
        "
        wide
        ><div class="b5-chip-row">
          <template v-for="(color, i) in context.rows" :key="i"
            ><v-chip :color="color" :variant="variant"
              ><template #prepend
                ><v-avatar
                  v-if="i === 1 || i === 3"
                  start
                  :image="context.avatar(i + 1)"
                  size="20" /><Icon
                  v-else
                  name="user"
                  :size="15"
                  class="mr-1" /></template
              >{{
                color === context.contentConfig.texts.primary
                  ? context.contentConfig.texts.primary2
                  : color === context.contentConfig.texts.secondary
                    ? context.contentConfig.texts.secondary2
                    : context.contentConfig.texts.default
              }}{{ context.contentConfig.texts.filled2 }}</v-chip
            ><v-chip
              v-if="!context.hidden.includes(variant + i)"
              :color="color"
              :variant="variant"
              closable
              :close-label="
                context.contentConfig.texts.delete +
                variant +
                context.contentConfig.texts.chip2 +
                (i + 1)
              "
              @click:close="context.remove(variant + i)"
              >{{
                color === context.contentConfig.texts.primary
                  ? context.contentConfig.texts.primary2
                  : color === context.contentConfig.texts.secondary
                    ? context.contentConfig.texts.secondary2
                    : context.contentConfig.texts.default
              }}{{ context.contentConfig.texts.deletable }}</v-chip
            ></template
          >
        </div></ExampleCard
      ><ExampleCard
        v-for="outlined in context.contentConfig.values.items2"
        :key="String(outlined)"
        :title="
          outlined
            ? context.contentConfig.texts.customOutlinedIcon
            : context.contentConfig.texts.customIcon
        "
        ><div class="b5-chip-row">
          <v-chip
            v-for="color in context.contentConfig.values.items3"
            :key="color"
            :color="color"
            :variant="
              outlined
                ? context.contentConfig.texts.outlined2
                : context.contentConfig.texts.tonal
            "
            :append-icon="context.mdiCheck"
            ><template #prepend
              ><Icon name="shield" :size="16" class="mr-1" /></template
            >{{ context.contentConfig.texts.customIcon }}</v-chip
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.disabled"
        ><div class="b5-chip-row">
          <v-chip
            v-for="color in context.contentConfig.values.items4"
            :key="color"
            :color="color"
            disabled
            closable
            :append-icon="context.mdiCheck"
            >{{ context.contentConfig.texts.customIcon }}</v-chip
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.sizes"
        ><div class="b5-chip-row">
          <v-chip
            v-for="size in context.contentConfig.values.items5"
            :key="size"
            :size="size"
            color="primary"
            >{{
              size === context.contentConfig.texts.default2
                ? context.contentConfig.texts.default
                : size
            }}</v-chip
          >
        </div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.closable" wide
        ><div class="b5-chip-row">
          <v-chip
            v-for="color in context.colors.filter(
              (c) => !context.hidden.includes(c),
            )"
            :key="color"
            :color="color"
            closable
            :close-label="
              context.contentConfig.texts.delete +
              color +
              context.contentConfig.texts.chip3
            "
            @click:close="context.remove(color)"
            >{{ color[0].toUpperCase() + color.slice(1)
            }}{{ context.contentConfig.texts.deletable }}</v-chip
          >
        </div></ExampleCard
      >
    </div>
    <div class="example-footer">
      <span>{{
        context.contentConfig.texts.closeChipsIndividuallyThenRestoreTheExamples
      }}</span
      ><v-btn color="primary" variant="text" @click="context.hidden = []">{{
        context.contentConfig.texts.resetChips
      }}</v-btn>
    </div></UiPage
  >
</template>
