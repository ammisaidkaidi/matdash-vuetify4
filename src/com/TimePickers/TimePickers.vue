<script setup lang="ts">
import { VTimePicker } from "vuetify/components";
import FormPage from "../ui/FormPage.vue";
import ExampleCard from "../ui/ExampleCard.vue";
import type { TimePickersContext } from "./types";

defineProps<{ context: TimePickersContext }>();
</script>

<template>
  <FormPage :title="context.contentConfig.texts.timePicker"
    ><div class="example-grid">
      <ExampleCard :title="context.contentConfig.texts.default"
        ><v-time-picker
          v-model="context.times.basic"
          color="primary"
          :title="context.contentConfig.texts.sELECTTIME"
          class="demo-time-picker"
        />
        <p class="picker-value">
          {{ context.times.basic || context.contentConfig.texts.chooseATime }}
        </p></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.format"
        ><v-time-picker
          v-model="context.times.format"
          format="24hr"
          color="primary"
          :title="context.contentConfig.texts.sELECTTIME"
          class="demo-time-picker"
        />
        <p class="picker-value">
          {{ context.contentConfig.texts.text1
          }}{{
            context.times.format || context.contentConfig.texts.notSelected
          }}
        </p></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.scrollable"
        ><v-time-picker
          v-model="context.times.scroll"
          scrollable
          color="primary"
          :title="context.contentConfig.texts.sELECTTIME"
          class="demo-time-picker" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.useSeconds"
        ><v-time-picker
          v-model="context.times.seconds"
          use-seconds
          color="primary"
          :title="context.contentConfig.texts.sELECTTIME"
          class="demo-time-picker" /></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.colors" wide
        ><div class="picker-pair">
          <v-time-picker
            v-model="context.times.primary"
            color="primary"
            :title="context.contentConfig.texts.pRIMARY"
            class="demo-time-picker"
          /><v-time-picker
            v-model="context.times.secondary"
            color="secondary"
            :title="context.contentConfig.texts.sECONDARY"
            class="demo-time-picker"
          /></div></ExampleCard
      ><ExampleCard :title="context.contentConfig.texts.range" wide
        ><div class="picker-pair">
          <div>
            <v-time-picker
              v-model="context.times.start"
              :max="context.times.end"
              format="24hr"
              color="primary"
              :title="context.contentConfig.texts.sTARTTIME"
              class="demo-time-picker"
            /><v-text-field
              v-model="context.times.start"
              type="time"
              :label="context.contentConfig.texts.startTime"
              :max="context.times.end"
              class="mt-3"
              hide-details
            />
          </div>
          <div>
            <v-time-picker
              v-model="context.times.end"
              :min="context.times.start"
              format="24hr"
              color="secondary"
              :title="context.contentConfig.texts.eNDTIME"
              class="demo-time-picker"
            /><v-text-field
              v-model="context.times.end"
              type="time"
              :label="context.contentConfig.texts.endTime"
              :min="context.times.start"
              class="mt-3"
              hide-details
            />
          </div>
        </div>
        <p class="picker-value">
          {{ context.times.start }}{{ context.contentConfig.texts.text2
          }}{{ context.times.end }}
        </p>
        <v-alert
          v-if="context.times.start &amp;&amp; context.times.end &amp;&amp; context.times.end &lt; context.times.start"
          type="error"
          variant="tonal"
          density="compact"
          class="mt-3"
          >{{
            context.contentConfig.texts.endTimeMustBeAfterStartTime
          }}</v-alert
        ></ExampleCard
      >
    </div></FormPage
  >
</template>
