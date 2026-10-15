<script setup lang="ts">
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { FormLayoutsContext } from "./types";

defineProps<{ context: FormLayoutsContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.formLayouts" bare
    ><div class="example-stack">
      <ExampleCard
        :title="context.contentConfig.texts.ordinaryForm"
        class="standalone-example"
        ><component
          :is="context.DemoForm"
          :fields="context.ordinary"
          remember
          form-name="Ordinary form" /></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.inputVariants"
        class="standalone-example"
        ><div class="control-stack">
          <v-text-field
            v-model="context.success"
            :label="context.contentConfig.texts.successInput"
            color="success"
            base-color="success"
            hide-details
          /><v-text-field
            v-model="context.error"
            :label="context.contentConfig.texts.errorInput"
            error
            hide-details
          /><v-text-field
            v-model="context.errorText"
            :label="context.contentConfig.texts.inputWithErrorText"
            error-messages="Incorrect entry."
            hide-details="auto"
          /></div></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.defaultForm"
        class="standalone-example"
        ><component
          :is="context.DemoForm"
          :fields="context.defaultFields"
          remember
          form-name="Default form" /></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.basicHeaderForm"
        class="standalone-example"
        ><component
          :is="context.DemoForm"
          :fields="context.header"
          :columns="2"
          cancel
          form-name="Basic header form" /></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.disabledForm"
        class="standalone-example"
        ><component
          :is="context.DemoForm"
          :fields="[
            {
              key: context.contentConfig.texts.name,
              label: context.contentConfig.texts.name2,
            },
            ...context.ordinary,
          ]"
          disabled
          form-name="Disabled form"
      /></ExampleCard>
      <div class="example-grid">
        <ExampleCard
          :title="context.contentConfig.texts.formWithLeftIcon"
          class="standalone-example"
          ><component
            :is="context.DemoForm"
            :fields="context.iconFields"
            icons
            remember
            cancel
            form-name="Left icon form" /></ExampleCard
        ><ExampleCard
          :title="context.contentConfig.texts.formWithRightIcon"
          class="standalone-example"
          ><component
            :is="context.DemoForm"
            :fields="context.iconFields"
            icons
            right-icons
            remember
            cancel
            form-name="Right icon form"
        /></ExampleCard>
      </div></div
  ></FormPage>
</template>
