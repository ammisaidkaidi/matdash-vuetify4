export type PlainTableKey = string | number;
export type PlainTableDensity = "default" | "comfortable" | "compact";
export type PlainTableAlignment = "start" | "center" | "end";

/** A plain table column. It contains no application-specific data. */
export interface PlainTableColumn<T = Record<string, any>> {
  key: string;
  title: string;
  value?: Extract<keyof T, string> | ((item: T, index: number) => unknown);
  format?: (value: unknown, item: T, index: number) => string | number;
  align?: PlainTableAlignment;
  width?: string | number;
  headerClass?: string;
  cellClass?: string;
  headerProps?: Record<string, unknown>;
  cellProps?:
    | Record<string, unknown>
    | ((item: T, index: number) => Record<string, unknown>);
}

export type PlainTableItemKey<T> =
  Extract<keyof T, string> | ((item: T, index: number) => PlainTableKey);

/** Actions emit to the parent; this component never opens business dialogs. */
export interface PlainTableAction<T = Record<string, any>> {
  key: string;
  label: string | ((item: T) => string);
  icon?: string;
  color?: string;
  variant?: "text" | "flat" | "elevated" | "tonal" | "outlined" | "plain";
  visible?: (item: T) => boolean;
  disabled?: boolean | ((item: T) => boolean);
}

export interface PlainTableLabels {
  tableAria: string;
  actions: string;
  empty: string;
}
