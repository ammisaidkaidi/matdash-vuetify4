/**
 * External controller contract for Treeview.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface TreeviewContext {
  active: any[];
  readonly find: (...args: any[]) => any;
  readonly items: any[];
  readonly contentConfig: {
    readonly texts: {
      readonly treeview: string;
      readonly basic: string;
      readonly activatable: string;
      readonly selected: string;
      readonly color: string;
      readonly density: string;
      readonly openAll: string;
    };
    readonly values: {};
  };
}
