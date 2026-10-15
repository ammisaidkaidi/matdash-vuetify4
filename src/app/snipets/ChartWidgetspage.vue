<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/ChartWidgets/ChartWidgets.vue";
import type { ChartWidgetsContext } from "../../com/ChartWidgets/types";
import { ref, computed } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import MiniChart from "../../com/ui/MiniChart.vue";
const trade = ref("Buy"),
  month = ref("March 2023");
const income = computed(() => [
  {
    name: trade.value === "Buy" ? "Buy sample" : "Sell sample",
    data:
      trade.value === "Buy"
        ? [40, 65, 55, 42, 61, 52, 72]
        : [60, 40, 70, 32, 55, 36, 48],
  },
]);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ChartWidgetsContext = __viewReactive({
  get MiniChart() {
    return __viewUnref(MiniChart);
  },
  get income() {
    return __viewUnref(income);
  },
  set income(value: any) {
    if (__viewIsRef(income)) (income as any).value = value;
  },
  get month() {
    return __viewUnref(month);
  },
  set month(value: any) {
    if (__viewIsRef(month)) (month as any).value = value;
  },
  get trade() {
    return __viewUnref(trade);
  },
  set trade(value: any) {
    if (__viewIsRef(trade)) (trade as any).value = value;
  },
  contentConfig: {
    texts: {
      chartsWidgets: "Charts Widgets",
      text1: "+1.20%",
      currentValue: "Current Value",
      buy: "Buy",
      sell: "Sell",
      income: "Income",
      text2: "$25,260",
      text3: "$21,740",
      text4: "+1.25%",
      expense: "Expense",
      text5: "$12,260",
      text6: "+4.25%",
      currentYear: "Current Year",
      text7: "$98,260",
      text8: "+2.5%",
      buySellChangesTheSampleChartNotAFinancialOrder:
        " Buy/Sell changes the sample chart, not a financial order. ",
      yearlyBreakup: "Yearly Breakup",
      text9: "$36,358",
      text10: " +9% ",
      lastYear: "last year",
      monthlyEarnings: "Monthly Earnings",
      text11: " $6,820 ",
      text12: "+9%",
      mostVisited: "Most Visited",
      visitsMonth: "Visits month",
      sanFrancisco: "San Francisco",
      march2023: "March 2023",
      diego: "Diego",
      yearlySales: "Yearly Sales",
      totalSales: "Total Sales",
      salary: "Salary",
      text13: "$5,296",
      pageImpressions: "Page Impressions",
      text14: "$456,120",
      changeYesterday: " Change Yesterday ",
      customers: "Customers",
      text15: "36,358",
      projects: "Projects",
      text16: "78,298",
      revenueUpdates: "Revenue Updates",
      overviewOfProfit: "Overview of Profit",
      salesOverview: "Sales Overview",
      everyMonth: "Every month",
      text17: "$500,458",
      profit: "Profit",
      text18: "$23,450",
    },
    values: {
      items1: [
        ["Followers", "2,545", "area", "#635bff"],
        ["Views", "15,480", "bar", "#16cdc7"],
        ["Earned", "2,545", "area", "#635bff"],
        ["Total Earning", "$78,298", "bar", "#16cdc7"],
      ],
      colors2: ["#16cdc7"],
      series3: [65, 35],
      series4: [64, 36],
      labels5: ["2024", "2025"],
      items6: ["March 2023", "April 2023", "May 2023"],
      labels7: ["01", "02", "03", "04", "05", "06"],
      colors8: ["#16cdc7"],
      colors9: ["#16cdc7"],
      series10: [
        {
          name: "Footwear",
          data: [3, 4, 2, 3, 2, 4],
        },
        {
          name: "Fashionwear",
          data: [-2, -3, -1, -2, -3, -2],
        },
      ],
      labels11: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
      series12: [60, 40],
      labels13: ["Profit", "Expense"],
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
