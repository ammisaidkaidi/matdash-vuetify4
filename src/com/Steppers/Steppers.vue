<script setup lang="ts">
import {
  VStepper,
  VStepperHeader,
  VStepperItem,
  VStepperWindow,
  VStepperWindowItem,
} from "vuetify/components";
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { SteppersContext } from "./types";

defineProps<{ context: SteppersContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.stepper"
    ><div class="example-stack">
      <ExampleCard :title="context.contentConfig.texts.nonEditableSteps"
        ><v-stepper
          v-model="context.values.locked"
          hide-actions
          flat
          class="demo-stepper"
          ><v-stepper-header
            ><template v-for="(title, i) in context.steps" :key="title"
              ><v-stepper-item
                :title="title"
                :value="i + 1"
                :complete="context.values.locked > i + 1"
                color="primary" /><v-divider
                v-if="i &lt; 2" /></template></v-stepper-header></v-stepper></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.editableSteps"
        ><v-stepper
          v-model="context.values.editable"
          hide-actions
          flat
          non-linear
          class="demo-stepper"
          ><v-stepper-header
            ><template v-for="(title, i) in context.steps" :key="title"
              ><v-stepper-item
                :title="title"
                :value="i + 1"
                :complete="context.values.editable > i + 1"
                editable
                color="primary" /><v-divider
                v-if="i &lt; 2" /></template></v-stepper-header></v-stepper></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.alternateLabel"
        ><v-stepper
          v-model="context.values.alternate"
          alt-labels
          hide-actions
          flat
          non-linear
          class="demo-stepper"
          ><v-stepper-header
            ><template
              v-for="(title, i) in context.contentConfig.values.items1"
              :key="title"
              ><v-stepper-item
                :title="title"
                :value="i + 1"
                editable
                color="primary" /><v-divider
                v-if="i &lt; 2" /></template></v-stepper-header></v-stepper></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.linearSteppers"
        ><div class="control-stack">
          <v-stepper
            v-for="(_, index) in context.values.linear"
            :key="index"
            v-model="context.values.linear[index]"
            hide-actions
            flat
            class="demo-stepper"
            ><v-stepper-header
              ><template v-for="(title, i) in context.steps" :key="title"
                ><v-stepper-item
                  :title="title"
                  :value="i + 1"
                  :complete="context.values.linear[index] > i + 1"
                  color="primary" /><v-divider
                  v-if="i &lt; 2" /></template></v-stepper-header
          ></v-stepper></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.optionalSteps"
        ><v-stepper
          v-model="context.values.optional"
          hide-actions
          flat
          non-linear
          class="demo-stepper"
          ><v-stepper-header
            ><template v-for="(title, i) in context.steps" :key="title"
              ><v-stepper-item
                :title="title"
                :subtitle="
                  i === 1 ? context.contentConfig.texts.optional : undefined
                "
                :value="i + 1"
                editable
                color="primary" /><v-divider
                v-if="i &lt; 2" /></template></v-stepper-header></v-stepper></ExampleCard
      ><ExampleCard
        :title="context.contentConfig.texts.alternativeLabelWithErrors"
        ><v-stepper
          v-model="context.values.error"
          alt-labels
          hide-actions
          flat
          non-linear
          class="demo-stepper"
          ><v-stepper-header
            ><template
              v-for="(title, i) in context.contentConfig.values.items2"
              :key="title"
              ><v-stepper-item
                :title="title"
                :value="i + 1"
                :error="i === 2"
                :subtitle="
                  i === 2 ? context.contentConfig.texts.alertMessage : undefined
                "
                editable
                color="primary" /><v-divider
                v-if="i &lt; 3" /></template></v-stepper-header></v-stepper></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.itemsSteps"
        ><v-stepper
          v-model="context.active"
          hide-actions
          flat
          class="demo-stepper interactive-stepper"
          ><v-stepper-header
            ><template v-for="n in 3" :key="n"
              ><v-stepper-item
                :title="context.contentConfig.texts.step + n"
                :value="n"
                :complete="context.active > n || context.completed"
                color="primary" /><v-divider
                v-if="n &lt; 3" /></template></v-stepper-header
          ><v-stepper-window
            ><v-stepper-window-item v-for="n in 3" :key="n" :value="n"
              ><h2>{{ context.titles[n - 1] }}</h2>
              <p class="muted mt-4">
                {{
                  [
                    context.contentConfig.texts
                      .startWithTheDetailsThatDefineYourProjectAStepperKeepsEa,
                    context.contentConfig.texts
                      .reviewTheOptionsAndOrganizeYourWorkIntoClearManageableS,
                    context.contentConfig.texts
                      .everythingIsReadyFinishThisDemonstrationOrGoBackToRevie,
                  ][n - 1]
                }}
              </p></v-stepper-window-item
            ></v-stepper-window
          ></v-stepper
        ><v-alert
          v-if="context.completed"
          type="success"
          variant="tonal"
          density="compact"
          class="mt-4"
          >{{
            context.contentConfig.texts.demoCompletedNoDataWasSubmitted
          }}</v-alert
        >
        <div class="stepper-buttons">
          <v-btn
            :disabled="context.active === 1"
            variant="text"
            @click="
              context.active--;
              context.completed = false;
            "
            >{{ context.contentConfig.texts.previous }}</v-btn
          ><v-btn
            v-if="context.completed"
            color="primary"
            @click="
              context.active = 1;
              context.completed = false;
            "
            >{{ context.contentConfig.texts.startAgain }}</v-btn
          ><v-btn v-else color="primary" @click="context.next">{{
            context.active === 3
              ? context.contentConfig.texts.finish
              : context.contentConfig.texts.next
          }}</v-btn>
        </div></ExampleCard
      >
    </div></FormPage
  >
</template>
