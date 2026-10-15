/**
 * External controller contract for ErrorPage.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ErrorPageContext {
  readonly asset: (...args: any[]) => any;
  readonly contentConfig: {
    readonly texts: {
      readonly errorimg: string;
      readonly text1: string;
      readonly opps: string;
      readonly thisPageYouAreLookingForCouldNotBeFound: string;
      readonly dashboardsDashboard1: string;
      readonly goBackToHome: string;
    };
    readonly values: {};
  };
}
