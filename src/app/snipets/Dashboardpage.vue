<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Dashboard/Dashboard.vue";
import type { DashboardContext } from "../../com/Dashboard/types";
import { computed, ref } from "vue";
import DashboardChart from "../../com/ui/DashboardChart.vue";
import { productSets } from "../../data/dashboard";
const tab = ref("App");
const period = ref("Sept 2025");
const selected = ref(null);
const periods = ["Sept 2025", "Oct 2025", "Nov 2025"];
const products = computed(() =>
  productSets[tab.value].map((p) => ({
    ...p,
    progress: Math.min(
      100,
      +(p.progress + periods.indexOf(period.value) * 4.1).toFixed(1),
    ),
    budget: Math.round(p.budget * (1 + periods.indexOf(period.value) * 0.08)),
  })),
);
const budget = (n) => "$" + (n / 1000).toFixed(1) + "K";
const tabs = [
  {
    name: "App",
    icon: "grid",
  },
  {
    name: "Mobile",
    icon: "phone",
  },
  {
    name: "Sass",
    icon: "calculator",
  },
  {
    name: "Others",
    icon: "folder",
  },
];
const orders = [
  {
    title: "64 new orders",
    caption: "Processing",
    icon: "store",
    color: "primary",
  },
  {
    title: "4 orders",
    caption: "On hold",
    icon: "shapes",
    color: "error",
  },
  {
    title: "6 orders",
    caption: "Delivered",
    icon: "pill",
    color: "secondary",
  },
];
defineExpose({
  selectTab: (value) => {
    tab.value = value;
    document.querySelector("#products")?.scrollIntoView({
      behavior: "smooth",
    });
  },
});

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: DashboardContext = __viewReactive({
  get DashboardChart() {
    return __viewUnref(DashboardChart);
  },
  get budget() {
    return __viewUnref(budget);
  },
  get orders() {
    return __viewUnref(orders);
  },
  get period() {
    return __viewUnref(period);
  },
  set period(value: any) {
    if (__viewIsRef(period)) (period as any).value = value;
  },
  get periods() {
    return __viewUnref(periods);
  },
  get products() {
    return __viewUnref(products);
  },
  set products(value: any) {
    if (__viewIsRef(products)) (products as any).value = value;
  },
  get selected() {
    return __viewUnref(selected);
  },
  set selected(value: any) {
    if (__viewIsRef(selected)) (selected as any).value = value;
  },
  get tab() {
    return __viewUnref(tab);
  },
  set tab(value: any) {
    if (__viewIsRef(tab)) (tab as any).value = value;
  },
  get tabs() {
    return __viewUnref(tabs);
  },
  contentConfig: {
    texts: {
      accountOverview: "Account overview",
      welcome: " Welcome",
      backDavid: " Back David ",
      budget: "Budget",
      text1: "$98,450",
      expense: "Expense",
      text2: "$2,440",
      assetsWelcomeBgBCkZs0OnPng: "/assets/welcome-bg-BCkZs0On.png",
      anArrowHittingAPurpleTarget: "An arrow hitting a purple target",
      customers: "Customers",
      text3: "36,358",
      text4: "-12%",
      projects: "Projects",
      text5: "78,298",
      text6: "+31.8%",
      revenueForecast: "Revenue Forecast",
      overviewOfProfit: "Overview of Profit",
      yourPerformance: "Your Performance",
      lastCheckOn25February: "Last check on 25 february",
      light: "light",
      text: "text-",
      text7: "275",
      learnInsightsHowToManageAllAspectsOfYourStartup:
        "Learn insights how to manage all aspects of your startup.",
      text8: "+26.5%",
      last7Days: "Last 7 days",
      april07April14: "April 07 - April 14",
      text9: "6,380",
      lastWeek: "Last Week",
      text10: "4,298",
      salesOverview: "Sales Overview",
      text11: "0%",
      text12: "25%",
      text13: "50%",
      text14: "75%",
      revenueByProduct: "Revenue by Product",
      revenuePeriod: "Revenue period",
      assigned: "Assigned",
      progress: "Progress",
      priority: "Priority",
      view: "View ",
      assetsProduct: "/assets/product-",
      jpg: ".jpg",
      text15: "%",
      projects2: " projects · ",
      totalSettlements: "Total settlements",
      text16: "$122,580",
      totalBalance: "Total balance",
      withdrawals: "Withdrawals",
      text17: "$31,640",
      projectOverview: "Project overview",
      closeProject: "Close project",
      managedBy: "Managed by ",
      projectProgress: "Project progress",
      budget2: "Budget · ",
      text18: "$",
      sampleProjectDataForThisDashboardPreview:
        " Sample project data for this dashboard preview. ",
      done: "Done",
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
