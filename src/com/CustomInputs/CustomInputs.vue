<script setup lang="ts">
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { CustomInputsContext } from "./types";

defineProps<{ context: CustomInputsContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.customInputs"
    ><div class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.error"
        ><v-text-field
          v-model="context.model.error"
          :label="context.contentConfig.texts.input"
          variant="plain"
          :error-messages="context.contentConfig.values.errormessages1"
          hide-details="auto" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.multipleError"
        ><v-text-field
          v-model="context.model.errors"
          :label="context.contentConfig.texts.inputWithMultipleErrors"
          variant="plain"
          :error-messages="context.contentConfig.values.errormessages2"
          :max-errors="2"
          hide-details="auto" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.loading"
        ><v-text-field
          v-model="context.model.loading"
          :aria-label="context.contentConfig.texts.loadingInput"
          variant="underlined"
          loading="success"
          color="success"
          hide-details /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.appendAndPrepend"
        ><v-text-field
          v-model.number="context.model.amount"
          :aria-label="context.contentConfig.texts.amount"
          type="number"
          variant="underlined"
          hide-details
          ><template #prepend
            ><v-btn
              icon
              size="28"
              variant="text"
              color="secondary"
              :aria-label="context.contentConfig.texts.decreaseAmount"
              @click="context.model.amount--"
              >{{ context.contentConfig.texts.text1 }}</v-btn
            ></template
          ><template #append
            ><v-btn
              icon
              size="28"
              variant="text"
              color="primary"
              :aria-label="context.contentConfig.texts.increaseAmount"
              @click="context.model.amount++"
              >{{ context.contentConfig.texts.text2 }}</v-btn
            ></template
          ></v-text-field
        ></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.hideDetails"
        ><v-text-field
          v-model="context.model.main"
          :label="context.contentConfig.texts.mainInput"
          hide-details
          density="comfortable" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.rules"
        ><v-text-field
          v-model="context.model.email"
          :label="context.contentConfig.texts.enterEmail"
          type="email"
          :rules="[context.required, context.validEmail]"
          validate-on="blur"
          hide-details="auto"
          density="comfortable"
      /></ExampleCard></div
  ></FormPage>
</template>
