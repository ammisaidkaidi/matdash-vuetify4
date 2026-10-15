<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Banners/Banners.vue";
import type { BannersContext } from "../../com/Banners/types";
import { ref } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import { asset, avatar } from "../../data/app-seed";
import { pageDemos } from "../../composables/usePageDemos";
import { notify } from "../../composables/useFeedback";
const acknowledged = ref(false),
  retried = ref(false);
function download() {
  const url = URL.createObjectURL(
    new Blob(
      [
        "Date,Description,Amount\n2026-10-14,Sample income,6235\n2026-10-14,Sample expense,-345\n",
      ],
      {
        type: "text/csv",
      },
    ),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "demo-transactions.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: BannersContext = __viewReactive({
  get acknowledged() {
    return __viewUnref(acknowledged);
  },
  set acknowledged(value: any) {
    if (__viewIsRef(acknowledged)) (acknowledged as any).value = value;
  },
  get asset() {
    return __viewUnref(asset);
  },
  get avatar() {
    return __viewUnref(avatar);
  },
  get download() {
    return __viewUnref(download);
  },
  get notify() {
    return __viewUnref(notify);
  },
  get pageDemos() {
    return __viewUnref(pageDemos);
  },
  get retried() {
    return __viewUnref(retried);
  },
  set retried(value: any) {
    if (__viewIsRef(retried)) (retried as any).value = value;
  },
  contentConfig: {
    texts: {
      bannerWidgets: "Banner Widgets",
      welcomeBg2: "welcome-bg2-",
      text1: "",
      welcomeBackDavid: "Welcome back David!",
      youHaveEarned54MoreThanLastMonthWhichIsGreatThing:
        " You have earned 54% more than last month which is great thing. ",
      dashboardsDashboard2: "/dashboards/dashboard2",
      check: "Check",
      trackBg: "track-bg-",
      transactionIllustration: "Transaction illustration",
      trackYourEveryTransactionEasily: "Track your every Transaction Easily",
      trackAndRecordYourEveryIncomeAndExpenseEasilyToControlY:
        " Track and record your every income and expense easily to control your balance ",
      download: "Download",
      maintenance: "maintenance-",
      maintenanceIllustration: "Maintenance illustration",
      demoCheckComplete: "Demo check complete",
      oopsSomethingWentWrong: "Oops something went wrong!",
      thisDemonstrationHasResetNoServerRequestWasMade:
        "This demonstration has reset. No server request was made.",
      tryingAgainToBypassTheseTemporaryErrors:
        "Trying again to bypass these temporary errors.",
      resetExample: "Reset example",
      retry: "Retry",
      emptyShoppingCart: "empty-shopping-cart-",
      emptyShoppingCart2: "Empty shopping cart",
      oopYourCartIsEmpty: "Oop, Your cart is empty!",
      getBackToShoppingAndGetRewardsFromIt:
        "Get back to shopping and get rewards from it.",
      ecommerceProducts: "/ecommerce/products",
      goForShopping: "Go For Shopping",
      lEVELUP: "LEVEL UP",
      gold: "gold-",
      goldAchievementMedal: "Gold achievement medal",
      readyForYourNextTask: "Ready for your next task",
      youReachAllNotifications: "You reach all Notifications",
      congratulations: "Congratulations,",
      tapToContinueNextTask: "Tap to continue next task.",
      achievementAcknowledgedLocally: "Achievement acknowledged locally.",
      gotIt: "Got it!",
      yesGotIt: "Yes, Got It!",
      mutualFriendRevealed: "Mutual Friend Revealed",
      tommoieHenderson: "Tommoie Henderson",
      pending: "pending",
      acceptTheRequestAndTypeAMessage: "Accept the request and type a message",
      accepted: "accepted",
      requestAcceptedLocally: "Request accepted locally.",
      requestRemovedLocally: "Request removed locally.",
      accept: "Accept",
      removed: "removed",
      remove: "Remove",
      resetRequest: "Reset request",
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
