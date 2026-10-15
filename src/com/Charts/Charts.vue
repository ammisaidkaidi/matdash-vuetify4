<script setup lang="ts">
import { computed, ref, useSlots, watch } from "vue";
import ApexChart from "vue3-apexcharts";
import TableCard from "../ui/TableCard.vue";
import type {
  ChartCsvPayload,
  ChartDataCell,
  ChartDataColumn,
  ChartDataRow,
  ChartHandle,
  ChartLabels,
  ChartOptions,
  ChartSeries,
  ChartType,
} from "./types";

const props = withDefaults(
  defineProps<{
    /** No sample data, route selection, or business-specific options live here. */
    type: ChartType;
    series: ChartSeries;
    options?: ChartOptions;
    title?: string;
    height?: string | number;
    width?: string | number;
    description?: string;
    dataColumns?: ChartDataColumn[];
    dataRows?: ChartDataRow[];
    showDataToggle?: boolean;
    showExport?: boolean;
    showReset?: boolean;
    exportFileName?: string;
    csvSeparator?: string;
    csvBom?: boolean;
    /** Neutralize spreadsheet formulas in string cells. Numbers remain numbers. */
    sanitizeCsv?: boolean;
    /** Override the browser download, for example to upload or stream the CSV. */
    exporter?: (payload: ChartCsvPayload) => void | Promise<void>;
    labels?: Partial<ChartLabels>;
    chartProps?: Record<string, unknown>;
  }>(),
  {
    options: () => ({}),
    title: "",
    height: 390,
    width: "100%",
    description: "",
    dataColumns: () => [],
    dataRows: () => [],
    showDataToggle: true,
    showExport: true,
    showReset: false,
    exportFileName: "chart-data.csv",
    csvSeparator: ",",
    csvBom: true,
    sanitizeCsv: true,
    chartProps: () => ({}),
  },
);

const showData = defineModel<boolean>("dataVisible", { default: false });
const emit = defineEmits<{
  export: [payload: ChartCsvPayload];
  reset: [];
  "data-toggle": [visible: boolean];
  error: [error: unknown];
}>();
const slots = useSlots();
const chart = ref<ChartHandle | null>(null);
const exporting = ref(false);
const exportError = ref(false);
const hasDataColumns = computed(() => props.dataColumns.length > 0);
const hasControls = computed(() =>
  Boolean(
    props.description ||
    props.showReset ||
    slots.actions ||
    (hasDataColumns.value && (props.showDataToggle || props.showExport)),
  ),
);
const L = computed<ChartLabels>(() => ({
  visualizationAria: props.title || "Chart",
  dataAria: props.title ? `${props.title} data` : "Chart data",
  viewData: "View data",
  hideData: "Hide data",
  reset: "Reset zoom",
  downloadCsv: "Download CSV",
  exporting: "Exporting…",
  empty: "No data available.",
  exportError: "Unable to export chart data.",
  ...props.labels,
}));

function toggleData() {
  showData.value = !showData.value;
}

async function reset() {
  try {
    await chart.value?.resetSeries();
    emit("reset");
  } catch (error) {
    emit("error", error);
  }
}

function textOf(value: ChartDataCell): string {
  return value instanceof Date ? value.toISOString() : String(value ?? "");
}

function displayCell(
  column: ChartDataColumn,
  row: ChartDataRow,
  rowIndex: number,
  columnIndex: number,
) {
  return column.format
    ? column.format(row[columnIndex], row, rowIndex)
    : textOf(row[columnIndex]);
}

function escapeCsv(value: ChartDataCell): string {
  let text = textOf(value);
  if (
    props.sanitizeCsv &&
    typeof value === "string" &&
    /^[\s]*[=+\-@\t\r]/.test(text)
  ) {
    text = "'" + text;
  }
  return '"' + text.replaceAll('"', '""') + '"';
}

function csvPayload(): ChartCsvPayload {
  const headers = props.dataColumns.map((column) => column.title);
  const rows = props.dataRows.map((row, rowIndex) =>
    props.dataColumns.map((column, columnIndex) =>
      column.exportValue
        ? column.exportValue(row[columnIndex], row, rowIndex)
        : row[columnIndex],
    ),
  );
  const separator = props.csvSeparator || ",";
  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsv).join(separator))
    .join("\r\n");
  return { fileName: props.exportFileName, headers, rows, csv };
}

