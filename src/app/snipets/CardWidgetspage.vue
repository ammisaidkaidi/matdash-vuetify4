<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/CardWidgets/CardWidgets.vue";
import type { CardWidgetsContext } from "../../com/CardWidgets/types";
import { ref } from "vue";
import { VSlider } from "vuetify/components";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import Activities from "../../com/ui/Activities.vue";
import { articles, avatar, asset } from "../../data/app-seed";
import { demo, addToCart, money } from "../../composables/useDemoStore";
import { pageDemos, toggleFollow } from "../../composables/usePageDemos";
import { notify, confirmDemo } from "../../composables/useFeedback";
const sound = ref(pageDemos.sound),
  chat = ref(pageDemos.chat),
  detail = ref(null);
const people = ["Andrew Grant", "Leo Pratt", "Charles Nunez", "Lora Powers"];
const gateways = [
  ["Paypal", "Big Brands", "+$6,235", "primary"],
  ["Wallet", "Bill payment", "−$345", "secondary"],
  ["Credit Card", "Money reversed", "+$2,235", "warning"],
  ["Refund", "Bill Payment", "−$32", "error"],
];
async function gift(name) {
  if (
    await confirmDemo(
      "Preview gift for " + name,
      "This $50 gift is a sample interaction. No payment or gift is sent.",
    )
  )
    notify("Demo gift preview confirmed. No charge was made.");
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: CardWidgetsContext = __viewReactive({
  get Activities() {
    return __viewUnref(Activities);
  },
  get addToCart() {
    return __viewUnref(addToCart);
  },
  get articles() {
    return __viewUnref(articles);
  },
  get asset() {
    return __viewUnref(asset);
  },
  get avatar() {
    return __viewUnref(avatar);
  },
  get chat() {
    return __viewUnref(chat);
  },
  set chat(value: any) {
    if (__viewIsRef(chat)) (chat as any).value = value;
  },
  get demo() {
    return __viewUnref(demo);
  },
  get detail() {
    return __viewUnref(detail);
  },
  set detail(value: any) {
    if (__viewIsRef(detail)) (detail as any).value = value;
  },
  get gateways() {
    return __viewUnref(gateways);
  },
  get gift() {
    return __viewUnref(gift);
  },
  get money() {
    return __viewUnref(money);
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
  get sound() {
    return __viewUnref(sound);
  },
  set sound(value: any) {
    if (__viewIsRef(sound)) (sound as any).value = value;
  },
  get toggleFollow() {
    return __viewUnref(toggleFollow);
  },
  contentConfig: {
    texts: {
      cardsWidgets: "Cards Widgets",
      appsBlog: "/apps/blog/",
      text1: "3 comments",
      text2: "2 min read",
      ecommerceProductDetail: "/ecommerce/product/detail/",
      add: "Add ",
      toCart: " to cart",
      addedToYourLocalCart: "Added to your local cart.",
      illustrativeMusicCardFor: "Illustrative music card for ",
      noAudioFileIsBundled: ". No audio file is bundled.",
      trackDetails: "Track details",
      blogImg: "blog-img",
      text3: "-",
      artwork: " artwork",
      elSalvador: "El Salvador",
      bulgaria: "Bulgaria",
      nepal: "Nepal",
      followed: "Followed",
      follow: "Follow",
      text4: "3 mutual friends",
      friendAdded: "Friend added",
      addFriend: "Add Friend",
      localRequestRemoved: "Local request removed.",
      remove: "Remove",
      technologyDirector: "Technology Director",
      telecomAnalyst: "Telecom Analyst",
      environmentalSpecialist: "Environmental Specialist",
      pagesSocialMediaContacts: "/pages/social-media-contacts",
      viewContacts: "View contacts",
      settings: "Settings",
      sound: "Sound",
      soundVolume: "Sound volume",
      text5: "%",
      chat: "Chat",
      turnOnChatDuringCallDemoPreference:
        " Turn on chat during call · Demo preference ",
      cancel: "Cancel",
      widgetSettingsSavedLocally: "Widget settings saved locally.",
      save: "Save",
      s: "s",
      sampleGiftFor: "Sample gift for ",
      giftToFriend5000: "Gift To Friend ($50.00)",
      paymentGateways: "Payment Gateways",
      platformForIncome: "Platform For Income",
      sampleTransactions: "Sample transactions",
      text6: ": ",
      text7: " · ",
      viewAllTransactions: "View All Transactions",
      upcomingActivity: "Upcoming Activity",
      inNewYear: "In New year",
      appsCalendar: "/apps/calendar",
      pending: "pending",
      done: "done",
      workingOn: "working on",
      mins: " mins ",
      close: "Close",
    },
    values: {
      items1: [
        ["Uptown Funk", "Jon Bon Jovi"],
        ["Blank Space", "Madonna"],
        ["Lean On", "Jennifer Lopez"],
      ],
      items2: [
        "Trip to singapore",
        "Archived Data",
        "Meeting with client",
        "Screening Task Team",
        "Send envelope to John",
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
