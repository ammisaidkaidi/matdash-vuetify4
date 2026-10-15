<script setup lang="ts">
import { VCombobox } from "vuetify/components";
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { ComboboxContext } from "./types";

defineProps<{ context: ComboboxContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.combobox"
    ><div class="example-stack">
      <ExampleCard :title="context.contentConfig.texts.density"
        ><div class="control-stack">
          <v-combobox
            v-for="(density, i) in context.contentConfig.values.items1"
            :key="density"
            v-model="context.model.density[i]"
            :items="context.contentConfig.values.items2"
            :label="density[0].toUpperCase() + density.slice(1)"
            :density="density"
            variant="filled"
            hide-details
            color="primary"
          /></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.multiple"
        ><div class="control-stack">
          <v-combobox
            v-model="context.model.multiple"
            :items="context.activities"
            :label="
              context.contentConfig.texts.selectAFavoriteActivityOrCreateANewOne
            "
            multiple
            variant="filled"
            hide-details
            color="primary"
            :return-object="false"
          /><v-combobox
            v-model="context.model.chips"
            :items="context.activities"
            :label="context.contentConfig.texts.iUseChips"
            multiple
            chips
            closable-chips
            variant="filled"
            hide-details
            color="primary"
            :return-object="false"
          /><v-combobox
            v-model="context.model.custom"
            :items="context.activities"
            :label="context.contentConfig.texts.iUseAScopedSlot"
            multiple
            chips
            closable-chips
            variant="filled"
            hide-details
            color="primary"
            :return-object="false"
            ><template #chip="{ props, item }"
              ><v-chip v-bind="props" size="small"
                ><v-avatar color="primary" start size="20">{{
                  String(item.title).charAt(0)
                }}</v-avatar
                >{{ item.title }}</v-chip
              ></template
            ></v-combobox
          ><v-combobox
            v-model="context.model.readonly"
            :items="context.activities"
            :label="context.contentConfig.texts.iMReadonly"
            multiple
            chips
            readonly
            variant="filled"
            hide-details
          /></div
      ></ExampleCard>
    </div>
    <div class="example-footer">
      <span>{{
        context.contentConfig.texts.typeANewActivityAndPressEnterToAddIt
      }}</span
      ><v-btn
        variant="text"
        color="primary"
        @click="Object.assign(context.model, context.initial())"
        >{{ context.contentConfig.texts.resetExamples }}</v-btn
      >
    </div></FormPage
  >
</template>
