<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/CircularCharts/CircularCharts.vue";
import type { CircularChartsContext } from "../../com/CircularCharts/types";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "vuetify";
import ApexChart from "vue3-apexcharts";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import TableCard from "../../com/ui/TableCard.vue";
const radial = useRoute().path.includes("radialbar"),
  theme = useTheme(),
  show = ref({});
const charts = radial
  ? [
      {
        title: "Radialbar Chart",
        type: "radialBar",
        series: [44, 55, 67, 83],
        labels: ["Apples", "Oranges", "Bananas", "Berries"],
      },
      {
        title: "Radar Chart",
        type: "radar",
        series: [
          {
            name: "Series 1",
            data: [80, 50, 30, 40, 100, 20],
          },
        ],
        labels: ["January", "February", "March", "April", "May", "June"],
      },
    ]
  : [
      {
        title: "Donut Chart",
        type: "donut",
        series: [44, 55, 13, 43, 22],
        labels: ["series-1", "series-2", "series-3", "series-4", "series-5"],
      },
      {
        title: "Pie Chart",
        type: "pie",
        series: [44, 55, 13, 43, 22],
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      },
    ];
const configs = computed(() =>
  charts.map((c) => ({
    chart: {
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
      fontFamily: "Manrope, sans-serif",
      background: "transparent",
      foreColor: theme.current.value.dark ? "#acb9cb" : "#98a4ae",
    },
    theme: {
      mode: theme.current.value.dark ? "dark" : "light",
    },
    labels: c.labels,
    colors:
      c.type === "radar"
        ? ["#635bff"]
        : ["#39c6df", "#635bff", "#ff6692", "#36c76c", "#ffd648"],
    stroke: {
      width: c.type === "radar" ? 2 : 0,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: c.type === "donut" || c.type === "pie",
      position: "bottom",
      fontSize: "11px",
      itemMargin: {
        horizontal: 7,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "68%",
        },
      },
      radialBar: {
        hollow: {
          size: "35%",
        },
        track: {
          background: theme.current.value.dark ? "#344254" : "#f1f3f6",
        },
        dataLabels: {
          name: {
            fontSize: "17px",
          },
          value: {
            fontSize: "20px",
          },
          total: {
            show: true,
            label: "Total",
            formatter: () => c.series.reduce((a, b) => a + b, 0),
          },
        },
      },
      radar: {
        polygons: {
          strokeColors: theme.current.value.dark ? "#344254" : "#edf0f4",
          fill: {
            colors: ["transparent"],
          },
        },
      },
    },
    fill: {
      opacity: c.type === "radar" ? 0.45 : 1,
    },
    xaxis: {
      categories: c.labels,
      labels: {
        style: {
          fontSize: "11px",
        },
      },
    },
    yaxis:
      c.type === "radar"
        ? {
            min: 0,
            max: 120,
            tickAmount: 4,
            labels: {
              style: {
                fontSize: "10px",
              },
            },
          }
        : {
            show: false,
          },
    markers: {
      size: c.type === "radar" ? 3 : 0,
    },
    tooltip: {
      theme: theme.current.value.dark ? "dark" : "light",
    },
  })),
);
function values(c) {
  return c.type === "radar" ? c.series[0].data : c.series;
}
function download(c) {
  const csv =
    "Label,Value\n" +
    c.labels.map((label, i) => label + "," + values(c)[i]).join("\n");
  const url = URL.createObjectURL(
    new Blob([csv], {
      type: "text/csv",
    }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = c.type + "-sample.csv";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: CircularChartsContext = __viewReactive({
  get charts() {
    return __viewUnref(charts);
  },
  set charts(value: any) {
    if (__viewIsRef(charts)) (charts as any).value = value;
  },
  get configs() {
    return __viewUnref(configs);
  },
  set configs(value: any) {
    if (__viewIsRef(configs)) (configs as any).value = value;
  },
  get download() {
    return __viewUnref(download);
  },
  get radial() {
    return __viewUnref(radial);
  },
  set radial(value: any) {
    if (__viewIsRef(radial)) (radial as any).value = value;
  },
  get show() {
    return __viewUnref(show);
  },
  set show(value: any) {
    if (__viewIsRef(show)) (show as any).value = value;
  },
  get values() {
    return __viewUnref(values);
  },
  contentConfig: {
    texts: {
      radialbarRadarChart: "Radialbar & Radar Chart",
      doughnutChart: "Doughnut Chart",
      hideData: "Hide data",
      viewData: "View data",
      downloadCSV: "Download CSV",
      label: "Label",
      value: "Value",
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
