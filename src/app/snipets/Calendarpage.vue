<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Calendar/Calendar.vue";
import type { CalendarContext } from "../../com/Calendar/types";
import { ref, computed } from "vue";
const props = defineProps({
  embedded: Boolean,
});
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import RecordDialog from "../../com/ui/RecordDialog.vue";
import { demo, nextId } from "../../composables/useDemoStore";
import { notify, confirmDemo } from "../../composables/useFeedback";
const today = new Date();
const focus = ref(
  new Date(today.getFullYear(), today.getMonth(), today.getDate()),
);
const mode = ref("Month"),
  editor = ref(false),
  record = ref({}),
  datePick = ref(new Date());
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const heading = computed(() =>
  focus.value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    ...(mode.value === "Day"
      ? {
          day: "numeric",
        }
      : {}),
  }),
);
const days = computed(() => {
  const date = new Date(focus.value);
  let count = 42;
  if (mode.value === "Month") {
    date.setDate(1);
    date.setDate(date.getDate() - date.getDay());
  } else if (mode.value === "Week") {
    date.setDate(date.getDate() - date.getDay());
    count = 7;
  } else count = 1;
  return Array.from(
    {
      length: count,
    },
    (_, i) => {
      const d = new Date(date);
      d.setDate(date.getDate() + i);
      return {
        date: d,
        key: iso(d),
        day: d.getDate(),
        outside: d.getMonth() !== focus.value.getMonth(),
        today: iso(d) === iso(today),
      };
    },
  );
});
const fields = [
  {
    key: "title",
    label: "Event title",
    required: true,
  },
  {
    key: "date",
    label: "Start date",
    type: "date",
    required: true,
  },
  {
    key: "end",
    label: "End date (optional)",
    type: "date",
  },
  {
    key: "time",
    label: "Time",
    type: "time",
    required: true,
  },
  {
    key: "color",
    label: "Event color",
    type: "color",
  },
];
function edit(event, date) {
  record.value = event
    ? {
        ...event,
      }
    : {
        title: "",
        date: date || iso(focus.value),
        end: "",
        time: "09:00",
        color: "#635bff",
      };
  editor.value = true;
}
function save(event) {
  if (event.end && event.end < event.date)
    return notify("End date must not be before the start date.", "error");
  if (event.id)
    demo.events.splice(
      demo.events.findIndex((e) => e.id === event.id),
      1,
      event,
    );
  else
    demo.events.push({
      ...event,
      id: nextId(demo.events),
    });
  editor.value = false;
  notify("Calendar event saved locally.");
}
function move(n) {
  const d = new Date(focus.value);
  if (mode.value === "Month") {
    d.setDate(1);
    d.setMonth(d.getMonth() + n);
  } else d.setDate(d.getDate() + n * (mode.value === "Week" ? 7 : 1));
  focus.value = d;
}
async function remove(event) {
  if (await confirmDemo("Delete " + event.title + "?"))
    demo.events = demo.events.filter((e) => e.id !== event.id);
}
const onDay = (key) =>
  demo.events.filter((e) => e.date <= key && (e.end || e.date) >= key);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: CalendarContext = __viewReactive({
  get RecordDialog() {
    return __viewUnref(RecordDialog);
  },
  get WorkspacePage() {
    return __viewUnref(WorkspacePage);
  },
  get datePick() {
    return __viewUnref(datePick);
  },
  set datePick(value: any) {
    if (__viewIsRef(datePick)) (datePick as any).value = value;
  },
  get days() {
    return __viewUnref(days);
  },
  set days(value: any) {
    if (__viewIsRef(days)) (days as any).value = value;
  },
  get demo() {
    return __viewUnref(demo);
  },
  get edit() {
    return __viewUnref(edit);
  },
  get editor() {
    return __viewUnref(editor);
  },
  set editor(value: any) {
    if (__viewIsRef(editor)) (editor as any).value = value;
  },
  get fields() {
    return __viewUnref(fields);
  },
  get focus() {
    return __viewUnref(focus);
  },
  set focus(value: any) {
    if (__viewIsRef(focus)) (focus as any).value = value;
  },
  get heading() {
    return __viewUnref(heading);
  },
  set heading(value: any) {
    if (__viewIsRef(heading)) (heading as any).value = value;
  },
  get mode() {
    return __viewUnref(mode);
  },
  set mode(value: any) {
    if (__viewIsRef(mode)) (mode as any).value = value;
  },
  get move() {
    return __viewUnref(move);
  },
  get onDay() {
    return __viewUnref(onDay);
  },
  get props() {
    return __viewUnref(props);
  },
  get record() {
    return __viewUnref(record);
  },
  set record(value: any) {
    if (__viewIsRef(record)) (record as any).value = value;
  },
  get remove() {
    return __viewUnref(remove);
  },
  get save() {
    return __viewUnref(save);
  },
  get weekdays() {
    return __viewUnref(weekdays);
  },
  contentConfig: {
    texts: {
      div: "div",
      calendar: "Calendar",
      fullCalendar: "Full Calendar",
      addEvent: "Add Event",
      previousPeriod: "Previous period",
      nextPeriod: "Next period",
      today: "Today",
      calendarGrid: "calendar-grid",
      day: "Day",
      calendarCell: "calendar-cell",
      addEventOn: "Add event on ",
      month: "Month",
      text1: "",
      text2: " ",
      calendarWithDate: "Calendar with Date",
      upcomingEvents: "Upcoming Events",
      text3: " · ",
      deleteEvent: "Delete event ",
      editEvent: "Edit Event",
    },
    values: {
      items1: ["Month", "Week", "Day"],
    },
  },
});
</script>

<template>
  <PresentationalView :context="__viewContext">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </PresentationalView>
</template>
