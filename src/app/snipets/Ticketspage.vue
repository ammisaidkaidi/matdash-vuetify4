<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Tickets/Tickets.vue";
import type { TicketsContext } from "../../com/Tickets/types";
import { ref, computed } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import RecordDialog from "../../com/ui/RecordDialog.vue";
import { demo, nextId } from "../../composables/useDemoStore";
import { notify, confirmDemo } from "../../composables/useFeedback";
import { avatar } from "../../data/app-seed";
const search = ref(""),
  status = ref("All"),
  editor = ref(false),
  record = ref({});
const colors = {
  All: "primary",
  Pending: "warning",
  Open: "success",
  Closed: "error",
};
const filtered = computed(() =>
  demo.tickets.filter(
    (t) => status.value === "All" || t.status === status.value,
  ),
);
const headers = [
  {
    title: "Id",
    key: "id",
  },
  {
    title: "Ticket",
    key: "title",
  },
  {
    title: "Assigned To",
    key: "assigned",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Date",
    key: "date",
  },
  {
    title: "Action",
    key: "actions",
    sortable: false,
  },
];
const fields = [
  {
    key: "title",
    label: "Ticket title",
    required: true,
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  {
    key: "assigned",
    label: "Assigned to",
    items: ["Liam", "Steve", "Jack"],
    required: true,
  },
  {
    key: "status",
    label: "Status",
    items: ["Open", "Pending", "Closed"],
    required: true,
  },
  {
    key: "priority",
    label: "Priority",
    items: ["Low", "Medium", "High"],
    required: true,
  },
];
function edit(t) {
  record.value = t
    ? {
        ...t,
      }
    : {
        title: "",
        description: "",
        assigned: "Liam",
        status: "Open",
        priority: "Medium",
        date: new Date().toISOString().slice(0, 10),
      };
  editor.value = true;
}
function save(t) {
  if (t.id)
    demo.tickets.splice(
      demo.tickets.findIndex((x) => x.id === t.id),
      1,
      t,
    );
  else
    demo.tickets.push({
      ...t,
      id: nextId(demo.tickets),
    });
  editor.value = false;
  notify("Ticket saved locally.");
}
async function remove(t) {
  if (await confirmDemo("Delete ticket #" + t.id + "?"))
    demo.tickets = demo.tickets.filter((x) => x.id !== t.id);
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: TicketsContext = __viewReactive({
  get RecordDialog() {
    return __viewUnref(RecordDialog);
  },
  get avatar() {
    return __viewUnref(avatar);
  },
  get colors() {
    return __viewUnref(colors);
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
  get filtered() {
    return __viewUnref(filtered);
  },
  set filtered(value: any) {
    if (__viewIsRef(filtered)) (filtered as any).value = value;
  },
  get headers() {
    return __viewUnref(headers);
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
  get search() {
    return __viewUnref(search);
  },
  set search(value: any) {
    if (__viewIsRef(search)) (search as any).value = value;
  },
  get status() {
    return __viewUnref(status);
  },
  set status(value: any) {
    if (__viewIsRef(status)) (status as any).value = value;
  },
  contentConfig: {
    texts: {
      ticketsApp: "Tickets App",
      ticketMetric: "ticket-metric",
      metric: "metric-",
      all: "All",
      total: "Total",
      tickets: " Tickets",
      createTicket: "Create Ticket",
      searchTickets: "Search Tickets",
      deleteTicket: "Delete ticket ",
      editTicket: "Edit Ticket",
    },
    values: {
      items1: ["All", "Pending", "Open", "Closed"],
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
