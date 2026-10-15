/**
 * External controller contract for Accordion.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface AccordionContext {
  readonly mdiMinus: any;
  readonly mdiPlus: any;
  readonly state: Record<string, any>;
  readonly text: string;
  readonly contentConfig: {
    readonly texts: {
      readonly accordian: string;
      readonly inset: string;
      readonly inset2: string;
      readonly popout: string;
      readonly popout2: string;
      readonly accordion: string;
      readonly advance: string;
      readonly generalSettings: string;
      readonly users: string;
      readonly advanceSettings: string;
      readonly personalData: string;
      readonly accordion1: string;
      readonly accordion2: string;
      readonly accordion3: string;
      readonly customizedIcon: string;
      readonly iAmAnAccordion: string;
      readonly youAreCurrentlyNotAnOwner: string;
      readonly filteringHasBeenEntirelyDisabledForWholeWebServer: string;
      readonly text1: string;
    };
    readonly values: {};
  };
}
