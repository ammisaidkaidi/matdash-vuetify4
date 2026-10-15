export type DataTableKey = string | number;
export type DataTableDensity = "default" | "comfortable" | "compact";
export type DataTableSelectStrategy = "single" | "page" | "all";
export type DataTablePageSizeOption = number | { value: number; title: string };

/** A table column. Data, labels, and presentation come from the parent. */
export interface DataTableColumn<T = Record<string, any>> {
  key: string;
  title: string;
  value?: Extract<keyof T, string> | ((item: T) => unknown);
  sortable?: boolean;
  align?: "start" | "center" | "end";
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  headerProps?: Record<string, unknown>;
}

export interface DataTableSort {
  key: string;
  order?: "asc" | "desc";
}

export interface DataTableGroup {
  key: string;
  order?: "asc" | "desc";
}

export type DataTableItemLabel<T> =
  Extract<keyof T, string> | ((item: T) => string);

export type DataTableItemSelectable<T> =
  Extract<keyof T, string> | ((item: T) => boolean);

export type DataTableFilter = (
  value: unknown,
  search: string,
  item?: unknown,
) => boolean | number;

/** Local view state emitted when pagination, filtering, or sorting changes. */
export interface DataTableOptions {
  page: number;
  pageSize: number;
  search: string;
  sortBy: DataTableSort[];
  selectStrategy: DataTableSelectStrategy;
}

export interface DataTableLabels {
  search: string;
  tableAria: string;
  empty: string;
  selectionStrategy: string;
  strategyHelp: (strategy: DataTableSelectStrategy) => string;
  selectedCount: (count: number) => string;
  clearSelection: string;
  itemsPerPage: string;
  pagination: string;
  expandRow: (name: string) => string;
  collapseRow: (name: string) => string;
  expandGroup: (name: string) => string;
  collapseGroup: (name: string) => string;
  expandedEmpty: string;
}
