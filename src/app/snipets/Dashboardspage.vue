<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Dashboards/Dashboards.vue";
import type { DashboardsContext } from "../../com/Dashboards/types";
import { ref } from "vue";
import { useRoute } from "vue-router";
import MiniChart from "../../com/ui/MiniChart.vue";
import ProductRevenue from "../../com/ui/ProductRevenue.vue";
import Activities from "../../com/ui/Activities.vue";
import Calendar from "./Calendarpage.vue";
import { asset, avatar } from "../../data/app-seed";
const third = useRoute().path.endsWith("dashboard3");
const selected = ref(null);
const forecast = [
  {
    name: "2025",
    data: [1.4, 2.5, 1.7, 3.1, 2.6, 2.3, 2.1, 2.4, 2.2],
  },
  {
    name: "2024",
    data: [-2.3, -1.4, -2.6, -1.9, -2.8, -1.6, -2.4, -1.4, -1.8],
  },
];
const stats = [
  ["Total Orders", "16,689", "package", "primary"],
  ["Return Item", "148", "back", "warning"],
  ["Annual Budget", "$156K", "creditcard", "secondary"],
  ["Cancel Orders", "64", "close", "error"],
  ["Total Income", "$36,715", "invoice", "success"],
];

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: DashboardsContext = __viewReactive({
  get Activities() {
    return __viewUnref(Activities);
  },
  get Calendar() {
    return __viewUnref(Calendar);
  },
  get MiniChart() {
    return __viewUnref(MiniChart);
  },
  get ProductRevenue() {
    return __viewUnref(ProductRevenue);
  },
  get asset() {
    return __viewUnref(asset);
  },
  get avatar() {
    return __viewUnref(avatar);
  },
  get forecast() {
    return __viewUnref(forecast);
  },
  get selected() {
    return __viewUnref(selected);
  },
  set selected(value: any) {
    if (__viewIsRef(selected)) (selected as any).value = value;
  },
  get stats() {
    return __viewUnref(stats);
  },
  get third() {
    return __viewUnref(third);
  },
  set third(value: any) {
    if (__viewIsRef(third)) (third as any).value = value;
  },
  contentConfig: {
    texts: {
      dashboard3: "Dashboard3",
      dashboard2: "Dashboard2",
      viewDetails: "View Details",
      welcomeBg2: "welcome-bg2-",
      text1: "",
      thisMonth15Profit: "This month +15% Profit",
      heyDavidMcMichael: "Hey, David McMichael",
      aeneanVelLiberoIdMetusSollicitudin:
        "Aenean vel libero id metus sollicitudin",
      subscriptions: "Subscriptions",
      text2: "78,298 ",
      text3: "−12%",
      users: "Users",
      text4: "14,872 ",
      text5: "+6.4%",
      revenueForecast: "Revenue Forecast",
      overviewOfProfit: "Overview of Profit",
      annualProfit: "Annual Profit",
      conversionRate: "Conversion Rate",
      text6: "18.4%",
      text7: " · ",
      text8: "+",
      textSuccess: "text-success",
      textError: "text-error",
      yourPerformance: "Your Performance",
      lastCheckOn25February: "Last check on 25 february",
      text9: "64 new orders",
      processing: "Processing",
      text10: "4 orders",
      onHold: "On hold",
      text11: "6 orders",
      delivered: "Delivered",
      customers: " Customers ",
      text12: "+26.5%",
      last7Days: "Last 7 days",
      april07April14: "April 07 – April 14",
      text13: "6,380",
      lastWeek: "Last Week",
      text14: "4,298",
      salesOverview: "Sales Overview",
      newCustomers: "New Customers",
      newGoals: "New Goals",
      text15: "83%",
      totalIncome: "Total Income",
      text16: "$680 ",
      text17: "+18%",
      weeklySchedules: "Weekly Schedules",
      appsCalendar: "/apps/calendar",
      text18: "%",
      text19: "#635bff",
      text20: "#29343d",
      ff6692: "#ff6692",
      meetingWithSunil: "Meeting with Sunil",
      openCalendar: "Open calendar",
      totalSettlements: "Total settlements",
      text21: "$122,580",
      totalBalance: "Total balance",
      withdrawals: "Withdrawals",
      text22: "$31,640",
      salesFromLocations: "Sales from Locations",
      regionalDistribution: "Regional distribution",
      weeklyStats: "Weekly Stats",
      sales: "Sales",
      text23: "$36,850",
      expenses: "Expenses",
      text24: "$4,720",
      blogImg4: "blog-img4-",
      abstractDesignInspiration: "Abstract design inspiration",
      figmaTipsAndTricksWithStephan: "Figma tips and tricks with Stephan",
      exploreAFreshPerspectiveOnDesignAndTheDetailsThatMakeAD:
        " Explore a fresh perspective on design and the details that make a difference. ",
      sampleReader: "Sample reader",
      text25: "+12",
      appsBlogPosts: "/apps/blog/posts",
      readArticles: "Read articles",
      interactiveSampleAnalyticsNoLiveFinancialServices:
        " Interactive sample analytics · No live financial services. ",
      illustrativeDashboardMetricExploreTheRelatedLocalRecord:
        " Illustrative dashboard metric. Explore the related local records below. ",
      close: "Close",
      appsInvoice: "/apps/invoice",
      viewInvoices: "View invoices",
    },
    values: {
      colors1: ["#ff6692"],
      colors2: ["#16cdc7"],
      labels3: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep"],
      colors4: ["#635bff", "#ff6692"],
      items5: [
        ["Total", "$96,640"],
        ["Profit", "$48,820"],
        ["Earnings", "$58,820"],
      ],
      items6: [
        ["Added to Cart", "5 clicks", "$21,120.70", "+13.2%"],
        ["Reached to Checkout", "12 clicks", "$16,100.00", "−7.4%"],
        ["Added to Cart", "24 views", "$6,400.50", "+9.3%"],
      ],
      series7: [64, 4, 6],
      labels8: ["Processing", "On hold", "Delivered"],
      labels9: ["Profit", "Expenses", "Revenue"],
      colors10: ["#ff6692"],
      items11: ["Sun", "Mon", "Tue"],
      items12: [
        ["LA", 28, "primary"],
        ["NY", 21, "secondary"],
        ["KA", 18, "warning"],
        ["AZ", 12, "error"],
      ],
      items13: [2, 3, 4, 5],
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
