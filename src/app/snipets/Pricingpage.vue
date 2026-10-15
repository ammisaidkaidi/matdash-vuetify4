<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Pricing/Pricing.vue";
import type { PricingContext } from "../../com/Pricing/types";
import { ref } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import { asset } from "../../data/app-seed";
import { pageDemos } from "../../composables/usePageDemos";
import { confirmDemo, notify } from "../../composables/useFeedback";
const yearly = ref(pageDemos.billing === "Yearly");
const plans = [
  {
    name: "Silver",
    price: 0,
    members: 3,
    storage: 50,
    features: 2,
  },
  {
    name: "Bronze",
    price: 10.99,
    members: 5,
    storage: 80,
    features: 3,
  },
  {
    name: "Gold",
    price: 22.99,
    members: 15,
    storage: 150,
    features: 5,
  },
];
async function choose(p) {
  if (
    await confirmDemo(
      "Choose " + p.name + "?",
      "This saves a demo plan preference in this browser. No subscription is created and no payment is collected.",
    )
  ) {
    pageDemos.plan = p.name;
    pageDemos.billing = yearly.value ? "Yearly" : "Monthly";
    notify(p.name + " demo plan selected. No charge was made.", "success");
  }
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: PricingContext = __viewReactive({
  get asset() {
    return __viewUnref(asset);
  },
  get choose() {
    return __viewUnref(choose);
  },
  get pageDemos() {
    return __viewUnref(pageDemos);
  },
  get plans() {
    return __viewUnref(plans);
  },
  get yearly() {
    return __viewUnref(yearly);
  },
  set yearly(value: any) {
    if (__viewIsRef(yearly)) (yearly as any).value = value;
  },
  contentConfig: {
    texts: {
      pricing: "Pricing",
      flexiblePlansTailoredToFitYour: " Flexible Plans Tailored to Fit Your",
      communitySUniqueNeeds: "Community's Unique Needs! ",
      monthly: "Monthly",
      yearlyBilling: "Yearly billing",
      yearly: "Yearly",
      annualSamplePricingIncludesTwoMonthsFree:
        " Annual sample pricing includes two months free. ",
      bronze: "Bronze",
      pOPULAR: "POPULAR",
      text1: "-",
      medal: " medal",
      text2: "$",
      free: "Free",
      text3: "/",
      yr: "yr",
      mo: "mo",
      members: " Members",
      silver: "Silver",
      singleDevice: "Single Device",
      multipleDevice: "Multiple Device",
      gBStorage: "GB Storage",
      monthlyBackups: "Monthly Backups",
      permissionsWorkflows: "Permissions & workflows",
      check: "check",
      close: "close",
      textPrimary: "text-primary",
      text4: "",
      choose: "Choose ",
      currentLocalPreference: " Current local preference · ",
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
