/**
 * External controller contract for DateTime.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface DateTimeContext {
  date: string;
  time: string;
  readonly contentConfig: {
    readonly texts: {
      readonly datePicker: string;
      readonly timePicker: string;
      readonly selected: string;
      readonly noDate: string;
      readonly text1: string;
      readonly noTime: string;
      readonly text2: string;
      readonly clearSelection: string;
    };
    readonly values: {};
  };
}
