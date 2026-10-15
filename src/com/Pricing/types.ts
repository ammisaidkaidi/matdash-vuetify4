/**
 * External controller contract for Pricing.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface PricingContext {
  readonly asset: (...args: any[]) => any;
  readonly choose: (...args: any[]) => any;
  readonly pageDemos: any;
  readonly plans: any[];
  yearly: any;
  readonly contentConfig: {
    readonly texts: {
      readonly pricing: string;
      readonly flexiblePlansTailoredToFitYour: string;
      readonly communitySUniqueNeeds: string;
      readonly monthly: string;
      readonly yearlyBilling: string;
      readonly yearly: string;
      readonly annualSamplePricingIncludesTwoMonthsFree: string;
      readonly bronze: string;
      readonly pOPULAR: string;
      readonly text1: string;
      readonly medal: string;
      readonly text2: string;
      readonly free: string;
      readonly text3: string;
      readonly yr: string;
      readonly mo: string;
      readonly members: string;
      readonly silver: string;
      readonly singleDevice: string;
      readonly multipleDevice: string;
      readonly gBStorage: string;
      readonly monthlyBackups: string;
      readonly permissionsWorkflows: string;
      readonly check: string;
      readonly close: string;
      readonly textPrimary: string;
      readonly text4: string;
      readonly choose: string;
      readonly currentLocalPreference: string;
    };
    readonly values: {};
  };
}
