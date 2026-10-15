<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Email/Email.vue";
import type { EmailContext } from "../../com/Email/types";
import { ref, computed } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import { demo, nextId } from "../../composables/useDemoStore";
import {
  required,
  validEmail,
  notify,
  confirmDemo,
} from "../../composables/useFeedback";
import { avatar } from "../../data/app-seed";
const folder = ref("Inbox"),
  search = ref(""),
  selected = ref(demo.mails[0]?.id),
  composer = ref(false),
  form = ref(null),
  draft = ref({
    to: "",
    subject: "",
    body: "",
  });
const folders = ["Inbox", "Sent", "Draft", "Spam", "Trash"];
const labelColors = {
  Promotional: "primary",
  Social: "error",
  Health: "success",
};
const filtered = computed(() =>
  demo.mails.filter(
    (m) =>
      (folder.value === "Starred"
        ? m.starred
        : folder.value === "Important"
          ? m.important
          : ["Promotional", "Social", "Health"].includes(folder.value)
            ? m.label === folder.value
            : m.folder === folder.value) &&
      (m.subject + " " + m.from + " " + m.body)
        .toLowerCase()
        .includes((search.value || "").toLowerCase()),
  ),
);
const mail = computed(
  () =>
    filtered.value.find((m) => m.id === selected.value) || filtered.value[0],
);
function open(m) {
  selected.value = m.id;
  m.read = true;
}
function compose(reply = false, forward = false) {
  draft.value = {
    to: reply ? mail.value?.email || "" : "",
    subject:
      (reply ? "Re: " : forward ? "Fwd: " : "") +
      (reply || forward ? mail.value?.subject || "" : ""),
    body: forward ? "\n\nForwarded message:\n" + mail.value?.body : "",
  };
  composer.value = true;
}
function savedMail(target) {
  demo.mails.unshift({
    ...draft.value,
    id: nextId(demo.mails),
    from: "David McMichael",
    email: "david@example.com",
    folder: target,
    label: "Social",
    read: true,
    starred: false,
    important: false,
    date: new Date().toISOString().slice(0, 10),
  });
  composer.value = false;
  folder.value = target;
  selected.value = demo.mails[0].id;
  notify(
    target === "Sent"
      ? "Message saved to the local Sent folder. No email was sent."
      : "Draft saved locally.",
  );
}
async function send() {
  if ((await form.value.validate()).valid) savedMail("Sent");
}
async function remove() {
  const m = mail.value;
  if (!m) return;
  if (m.folder === "Trash") {
    if (await confirmDemo("Permanently delete this sample email?"))
      demo.mails = demo.mails.filter((x) => x.id !== m.id);
  } else {
    m.folder = "Trash";
    notify("Moved to local Trash.");
  }
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: EmailContext = __viewReactive({
  get avatar() {
    return __viewUnref(avatar);
  },
  get compose() {
    return __viewUnref(compose);
  },
  get composer() {
    return __viewUnref(composer);
  },
  set composer(value: any) {
    if (__viewIsRef(composer)) (composer as any).value = value;
  },
  get demo() {
    return __viewUnref(demo);
  },
  get draft() {
    return __viewUnref(draft);
  },
  set draft(value: any) {
    if (__viewIsRef(draft)) (draft as any).value = value;
  },
  get filtered() {
    return __viewUnref(filtered);
  },
  set filtered(value: any) {
    if (__viewIsRef(filtered)) (filtered as any).value = value;
  },
  get folder() {
    return __viewUnref(folder);
  },
  set folder(value: any) {
    if (__viewIsRef(folder)) (folder as any).value = value;
  },
  get folders() {
    return __viewUnref(folders);
  },
  get form() {
    return __viewUnref(form);
  },
  set form(value: any) {
    if (__viewIsRef(form)) (form as any).value = value;
  },
  get labelColors() {
    return __viewUnref(labelColors);
  },
  get mail() {
    return __viewUnref(mail);
  },
  set mail(value: any) {
    if (__viewIsRef(mail)) (mail as any).value = value;
  },
  get open() {
    return __viewUnref(open);
  },
  get remove() {
    return __viewUnref(remove);
  },
  get required() {
    return __viewUnref(required);
  },
  get savedMail() {
    return __viewUnref(savedMail);
  },
  get search() {
    return __viewUnref(search);
  },
  set search(value: any) {
    if (__viewIsRef(search)) (search as any).value = value;
  },
  get send() {
    return __viewUnref(send);
  },
  get validEmail() {
    return __viewUnref(validEmail);
  },
  contentConfig: {
    texts: {
      emailApp: "Email App",
      compose: "Compose",
      text1: "",
      sORTBY: "SORT BY",
      lABELS: "LABELS",
      labelDotBg: "label-dot bg-",
      searchEmails: "Search Emails",
      emailPreview: "email-preview",
      noMessagesInThisView: " No messages in this view. ",
      warning: "warning",
      toggleStarred: "Toggle starred",
      primary: "primary",
      toggleImportant: "Toggle important",
      deleteEmail: "Delete email",
      reply: "Reply",
      forward: "Forward",
      noEmailSelected: "No email selected",
      newMessage: "New Message",
      closeComposer: "Close composer",
      to: "To",
      subject: "Subject",
      message: "Message",
      localDemonstrationOnlyMessagesAreNotDelivered:
        " Local demonstration only. Messages are not delivered. ",
      draft: "Draft",
      saveDraft: "Save Draft",
      sendDemoMessage: "Send Demo Message",
    },
    values: {
      items1: ["Starred", "Important"],
      items2: ["Promotional", "Social", "Health"],
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
