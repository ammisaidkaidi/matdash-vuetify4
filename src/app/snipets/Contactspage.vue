<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Contacts/Contacts.vue";
import type { ContactsContext } from "../../com/Contacts/types";
import { ref } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import RecordDialog from "../../com/ui/RecordDialog.vue";
import { demo, nextId } from "../../composables/useDemoStore";
import { confirmDemo, notify } from "../../composables/useFeedback";
import { avatar } from "../../data/app-seed";
const props = defineProps({
  title: {
    type: String,
    default: "Contact App",
  },
  heading: String,
});
const search = ref(""),
  editor = ref(false),
  record = ref({});
const headers = [
  {
    title: "Id",
    key: "id",
  },
  {
    title: "UserInfo",
    key: "name",
  },
  {
    title: "Phone",
    key: "phone",
  },
  {
    title: "Joining Date",
    key: "joined",
  },
  {
    title: "Role",
    key: "role",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];
const fields = [
  {
    key: "name",
    label: "Full name",
    required: true,
  },
  {
    key: "email",
    label: "Email address",
    type: "email",
    required: true,
  },
  {
    key: "phone",
    label: "Phone",
    required: true,
  },
  {
    key: "joined",
    label: "Joining date",
    type: "date",
    required: true,
  },
  {
    key: "role",
    label: "Role",
    items: ["Designer", "Developer", "Accountant", "HR", "Manager", "Chairman"],
    required: true,
  },
];
function edit(item) {
  record.value = item
    ? {
        ...item,
      }
    : {
        name: "",
        email: "",
        phone: "",
        joined: new Date().toISOString().slice(0, 10),
        role: "Designer",
      };
  editor.value = true;
}
function save(item) {
  if (item.id) {
    demo.contacts.splice(
      demo.contacts.findIndex((c) => c.id === item.id),
      1,
      item,
    );
  } else
    demo.contacts.push({
      ...item,
      id: nextId(demo.contacts),
      image: avatar(1),
    });
  editor.value = false;
  notify("Contact saved locally.");
}
async function remove(item) {
  if (await confirmDemo("Delete " + item.name + "?"))
    demo.contacts = demo.contacts.filter((c) => c.id !== item.id);
}
const colors = {
  Designer: "primary",
  Developer: "secondary",
  Accountant: "error",
  HR: "warning",
  Manager: "primary",
  Chairman: "secondary",
};

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ContactsContext = __viewReactive({
  get RecordDialog() {
    return __viewUnref(RecordDialog);
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
  get headers() {
    return __viewUnref(headers);
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
  get search() {
    return __viewUnref(search);
  },
  set search(value: any) {
    if (__viewIsRef(search)) (search as any).value = value;
  },
  contentConfig: {
    texts: {
      searchContacts: "Search Contacts",
      addContact: "Add Contact",
      text1: "#",
      edit: "Edit ",
      delete: "Delete ",
      editContact: "Edit Contact",
    },
    values: {},
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
