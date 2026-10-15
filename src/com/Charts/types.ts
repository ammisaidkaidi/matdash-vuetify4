import type { ApexOptions } from "apexcharts";

export type ChartOptions = ApexOptions;
export type ChartType = NonNullable<NonNullable<ApexOptions["chart"]>["type"]>;
export type ChartSeries = NonNullable<ApexOptions["series"]>;
export type ChartDataCell = string | number | boolean | Date | null | undefined;
export type ChartDataRow = ChartDataCell[];

/** Data-view and CSV columns are supplied by the parent, not inferred from a demo. */
export interface ChartDataColumn {
  key?: string;
  title: string;
  format?: (
    value: ChartDataCell,
    row: ChartDataRow,
    rowIndex: number,
  ) => string | number;
  exportValue?: (
    value: ChartDataCell,
    row: ChartDataRow,
    rowIndex: number,
  ) => ChartDataCell;
}

export interface ChartCsvPayload {
  fileName: string;
  headers: string[];
  rows: ChartDataRow[];
  csv: string;
}

export interface ChartLabels {
  visualizationAria: string;
  dataAria: string;
  viewData: string;
  hideData: string;
  reset: string;
  downloadCsv: string;
  exporting: string;
  empty: string;
  exportError: string;
}

export interface ChartHandle {
  resetSeries: (
    shouldUpdateChart?: boolean,
    shouldResetZoom?: boolean,
  ) => void | Promise<void>;
}
