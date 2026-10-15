<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Chats/Chats.vue";
import type { ChatsContext } from "../../com/Chats/types";
import { ref, computed, nextTick } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import { demo, nextId } from "../../composables/useDemoStore";
import { notify } from "../../composables/useFeedback";
import { avatar, asset } from "../../data/app-seed";
const search = ref(""),
  selected = ref(demo.chatPeople[0]?.id),
  text = ref(""),
  messages = ref(null),
  info = ref(true),
  attachment = ref(null);
const filtered = computed(() =>
  demo.chatPeople.filter((p) =>
    p.name.toLowerCase().includes((search.value || "").toLowerCase()),
  ),
);
const person = computed(() =>
  demo.chatPeople.find((p) => p.id === selected.value),
);
async function send(image = "") {
  if (!text.value.trim() && !image) return;
  person.value.messages.push({
    id: nextId(person.value.messages),
    text: text.value.trim(),
    image,
    own: true,
    time: new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
  text.value = "";
  await nextTick();
  messages.value?.scrollTo({
    top: messages.value.scrollHeight,
    behavior: "smooth",
  });
}
function upload(e) {
  const f = e.target.files?.[0];
  if (!f) return;
  if (!["image/jpeg", "image/png"].includes(f.type) || f.size > 800 * 1024)
    return notify("Choose a JPG or PNG up to 800 KB.", "error");
  const r = new FileReader();
  r.onload = () => send(r.result);
  r.readAsDataURL(f);
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ChatsContext = __viewReactive({
  get asset() {
    return __viewUnref(asset);
  },
  get attachment() {
    return __viewUnref(attachment);
  },
  set attachment(value: any) {
    if (__viewIsRef(attachment)) (attachment as any).value = value;
  },
  get avatar() {
    return __viewUnref(avatar);
  },
  get filtered() {
    return __viewUnref(filtered);
  },
  set filtered(value: any) {
    if (__viewIsRef(filtered)) (filtered as any).value = value;
  },
  get info() {
    return __viewUnref(info);
  },
  set info(value: any) {
    if (__viewIsRef(info)) (info as any).value = value;
  },
  get messages() {
    return __viewUnref(messages);
  },
  set messages(value: any) {
    if (__viewIsRef(messages)) (messages as any).value = value;
  },
  get person() {
    return __viewUnref(person);
  },
  set person(value: any) {
    if (__viewIsRef(person)) (person as any).value = value;
  },
  get search() {
    return __viewUnref(search);
  },
  set search(value: any) {
    if (__viewIsRef(search)) (search as any).value = value;
  },
  get selected() {
    return __viewUnref(selected);
  },
  set selected(value: any) {
    if (__viewIsRef(selected)) (selected as any).value = value;
  },
  get send() {
    return __viewUnref(send);
  },
  get text() {
    return __viewUnref(text);
  },
  set text(value: any) {
    if (__viewIsRef(text)) (text as any).value = value;
  },
  get upload() {
    return __viewUnref(upload);
  },
  contentConfig: {
    texts: {
      chatApp: "Chat App",
      chatLayout: "chat-layout",
      davidMcMichael: "David McMichael",
      designer: "Designer",
      searchContact: "Search Contact",
      recentChats: "Recent Chats",
      chatContact: "chat-contact",
      startAConversation: "Start a conversation",
      online: "online",
      offline: "offline",
      sampleStatus: " · sample status",
      toggleConversationDetails: "Toggle conversation details",
      chatMessage: "chat-message",
      you: "You",
      text1: " · ",
      sharedLocalAttachment: "Shared local attachment",
      typeAMessage: "Type a Message",
      attachImage: "Attach image",
      sendMessage: "Send message",
      media: "Media",
      blogImg1: "blog-img1-",
      sampleConversationMedia: "Sample conversation media",
      conversationDetails: "Conversation details",
      messagesAndUploadedImagesStayInThisBrowserTheyAreNotDel:
        " Messages and uploaded images stay in this browser. They are not delivered to another person. ",
      localConversation: "Local conversation",
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
