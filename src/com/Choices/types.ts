/**
 * External controller contract for Choices.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ChoicesContext {
  readonly colors: any[];
  kind: any;
  readonly state: Record<string, any>;
  readonly contentConfig: {
    readonly texts: {
      readonly checkbox: string;
      readonly checkboxes: string;
      readonly radio: string;
      readonly radio2: string;
      readonly switch: string;
      readonly checkbox2: string;
      readonly custom: string;
      readonly customChecked: string;
      readonly customUnchecked: string;
      readonly customIndeterminate: string;
      readonly colors: string;
      readonly checkbox3: string;
      readonly default: string;
      readonly states: string;
      readonly checked: string;
      readonly unchecked: string;
      readonly radio3: string;
      readonly label: string;
      readonly radio4: string;
      readonly colorsWithLabel: string;
      readonly defaultDirection: string;
      readonly option: string;
      readonly inlineDirection: string;
      readonly defaultSwitch: string;
      readonly inset: string;
      readonly insetSwitch: string;
      readonly withLabel: string;
      readonly disabled: string;
      readonly loadingIndicatorsAreStaticExamplesNoRequestIsRunning: string;
      readonly onLoading: string;
      readonly offLoading: string;
      readonly switch2: string;
      readonly insetColors: string;
      readonly insetSwitch2: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
      readonly items3: any[];
    };
  };
}
