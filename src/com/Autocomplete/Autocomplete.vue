<script setup lang="ts">
import { VAutocomplete } from "vuetify/components";
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import Icon from "../ui/Icon.vue";
import type { AutocompleteContext } from "./types";

defineProps<{ context: AutocompleteContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.autocomplete"
    ><div class="example-grid three">
      <ExampleCard :title="context.contentConfig.texts.comboBox"
        ><v-autocomplete
          v-model="context.film"
          :items="context.films"
          :aria-label="context.contentConfig.texts.favoriteFilm"
          variant="outlined"
          density="comfortable"
          hide-details
          clearable
          color="primary"
          :no-data-text="
            context.contentConfig.texts.noMatchingFilms
          " /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.withCaption"
        ><div class="control-stack">
          <v-autocomplete
            v-model="context.caption"
            :items="context.addresses"
            :label="context.contentConfig.texts.emailAddress"
            variant="outlined"
            density="comfortable"
            hide-details
          /><v-autocomplete
            v-model="context.iconEmail"
            :items="context.addresses"
            :label="context.contentConfig.texts.emailAddressWithIcon"
            variant="outlined"
            density="comfortable"
            hide-details
            ><template #prepend-inner><Icon name="email" :size="18" /></template
          ></v-autocomplete></div></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.comboWithMultipleOptions"
        ><v-autocomplete
          v-model="context.multi"
          :items="context.films"
          multiple
          chips
          closable-chips
          :label="context.contentConfig.texts.outlined"
          variant="outlined"
          hide-details
          color="primary"
      /></ExampleCard></div
  ></FormPage>
</template>
