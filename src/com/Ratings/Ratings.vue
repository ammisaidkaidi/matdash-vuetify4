<script setup lang="ts">
import UiPage from "../ui/UiPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { RatingsContext } from "./types";

defineProps<{ context: RatingsContext }>();
</script>

<template>
  <UiPage :title="context.contentConfig.texts.rating"
    ><div class="example-grid three">
      <ExampleCard :title="context.contentConfig.texts.basic"
        ><v-rating
          v-model="context.ratings.basic"
          color="warning"
          size="29"
          hover
        />
        <p class="field-help">
          {{ context.ratings.basic }}{{ context.contentConfig.texts.text1 }}
        </p></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.readOnly"
        ><v-rating
          :model-value="2"
          color="warning"
          size="29"
          readonly /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.clearable"
        ><v-rating
          v-model="context.ratings.clear"
          color="warning"
          size="29"
          clearable
        />
        <p class="field-help">
          {{ context.contentConfig.texts.clickTheCurrentRatingAgainToClear }}
        </p></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.hover"
        ><v-rating
          v-model="context.ratings.hover"
          color="warning"
          size="29"
          hover /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.halfRatting"
        ><v-rating
          v-model="context.ratings.half"
          color="warning"
          size="29"
          half-increments
          hover
        />
        <p class="field-help">
          {{ context.ratings.half }}{{ context.contentConfig.texts.text1 }}
        </p></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.length"
        ><v-rating
          v-model="context.ratings.length"
          :length="10"
          color="warning"
          size="20"
          density="compact" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.label"
        ><div class="b5-rating-labels">
          <span>{{ context.contentConfig.texts.sad }}</span
          ><span>{{ context.contentConfig.texts.happy }}</span>
        </div>
        <v-rating
          v-model="context.ratings.label"
          color="warning"
          size="29" /><v-rating
          v-model="context.ratings.second"
          color="warning"
          size="29"
          :item-labels="context.contentConfig.values.itemlabels1"
          item-label-position="bottom" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.icons"
        ><v-rating
          v-model="context.ratings.heart"
          half-increments
          color="error"
          :full-icon="context.mdiHeart"
          :empty-icon="context.mdiHeartOutline"
          :half-icon="context.mdiHeartHalfFull"
          size="28" /><v-rating
          v-model="context.ratings.circle"
          half-increments
          color="primary"
          :full-icon="context.mdiCircle"
          :empty-icon="context.mdiCircleOutline"
          :half-icon="context.mdiCircleHalfFull"
          size="28" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.size"
        ><v-rating
          v-for="(size, i) in context.contentConfig.values.items2"
          :key="size"
          v-model="context.ratings.sizes[i]"
          color="warning"
          :size="size"
      /></ExampleCard></div
  ></UiPage>
</template>
