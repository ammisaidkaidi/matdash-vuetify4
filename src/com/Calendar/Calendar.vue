<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { CalendarContext } from "./types";

defineProps<{ context: CalendarContext }>();
</script>

<template>
  <component
    :is="
      context.props.embedded
        ? context.contentConfig.texts.div
        : context.WorkspacePage
    "
    :title="context.contentConfig.texts.calendar"
    ><v-card class="workspace-card"
      ><div class="d-flex align-center justify-space-between mb-6">
        <h2>{{ context.contentConfig.texts.fullCalendar }}</h2>
        <v-btn color="primary" @click="context.edit()">{{
          context.contentConfig.texts.addEvent
        }}</v-btn>
      </div>
      <div class="calendar-toolbar">
        <div class="d-flex ga-1">
          <v-btn
            icon
            variant="tonal"
            size="34"
            :aria-label="context.contentConfig.texts.previousPeriod"
            @click="context.move(-1)"
            ><Icon name="back" :size="17" /></v-btn
          ><v-btn
            icon
            variant="tonal"
            size="34"
            :aria-label="context.contentConfig.texts.nextPeriod"
            @click="context.move(1)"
            ><Icon name="right" :size="17" /></v-btn
          ><v-btn
            color="primary"
            class="ml-2"
            @click="context.focus = new Date()"
            >{{ context.contentConfig.texts.today }}</v-btn
          >
        </div>
        <h2>{{ context.heading }}</h2>
        <v-btn-toggle
          v-model="context.mode"
          mandatory
          color="primary"
          density="compact"
          divided
          ><v-btn
            v-for="m in context.contentConfig.values.items1"
            :key="m"
            :value="m"
            >{{ m }}</v-btn
          ></v-btn-toggle
        >
      </div>
      <div class="calendar-scroll">
        <div
          :class="[
            context.contentConfig.texts.calendarGrid,
            {
              'day-view': context.mode === context.contentConfig.texts.day,
            },
          ]"
        >
          <template v-if="context.mode !== context.contentConfig.texts.day"
            ><div
              v-for="day in context.weekdays"
              :key="day"
              class="calendar-weekday"
            >
              {{ day }}
            </div></template
          >
          <div
            v-for="day in context.days"
            :key="day.key"
            :class="[
              context.contentConfig.texts.calendarCell,
              {
                outside: day.outside,
                today: day.today,
              },
            ]"
            tabindex="0"
            role="button"
            :aria-label="context.contentConfig.texts.addEventOn + day.key"
            @click="context.edit(null, day.key)"
            @keydown.enter="context.edit(null, day.key)"
          >
            <span>{{ day.day }}</span
            ><button
              v-for="event in context.onDay(day.key)"
              :key="event.id"
              class="calendar-event"
              :style="{
                background: event.color,
              }"
              @click.stop="context.edit(event)"
            >
              {{
                context.mode === context.contentConfig.texts.month
                  ? context.contentConfig.texts.text1
                  : event.time + context.contentConfig.texts.text2
              }}{{ event.title }}
            </button>
          </div>
        </div>
      </div></v-card
    >
    <div v-if="!context.props.embedded" class="calendar-extras">
      <v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.calendarWithDate }}</h2>
        <v-date-picker
          v-model="context.datePick"
          color="primary"
          width="100%"
          @update:model-value="
            (value) => {
              if (value) context.focus = new Date(value);
            }
          " /></v-card
      ><v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.upcomingEvents }}</h2>
        <div
          v-for="event in [...context.demo.events].sort((a, b) =>
            a.date.localeCompare(b.date),
          )"
          :key="event.id"
          class="agenda-row"
        >
          <i
            :style="{
              background: event.color,
            }"
          />
          <div>
            <button class="text-button" @click="context.edit(event)">
              {{ event.title }}
            </button>
            <p class="muted text-caption">
              {{ event.date }}{{ context.contentConfig.texts.text3
              }}{{ event.time }}
            </p>
          </div>
          <v-btn
            icon
            size="28"
            variant="text"
            :aria-label="context.contentConfig.texts.deleteEvent + event.title"
            @click="context.remove(event)"
            ><Icon name="trash" :size="15"
          /></v-btn></div
      ></v-card>
    </div>
    <component
      :is="context.RecordDialog"
      v-model="context.editor"
      :title="
        context.record.id
          ? context.contentConfig.texts.editEvent
          : context.contentConfig.texts.addEvent
      "
      :record="context.record"
      :fields="context.fields"
      @save="context.save"
  /></component>
</template>
