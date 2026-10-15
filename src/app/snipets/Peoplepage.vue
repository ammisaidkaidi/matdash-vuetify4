<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/People/People.vue";
import type { PeopleContext } from "../../com/People/types";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import ProfileHeader from "../../com/ui/ProfileHeader.vue";
import { followers, friends, social } from "../../data/batch03";
import { pageDemos, toggleFollow } from "../../composables/usePageDemos";
import { notify } from "../../composables/useFeedback";
const path = useRoute().path;
const isFollowers = path.endsWith("followers"),
  isSocial = path.includes("social-media");
const title = isSocial
  ? "Social Media Contacts"
  : isFollowers
    ? "Followers"
    : "Friends";
const query = ref(""),
  selected = ref(null);
const people = computed(() =>
  (isSocial ? social : isFollowers ? followers : friends).filter((p) =>
    `${p.name} ${p.place || p.job}`
      .toLowerCase()
      .includes(query.value.toLowerCase()),
  ),
);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: PeopleContext = __viewReactive({
  get ProfileHeader() {
    return __viewUnref(ProfileHeader);
  },
  get isFollowers() {
    return __viewUnref(isFollowers);
  },
  set isFollowers(value: any) {
    if (__viewIsRef(isFollowers)) (isFollowers as any).value = value;
  },
  get isSocial() {
    return __viewUnref(isSocial);
  },
  set isSocial(value: any) {
    if (__viewIsRef(isSocial)) (isSocial as any).value = value;
  },
  get notify() {
    return __viewUnref(notify);
  },
  get pageDemos() {
    return __viewUnref(pageDemos);
  },
  get people() {
    return __viewUnref(people);
  },
  set people(value: any) {
    if (__viewIsRef(people)) (people as any).value = value;
  },
  get query() {
    return __viewUnref(query);
  },
  set query(value: any) {
    if (__viewIsRef(query)) (query as any).value = value;
  },
  get selected() {
    return __viewUnref(selected);
  },
  set selected(value: any) {
    if (__viewIsRef(selected)) (selected as any).value = value;
  },
  get title() {
    return __viewUnref(title);
  },
  set title(value: any) {
    if (__viewIsRef(title)) (title as any).value = value;
  },
  get toggleFollow() {
    return __viewUnref(toggleFollow);
  },
  contentConfig: {
    texts: {
      search: "Search ",
      b3PeopleGrid: "b3-people-grid",
      b3Person: "b3-person",
      view: "View ",
      flat: "flat",
      outlined: "outlined",
      unfollow: "Unfollow ",
      follow: "Follow ",
      followed: "Followed",
      follow2: "Follow",
      connect: "Connect",
      error: "error",
      primary: "primary",
      text1: " ",
      noMatchingPeople: "No matching people.",
      sampleCommunityProfileConnectionsAndMessagesInThisRecre:
        " Sample community profile. Connections and messages in this recreation are local demonstrations. ",
      close: "Close",
      demoConnectionRequestNotedLocallyNoNotificationWasSent:
        "Demo connection request noted locally. No notification was sent.",
      appsChats: "/apps/chats",
      openDemoChats: "Open demo chats",
    },
    values: {
      items1: [
        ["user", "Profile"],
        ["chats", "Message"],
        ["heart", "Connect"],
        ["email", "Email"],
      ],
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
