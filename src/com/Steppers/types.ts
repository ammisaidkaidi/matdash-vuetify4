/**
 * External controller contract for Steppers.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface SteppersContext {
  active: number;
  completed: boolean;
  readonly next: (...args: any[]) => any;
  readonly steps: any[];
  readonly titles: any[];
  readonly values: Record<string, any>;
  readonly contentConfig: {
    readonly texts: {
      readonly stepper: string;
      readonly nonEditableSteps: string;
      readonly editableSteps: string;
      readonly alternateLabel: string;
      readonly linearSteppers: string;
      readonly optionalSteps: string;
      readonly optional: string;
      readonly alternativeLabelWithErrors: string;
      readonly alertMessage: string;
      readonly itemsSteps: string;
      readonly step: string;
      readonly startWithTheDetailsThatDefineYourProjectAStepperKeepsEa: string;
      readonly reviewTheOptionsAndOrganizeYourWorkIntoClearManageableS: string;
      readonly everythingIsReadyFinishThisDemonstrationOrGoBackToRevie: string;
      readonly demoCompletedNoDataWasSubmitted: string;
      readonly previous: string;
      readonly startAgain: string;
      readonly finish: string;
      readonly next: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
