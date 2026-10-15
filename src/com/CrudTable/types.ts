export type CrudId = string | number;
export type CrudMode = "create" | "update";
export type CrudFieldType =
  "text" | "textarea" | "number" | "date" | "select" | "switch";

export type CrudRule = (value: any) => true | string | Promise<true | string>;

export interface CrudSelectItem {
  title: string;
  value: unknown;
}

/** Describes one property of a record: its form input AND its table column. */
export interface CrudField<T = Record<string, any>> {
  /** Property name on the record. */
  key: Extract<keyof T, string>;
  /** Form input label. */
  label: string;
  /** Input type. Default: "text". */
  type?: CrudFieldType;
  /** Column title when it should differ from `label`. */
  header?: string;
  required?: boolean;
  /** Extra validation rules, run after the built-in ones. */
  rules?: CrudRule[];
  /** Initial value for new records (a value or a `() => value` factory). */
  default?: unknown;
  /** number: lower / upper bound. */
  min?: number;
  max?: number;
  step?: number | "any";
  /** text / textarea: max characters. */
  maxLength?: number;
  /** select: options. */
  items?: Array<string | number | CrudSelectItem>;
  /** Span the full width of the form grid. Default: true for textarea only. */
  wide?: boolean;
  /** Default: true. */
  showInTable?: boolean;
  /** Default: true. */
  showInForm?: boolean;
  /** Default: true. */
  sortable?: boolean;
  align?: "start" | "center" | "end";
  /** Passed straight to the underlying Vuetify input. */
  props?: Record<string, unknown>;
}

export interface CrudLabels {
  /** Toolbar heading. */
  heading: string;
  add: string;
  newTitle: string;
  editTitle: string;
  save: string;
  cancel: string;
  actions: string;
  search: string;
  empty: string;
  tableAria: string;
  closeEditor: string;
  editAria: (name: string) => string;
  deleteAria: (name: string) => string;
  deleteTitle: (name: string) => string;
  deleteMessage: string;
  saved: string;
  deleted: string;
}
