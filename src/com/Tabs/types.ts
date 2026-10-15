import type { Component } from "vue";

/**
 * External controller contract for Tabs.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface TabsContext {
  readonly TabExample: Component;
  readonly contentConfig: {
    readonly texts: {
      readonly tabs: string;
    };
    readonly values: {
      readonly items1: any[];
    };
  };
}
