<script setup lang="ts">
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { DirectionalFormsContext } from "./types";

defineProps<{ context: DirectionalFormsContext }>();
</script>

<template>
  <FormPage
    :title="
      context.horizontal
        ? context.contentConfig.texts.horizontalForm
        : context.contentConfig.texts.verticalForm
    "
    bare
    ><div class="example-grid directional-grid">
      <ExampleCard
        :title="context.contentConfig.texts.basicLayout"
        class="standalone-example"
        ><component
          :is="context.DemoForm"
          :fields="context.basicFields"
          :horizontal="context.horizontal"
          submit-label="Send"
          form-name="Basic layout form" /></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.basicWithIcons"
        class="standalone-example"
        ><component
          :is="context.DemoForm"
          :fields="context.basicFields"
          :horizontal="context.horizontal"
          icons
          submit-label="Send"
          form-name="Basic layout with icons" /></ExampleCard
      ><template v-if="context.horizontal"
        ><ExampleCard
          :title="context.contentConfig.texts.formSeparator"
          class="standalone-example"
          ><component
            :is="context.DemoForm"
            :fields="context.accountFields"
            horizontal
            cancel
            form-name="Separated horizontal form" /></ExampleCard
        ><ExampleCard
          :title="context.contentConfig.texts.formLabelAlignment"
          class="standalone-example"
          ><component
            :is="context.DemoForm"
            :fields="context.accountFields"
            horizontal
            align-right
            cancel
            form-name="Right-aligned labels" /></ExampleCard></template
      ><ExampleCard
        v-else
        :title="context.contentConfig.texts.multiColumnWithFormSeparator"
        class="standalone-example"
        wide
        ><component
          :is="context.DemoForm"
          :fields="context.multi"
          :columns="2"
          cancel
          form-name="Multi-column form"
      /></ExampleCard>
      <div class="wide example-stack">
        <component :is="context.FormExtras" :horizontal="context.horizontal" />
      </div></div
  ></FormPage>
</template>
