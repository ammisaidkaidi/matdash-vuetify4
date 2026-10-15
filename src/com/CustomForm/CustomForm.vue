<script setup lang="ts">
import { VSlider, VRangeSlider } from "vuetify/components";
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import Icon from "../ui/Icon.vue";
import type { CustomFormContext } from "./types";

defineProps<{ context: CustomFormContext }>();
</script>

<template>
  <FormPage
    :title="context.contentConfig.texts.formLayouts"
    heading="Custom Form"
    ><div class="custom-field-grid">
      <div class="control-stack">
        <div class="demo-field">
          <label for="custom-name">{{ context.contentConfig.texts.name }}</label
          ><v-text-field
            id="custom-name"
            v-model="context.model.name"
            :placeholder="context.contentConfig.texts.enterText"
            density="comfortable"
          />
        </div>
        <div class="demo-field">
          <label for="custom-company">{{
            context.contentConfig.texts.companyName
          }}</label
          ><v-text-field
            id="custom-company"
            v-model="context.model.company"
            :placeholder="context.contentConfig.texts.enterText"
            density="comfortable"
          />
        </div>
        <div class="demo-field">
          <label for="custom-industry">{{
            context.contentConfig.texts.industryType
          }}</label
          ><v-text-field
            id="custom-industry"
            v-model="context.model.industry"
            :placeholder="context.contentConfig.texts.enterText"
            density="comfortable"
          />
        </div>
      </div>
      <div class="control-stack">
        <div class="demo-field">
          <label for="custom-select">{{
            context.contentConfig.texts.selectDropdown
          }}</label
          ><v-select
            id="custom-select"
            v-model="context.model.select"
            :items="context.contentConfig.values.items1"
            density="comfortable"
          />
        </div>
        <div class="demo-field">
          <label for="custom-time">{{ context.contentConfig.texts.time }}</label
          ><v-text-field
            id="custom-time"
            v-model="context.model.time"
            type="time"
            density="comfortable"
          />
        </div>
        <div class="demo-field">
          <label for="custom-date">{{ context.contentConfig.texts.date }}</label
          ><v-text-field
            id="custom-date"
            v-model="context.model.date"
            type="date"
            density="comfortable"
          />
        </div>
      </div>
      <div class="control-stack">
        <ExampleCard :title="context.contentConfig.texts.loremIpsumDolorSitAmet"
          ><v-radio-group v-model="context.model.gender" hide-details
            ><v-radio
              :label="context.contentConfig.texts.male"
              :value="context.contentConfig.texts.male"
              color="primary" /><v-radio
              :label="context.contentConfig.texts.female"
              :value="context.contentConfig.texts.female"
              color="primary" /><v-radio
              :label="context.contentConfig.texts.disabled"
              disabled /></v-radio-group
        ></ExampleCard>
        <div>
          <h4>{{ context.contentConfig.texts.industryType }}</h4>
          <v-checkbox
            v-for="(_, i) in context.model.check"
            :key="i"
            v-model="context.model.check[i]"
            :label="context.contentConfig.texts.enterText2"
            :aria-label="context.contentConfig.texts.industryCheckbox + (i + 1)"
            color="primary"
            hide-details
          /><v-checkbox
            :label="context.contentConfig.texts.disabled"
            disabled
            hide-details
          />
        </div>
      </div>
    </div>
    <div class="custom-field-grid mt-8">
      <div>
        <h4 class="mb-6">{{ context.contentConfig.texts.slider }}</h4>
        <v-range-slider
          v-model="context.model.range"
          :min="0"
          :max="1500"
          :step="10"
          color="primary"
          :aria-label="context.contentConfig.texts.customPriceRange"
          hide-details
        />
        <div class="range-fields">
          <v-text-field
            v-model.number="context.model.range[0]"
            type="number"
            :min="0"
            :max="context.model.range[1]"
            :aria-label="context.contentConfig.texts.minimumPrice"
            density="compact"
          /><v-text-field
            v-model.number="context.model.range[1]"
            type="number"
            :min="context.model.range[0]"
            :max="1500"
            :aria-label="context.contentConfig.texts.maximumPrice"
            density="compact"
          />
        </div>
      </div>
      <div>
        <h4 class="mb-6">{{ context.contentConfig.texts.volume }}</h4>
        <v-slider
          v-model="context.model.volume"
          :aria-label="context.contentConfig.texts.volume"
          color="secondary"
          hide-details
          ><template #prepend><Icon name="sliders" :size="18" /></template
        ></v-slider>
      </div>
      <div>
        <h4>{{ context.contentConfig.texts.switch }}</h4>
        <v-switch
          v-for="(_, i) in context.model.switches"
          :key="i"
          v-model="context.model.switches[i]"
          :label="context.contentConfig.texts.enterText2"
          :aria-label="context.contentConfig.texts.customSwitch + (i + 1)"
          color="primary"
          hide-details
        />
        <div class="controls-row">
          <v-switch
            :label="context.contentConfig.texts.disabled"
            disabled
            hide-details
          /><v-switch
            :label="context.contentConfig.texts.disabled"
            disabled
            :model-value="true"
            color="primary"
            hide-details
          />
        </div>
      </div>
    </div>
    <div class="button-samples mt-8">
      <v-btn
        v-for="color in context.contentConfig.values.items2"
        :key="color"
        :color="color"
        @click="context.open = true"
        ><Icon name="plus" :size="17" class="mr-1" />{{
          context.contentConfig.texts.addNew
        }}</v-btn
      >
    </div>
    <v-list
      v-if="context.entries.length"
      :aria-label="context.contentConfig.texts.addedEntries"
      class="mt-4"
      ><v-list-item
        v-for="(entry, i) in context.entries"
        :key="i"
        :title="entry"
        ><template #append
          ><v-btn
            icon
            variant="text"
            size="small"
            :aria-label="context.contentConfig.texts.remove + entry"
            @click="context.entries.splice(i, 1)"
            ><Icon
              name="trash"
              :size="18" /></v-btn></template></v-list-item></v-list></FormPage
  ><v-dialog v-model="context.open" max-width="440"
    ><v-card class="pa-6"
      ><h2 class="mb-5">{{ context.contentConfig.texts.addNewEntry }}</h2>
      <v-form
        :ref="(element) => (context.form = element)"
        @submit.prevent="context.add"
        ><v-text-field
          v-model="context.newName"
          :label="context.contentConfig.texts.entryName"
          :rules="[context.required]"
          hide-details="auto"
          autofocus
        />
        <div class="demo-form-actions">
          <v-btn color="primary" type="submit">{{
            context.contentConfig.texts.addEntry
          }}</v-btn
          ><v-btn variant="text" @click="context.open = false">{{
            context.contentConfig.texts.cancel
          }}</v-btn>
        </div></v-form
      ></v-card
    ></v-dialog
  >
</template>
