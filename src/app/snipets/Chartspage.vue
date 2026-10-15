<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "vuetify";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import Charts from "../../com/Charts/Charts.vue";
import type { ChartDataColumn, ChartDataRow, ChartOptions } from "../../com/Charts/types";
import { chartExamples } from "../../data/chart-examples";

interface DemoPoint {
  x: number;
  y: number | number[];
}
interface DemoSeries {
  name: string;
  data: Array<number | DemoPoint>;
}
interface DemoConfig {
  title: string;
  type: "line" | "area" | "bar" | "candlestick";
  series: DemoSeries[];
  labels?: string[];
  colors: string[];
  gradient?: boolean;
  datetime?: boolean;
  xTitle?: string;
  yTitle?: string;
}

const demos = chartExamples as unknown as Record<string, DemoConfig>;
const route = useRoute();
const theme = useTheme();
const kind = computed(() => route.path.split("/").at(-1) || "line-chart");
const config = computed(() => demos[kind.value] || demos["line-chart"]);
const candle = computed(() => config.value.type === "candlestick");
const isDark = computed(() => theme.current.value.dark);

/** Every demo-specific palette, axis, label, and chart option stays in the wrapper. */
const options = computed<ChartOptions>(() => ({
  chart: {
    id: "b4-" + kind.value,
    fontFamily: "Manrope, sans-serif",
    background: "transparent",
    animations: { enabled: false },
    toolbar: {
      show: candle.value,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
    zoom: { enabled: candle.value },
    foreColor: isDark.value ? "#acb9cb" : "#98a4ae",
    dropShadow: {
      enabled: Boolean(config.value.gradient),
      top: 5,
      left: 0,
      blur: 3,
      opacity: 0.14,
    },
    redrawOnParentResize: true,
  },
  theme: { mode: isDark.value ? "dark" : "light" },
  labels: config.value.labels || [],
  colors: config.value.colors,
  stroke: {
    width: config.value.gradient
      ? 4
      : candle.value
        ? 1
        : config.value.type === "bar"
          ? 0
          : 2,
    curve:
      config.value.gradient || config.value.type === "area"
        ? "smooth"
        : "straight",
  },
  fill: config.value.gradient
    ? {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          gradientToColors: ["#16cdc7"],
          stops: [0, 100],
          opacityFrom: 1,
          opacityTo: 1,
        },
      }
    : {
        type: config.value.type === "area" ? "gradient" : "solid",
        opacity: config.value.type === "area" ? 0.2 : 1,
      },
  dataLabels: {
    enabled: kind.value === "line-chart",
    style: { fontSize: "10px" },
    background: { enabled: false },
  },
  markers: { size: 0, hover: { size: 5 } },
  grid: {
    borderColor: isDark.value ? "#344254" : "#eef2f6",
    strokeDashArray: 0,
    padding: { left: 8, right: 18 },
  },
  legend: {
    show: !candle.value && !config.value.gradient,
    position: "bottom",
    fontSize: "12px",
    markers: { size: 5 },
  },
  xaxis: {
    type: config.value.datetime ? "datetime" : "category",
    ...(config.value.datetime ? {} : { categories: config.value.labels }),
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { datetimeUTC: true, style: { fontSize: "11px" } },
    title: {
      text: config.value.xTitle || "",
      style: { fontSize: "11px", fontWeight: 400 },
    },
  },
  yaxis: {
    labels: {
      formatter: (value: number) =>
        candle.value ? Number(value).toFixed(2) : String(Math.round(value)),
      style: { fontSize: "11px" },
    },
    title: {
      text: config.value.yTitle || "",
      style: { fontWeight: 400, fontSize: "11px" },
    },
  },
  plotOptions: {
    bar: { columnWidth: "38%", borderRadius: 2 },
    candlestick: {
      colors: { upward: "#635bff", downward: "#16cdc7" },
      wick: { useFillColor: true },
    },
  },
  tooltip: {
    theme: isDark.value ? "dark" : "light",
    x: config.value.datetime ? { format: "dd MMM yyyy HH:mm" } : { show: true },
  },
}));

const dataRows = computed<ChartDataRow[]>(() => {
  const current = config.value;
  const first = current.series[0]?.data || [];
  if (candle.value) {
    return first.map((value) => {
      const point = value as DemoPoint;
      return [
        new Date(point.x).toISOString().slice(0, 16).replace("T", " "),
        ...(Array.isArray(point.y) ? point.y : [point.y]),
      ];
    });
  }
  return first.map((value, index) => [
    current.datetime
      ? new Date((value as DemoPoint).x).toISOString().slice(0, 10)
      : (current.labels?.[index] ?? index + 1),
    ...current.series.map((series) => {
      const point = series.data[index];
      return typeof point === "object"
        ? Array.isArray(point.y)
          ? point.y.join(", ")
          : point.y
        : (point ?? null);
    }),
  ]);
});
const dataColumns = computed<ChartDataColumn[]>(() => {
  const titles = candle.value
    ? ["Time (UTC)", "Open", "High", "Low", "Close"]
    : [
        config.value.datetime ? "Date" : "Period",
        ...config.value.series.map((series) => series.name),
      ];
  return titles.map((title, index) => ({ key: `column-${index}`, title }));
});
const description = computed(() =>
  candle.value
    ? "Illustrative OHLC data · Not financial advice or a live market feed."
    : "Interactive sample series · Hover for values; click a legend to toggle its series.",
);
</script>

<template>
  <WorkspacePage :title="config.title" class="b4-page" data-batch="4">
    <Charts
      :key="kind"
      :title="config.title"
      :type="config.type"
      :series="config.series"
      :options="options"
      :height="390"
      :description="description"
      :data-columns="dataColumns"
      :data-rows="dataRows"
      :show-reset="candle"
      :export-file-name="kind + '-sample.csv'"
      :labels="{
        visualizationAria: config.title + ' sample visualization',
        dataAria: config.title + ' data',
      }"
    />
  </WorkspacePage>
</template>
