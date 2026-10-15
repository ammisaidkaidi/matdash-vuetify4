<script setup>
import { computed } from "vue";
import { useTheme } from "vuetify";
import ApexChart from "vue3-apexcharts";
const props = defineProps({
  type: { type: String, default: "area" },
  series: Array,
  labels: Array,
  height: { type: Number, default: 180 },
  spark: Boolean,
  colors: { type: Array, default: () => ["#635bff", "#16cdc7", "#ff6692"] },
  stacked: Boolean,
});
const theme = useTheme();
const options = computed(() => ({
  chart: {
    toolbar: { show: false },
    animations: { enabled: false },
    sparkline: { enabled: props.spark },
    stacked: props.stacked,
    foreColor: theme.current.value.dark ? "#bac6d6" : "#98a4ae",
    fontFamily: "Manrope, sans-serif",
    background: "transparent",
  },
  theme: { mode: theme.current.value.dark ? "dark" : "light" },
  colors: props.colors,
  stroke: {
    curve: "smooth",
    width: props.type === "bar" ? 0 : props.type === "donut" ? 3 : 2,
  },
  fill: { opacity: props.type === "area" ? 0.13 : 1 },
  dataLabels: { enabled: false },
  grid: {
    borderColor: theme.current.value.dark ? "#344254" : "#eef1f6",
    strokeDashArray: 4,
  },
  plotOptions: {
    bar: { borderRadius: 4, columnWidth: "30%" },
    pie: { donut: { size: "78%" } },
  },
  labels: props.labels || [],
  xaxis: {
    categories: props.labels || [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { fontSize: "10px" } },
  },
  yaxis: { labels: { style: { fontSize: "10px" } } },
  legend: { show: !props.spark, position: "bottom", fontSize: "11px" },
  tooltip: { theme: theme.current.value.dark ? "dark" : "light" },
}));
const values = computed(
  () =>
    props.series ||
    (props.type === "donut"
      ? [42, 31, 27]
      : [{ name: "Value", data: [20, 35, 24, 48, 30, 55, 41, 62] }]),
);
</script>
<template>
  <div class="b3-chart">
    <ApexChart
      :type="type"
      :height="height"
      width="100%"
      :options="options"
      :series="values"
    />
  </div>
</template>
