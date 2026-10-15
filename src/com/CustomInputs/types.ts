/**
 * External controller contract for CustomInputs.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface CustomInputsContext {
  readonly model: Record<string, any>;
  readonly required: any;
  readonly validEmail: any;
  readonly contentConfig: {
    readonly texts: {
      readonly customInputs: string;
      readonly error: string;
      readonly input: string;
      readonly multipleError: string;
      readonly inputWithMultipleErrors: string;
      readonly loading: string;
      readonly loadingInput: string;
      readonly appendAndPrepend: string;
      readonly amount: string;
      readonly decreaseAmount: string;
      readonly text1: string;
      readonly increaseAmount: string;
      readonly text2: string;
      readonly hideDetails: string;
      readonly mainInput: string;
      readonly rules: string;
      readonly enterEmail: string;
    };
    readonly values: {
      readonly errormessages1: any[];
      readonly errormessages2: any[];
    };
  };
}
