/**
 * External controller contract for NotFound.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface NotFoundContext {
  route: any;
  readonly contentConfig: {
    readonly texts: {
      readonly text1: string;
      readonly thisPageIsnTInYourWorkspace: string;
      readonly noRouteMatches: string;
      readonly text2: string;
      readonly dashboardsDashboard1: string;
      readonly backToDashboard: string;
      readonly pagesRouteDirectory: string;
      readonly browseRoutes: string;
    };
    readonly values: {};
  };
}
