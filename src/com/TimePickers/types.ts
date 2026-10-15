/**
 * External controller contract for TimePickers.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface TimePickersContext {
  readonly times: Record<string, any>;
  readonly contentConfig: {
    readonly texts: {
      readonly timePicker: string;
      readonly default: string;
      readonly sELECTTIME: string;
      readonly chooseATime: string;
      readonly format: string;
      readonly text1: string;
      readonly notSelected: string;
      readonly scrollable: string;
      readonly useSeconds: string;
      readonly colors: string;
      readonly pRIMARY: string;
      readonly sECONDARY: string;
      readonly range: string;
      readonly sTARTTIME: string;
      readonly startTime: string;
      readonly eNDTIME: string;
      readonly endTime: string;
      readonly text2: string;
      readonly endTimeMustBeAfterStartTime: string;
    };
    readonly values: {};
  };
}
