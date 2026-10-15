import type { Component } from "vue";

/**
 * External controller contract for DirectionalForms.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface DirectionalFormsContext {
  readonly DemoForm: Component;
  readonly FormExtras: Component;
  readonly accountFields: any;
  readonly basicFields: any;
  horizontal: any;
  readonly multi: any[];
  readonly contentConfig: {
    readonly texts: {
      readonly horizontalForm: string;
      readonly verticalForm: string;
      readonly basicLayout: string;
      readonly basicWithIcons: string;
      readonly formSeparator: string;
      readonly formLabelAlignment: string;
      readonly multiColumnWithFormSeparator: string;
    };
    readonly values: {};
  };
}
