import type { Component } from "vue";

/**
 * External controller contract for FormLayouts.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface FormLayoutsContext {
  readonly DemoForm: Component;
  readonly defaultFields: any[];
  error: string;
  errorText: string;
  readonly header: any[];
  readonly iconFields: any[];
  readonly ordinary: any[];
  success: string;
  readonly contentConfig: {
    readonly texts: {
      readonly formLayouts: string;
      readonly ordinaryForm: string;
      readonly inputVariants: string;
      readonly successInput: string;
      readonly errorInput: string;
      readonly inputWithErrorText: string;
      readonly defaultForm: string;
      readonly basicHeaderForm: string;
      readonly disabledForm: string;
      readonly name: string;
      readonly name2: string;
      readonly formWithLeftIcon: string;
      readonly formWithRightIcon: string;
    };
    readonly values: {};
  };
}
