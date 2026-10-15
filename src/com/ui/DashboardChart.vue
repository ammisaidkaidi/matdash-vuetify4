<script setup>
import { computed } from "vue";
import { useTheme } from "vuetify";
import VueApexCharts from "vue3-apexcharts";
const props = defineProps({
  kind: String,
  height: { type: [Number, String], default: 100 },
});
const theme = useTheme();
const dark = computed(() => theme.current.value.dark);
const configs = {
  revenue: {
    type: "area",
    series: [
      { name: "2025", data: [100, 75, 80, 40, 20, 40, 0, 25] },
      { name: "2024", data: [50, 60, 30, 55, 75, 60, 100, 120] },
      { name: "2023", data: [35, 45, 40, 50, 35, 55, 40, 45] },
    ],
    options: {
      colors: ["#635bff", "#ff6692", "#16cdc7"],
      stroke: { width: 2, curve: "monotoneCubic" },
      fill: { type: "solid", opacity: 0.025 },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug"],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        min: 0,
        max: 120,
        tickAmount: 4,
        labels: { style: { fontSize: "11px" } },
      },
      grid: {
        xaxis: { lines: { show: true } },
        padding: { left: 3, right: 10 },
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "right",
        offsetY: -44,
        markers: { size: 4 },
        itemMargin: { horizontal: 12 },
        fontSize: "13px",
      },
    },
  },
  customers: {
    type: "area",
    series: [{ name: "Customers", data: [36, 45, 31, 47, 38, 43] }],
    options: {
      chart: { sparkline: { enabled: true } },
      colors: ["#16cdc7"],
      stroke: { curve: "smooth", width: 2 },
      fill: { type: "solid", opacity: 0.16 },
      tooltip: { x: { show: false } },
      yaxis: { min: 28, max: 50 },
    },
  },
  projects: {
    type: "bar",
    series: [{ name: "Projects", data: [3, 5, 5, 7, 6, 5, 3, 5, 3] }],
    options: {
      chart: { sparkline: { enabled: true } },
      colors: ["#fff"],
      plotOptions: { bar: { columnWidth: "53%", borderRadius: 4 } },
      tooltip: { x: { show: false } },
    },
  },
  customerTrend: {
    type: "line",
    series: [
      { name: "April 07 – April 14", data: [0, 20, 15, 19, 14, 25, 30] },
      { name: "Last Week", data: [0, 8, 19, 13, 26, 16, 25] },
    ],
    options: {
      chart: { sparkline: { enabled: true } },
      colors: ["#635bff", "#dddbff"],
      stroke: { curve: "smooth", width: 2 },
      tooltip: { x: { show: false } },
      yaxis: { min: 0, max: 32 },
    },
  },
  performance: {
    type: "donut",
    series: [20, 20, 20, 20, 20],
    options: {
      colors: ["#ff6692", "#ffd648", "#fff7da", "#a6f7f5", "#16cdc7"],
      labels: ["Processing", "On hold", "Pending", "Review", "Delivered"],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 5,
          donut: { size: "89%" },
        },
      },
      grid: { padding: { bottom: -100, left: -12, right: -12 } },
      stroke: { width: 2 },
      tooltip: { enabled: false },
    },
  },
  sales: {
    type: "radialBar",
    series: [50, 80, 30],
    options: {
      colors: ["#635bff", "#16cdc7", "#ff6692"],
      labels: ["App", "Mobile", "Sass"],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 270,
          hollow: { size: "40%" },
          track: { background: "#f2f2f2", margin: 6 },
          dataLabels: { show: false },
        },
      },
      stroke: { lineCap: "round" },
      grid: { padding: { top: 0, bottom: 0 } },
      tooltip: { enabled: true },
    },
  },
  settlements: {
    type: "line",
    series: [
      {
        name: "Settlements",
        data: [
          40, 40, 80, 80, 30, 30, 10, 10, 30, 30, 100, 100, 20, 20, 140, 140,
        ],
      },
    ],
    options: {
      colors: ["#635bff"],
      stroke: { curve: "smooth", width: 2 },
      xaxis: {
        categories: [
          "1W",
          "",
          "3W",
          "",
          "5W",
          "",
          "7W",
          "",
          "9W",
          "",
          "11W",
          "",
          "13W",
          "",
          "15W",
          "",
        ],
        labels: { style: { fontSize: "10px" } },
        axisBorder: { show: false },
        axisTicks: { show: false },
        tooltip: { enabled: false },
      },
      yaxis: { show: false, min: 0, max: 140, tickAmount: 2 },
      grid: { strokeDashArray: 4, padding: { left: 12, right: 12 } },
      tooltip: { x: { show: false } },
    },
  },
};
const config = computed(() => configs[props.kind]);
const options = computed(() => {
  const c = config.value.options;
  return {
    ...c,
    chart: {
      fontFamily: "Manrope, sans-serif",
      toolbar: { show: false },
      animations: { enabled: true },
      foreColor: dark.value ? "#93a3ba" : "#98a4ae",
      parentHeightOffset: 0,
      ...c.chart,
    },
    dataLabels: { enabled: false },
    legend: { show: false, ...c.legend },
    grid: {
      borderColor: dark.value
        ? "#344057"
        : props.kind === "settlements"
          ? "#c5c1ff"
          : "#f0f1f4",
      ...c.grid,
    },
    tooltip: { theme: dark.value ? "dark" : "light", ...c.tooltip },
    stroke: { ...c.stroke },
    responsive: [
      {
        breakpoint: 600,
        options: {
          legend: { fontSize: "11px", itemMargin: { horizontal: 6 } },
        },
      },
    ],
  };
});
</script>
<template>
  <VueApexCharts
    :type="config.type"
    :height="height"
    width="100%"
    :options="options"
    :series="config.series"
  />
</template>