async function downloadCsv() {
  if (exporting.value || !hasDataColumns.value) return;
  exporting.value = true;
  exportError.value = false;
  try {
    const payload = csvPayload();
    if (props.exporter) {
      await props.exporter(payload);
    } else {
      const blob = new Blob([props.csvBom ? "\uFEFF" : "", payload.csv], {
        type: "text/csv;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = payload.fileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    emit("export", payload);
  } catch (error) {
    exportError.value = true;
    emit("error", error);
  } finally {
    exporting.value = false;
  }
}

watch(showData, (value) => emit("data-toggle", value));
defineExpose({ reset, downloadCsv, toggleData, getChart: () => chart.value });
</script>

<template>
  <TableCard :title="title">
    <template v-if="slots['card-actions']" #actions
      ><slot name="card-actions"
    /></template>

    <div
      class="reusable-chart b4-chart"
      role="group"
      :aria-label="L.visualizationAria"
    >
      <slot name="chart" :type="type" :series="series" :options="options">
        <ApexChart
          ref="chart"
          :type="type"
          :height="height"
          :width="width"
          :options="options"
          :series="series"
          v-bind="chartProps"
        />
      </slot>
    </div>

    <div v-if="hasControls" class="reusable-chart-actions b4-chart-actions">
      <slot name="description"
        ><span v-if="description" class="muted text-caption">{{
          description
        }}</span></slot
      >
      <slot
        name="actions"
        :reset="reset"
        :downloadCsv="downloadCsv"
        :toggleData="toggleData"
        :dataVisible="showData"
        :exporting="exporting"
      >
        <div class="reusable-chart-buttons button-samples">
          <v-btn v-if="showReset" variant="text" size="small" @click="reset">{{
            L.reset
          }}</v-btn>
          <v-btn
            v-if="showDataToggle && hasDataColumns"
            variant="text"
            color="primary"
            size="small"
            :aria-expanded="showData"
            @click="toggleData"
            >{{ showData ? L.hideData : L.viewData }}</v-btn
          >
          <v-btn
            v-if="showExport && hasDataColumns"
            variant="tonal"
            color="primary"
            size="small"
            :loading="exporting"
            @click="downloadCsv"
            >{{ exporting ? L.exporting : L.downloadCsv }}</v-btn
          >
        </div>
      </slot>
    </div>

    <v-alert v-if="exportError" type="error" variant="tonal" class="mt-4">{{
      L.exportError
    }}</v-alert>

    <slot
      v-if="showData && hasDataColumns"
      name="data"
      :columns="dataColumns"
      :rows="dataRows"
    >
      <v-table
        class="reusable-chart-data b4-chart-data mt-5"
        :aria-label="L.dataAria"
      >
        <thead>
          <tr>
            <th
              v-for="(column, index) in dataColumns"
              :key="column.key || index"
              scope="col"
            >
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in dataRows" :key="rowIndex">
            <td
              v-for="(column, columnIndex) in dataColumns"
              :key="column.key || columnIndex"
            >
              <slot
                :name="'data.' + (column.key || columnIndex)"
                :value="row[columnIndex]"
                :row="row"
                :rowIndex="rowIndex"
                :column="column"
                >{{ displayCell(column, row, rowIndex, columnIndex) }}</slot
              >
            </td>
          </tr>
          <tr v-if="!dataRows.length">
            <td :colspan="dataColumns.length" class="text-center">
              {{ L.empty }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </slot>
    <slot name="footer" />
  </TableCard>
</template>

<style scoped>
.reusable-chart {
  width: 100%;
  min-width: 0;
  overflow: hidden;
}
.reusable-chart :deep(.apexcharts-canvas) {
  max-width: 100%;
}
.reusable-chart-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(var(--v-border-color), 0.07);
}
.reusable-chart-actions > span {
  flex: 1 1 250px;
}
.reusable-chart-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.reusable-chart-data {
  max-height: 420px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 8px;
}
.reusable-chart-data :deep(.v-table__wrapper) {
  max-height: 420px;
  overflow: auto;
}
.reusable-chart-data th,
.reusable-chart-data td {
  white-space: nowrap;
  font-size: 12px;
}
@media (max-width: 600px) {
  .reusable-chart-actions {
    align-items: stretch;
  }
  .reusable-chart-buttons {
    width: 100%;
  }
}
</style>
