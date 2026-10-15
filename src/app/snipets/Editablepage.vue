<script setup lang="ts">
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import Editable from "../../com/Editable/Editable.vue";
import type { CrudField, CrudLabels, CrudMode } from "../../com/Editable/types";
import { demo, nextId } from "../../composables/useDemoStore";
import { validEmail } from "../../composables/useFeedback";
import { avatar } from "../../data/app-seed";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  joined: string;
  role: string;
  image?: string;
}
const roles = [
  "Designer",
  "Developer",
  "Accountant",
  "HR",
  "Manager",
  "Chairman",
];
const fields: CrudField<Contact>[] = [
  { key: "id", label: "Id", showInForm: false },
  {
    key: "name",
    label: "Full name",
    header: "UserInfo",
    required: true,
    wide: true,
  },
  {
    key: "email",
    label: "Email address",
    required: true,
    rules: [validEmail],
    showInTable: false,
    props: { type: "email" },
  },
  { key: "phone", label: "Phone", required: true },
  {
    key: "joined",
    label: "Joining date",
    header: "Joining Date",
    type: "date",
    required: true,
    default: () => new Date().toISOString().slice(0, 10),
  },
  {
    key: "role",
    label: "Role",
    type: "select",
    items: roles,
    required: true,
    default: "Designer",
  },
];
const labels: Partial<CrudLabels> = {
  heading: "Editable Table",
  add: "Add Contact",
  newTitle: "Add Contact",
  editTitle: "Edit Contact",
  search: "Search Contacts",
  saved: "Contact saved locally.",
  deleted: "Contact deleted locally.",
  deleteMessage: "This removes only the contact stored in this browser.",
  empty: "No contacts found. Add a contact or clear your search.",
};
const roleColors: Record<string, string> = {
  Designer: "primary",
  Developer: "secondary",
  Accountant: "error",
  HR: "warning",
  Manager: "primary",
  Chairman: "secondary",
};
function prepareContact(record: Contact, mode: CrudMode): Contact {
  return mode === "create"
    ? { ...record, image: record.image || avatar(1) }
    : record;
}
</script>

<template>
  <WorkspacePage title="Editable Table" class="b4-page" data-batch="4">
    <Editable
      v-model="demo.contacts"
      title="Editable Table"
      entity="contact"
      :fields="fields"
      :labels="labels"
      :create-id="nextId"
      :before-save="prepareContact"
    >
      <template #cell.id="{ item }">#{{ item.id }}</template>
      <template #cell.name="{ item }">
        <div class="person-cell">
          <v-avatar size="42"
            ><img :src="item.image" :alt="item.name"
          /></v-avatar>
          <div>
            <strong>{{ item.name }}</strong
            ><span>{{ item.email }}</span>
          </div>
        </div>
      </template>
      <template #cell.role="{ item }">
        <v-chip
          :color="roleColors[item.role] || 'primary'"
          size="small"
          rounded="sm"
          >{{ item.role }}</v-chip
        >
      </template>
    </Editable>
  </WorkspacePage>
</template>
