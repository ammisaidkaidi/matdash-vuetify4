export type {
  CrudField,
  CrudFieldType,
  CrudId,
  CrudLabels,
  CrudMode,
  CrudRule,
  CrudSelectItem,
} from "../CrudTable/types";

/** Editable is a thin adapter over the shared CRUD component, not a second implementation. */
export interface EditableHandle<T = Record<string, any>> {
  openEditor: (item?: T) => void;
  remove: (item: T) => Promise<void>;
}
