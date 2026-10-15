/**
 * External controller contract for QueuedPage.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface QueuedPageContext {
  related: any;
  route: any;
  readonly contentConfig: {
    readonly texts: {
      readonly mappedAwaitingRebuild: string;
      readonly thisRouteIsConnectedToYourAppButItsPageHasNotBeenRecrea: string;
      readonly pagesAccountSettings: string;
      readonly openAccountSettings: string;
      readonly pagesRouteDirectory: string;
      readonly viewAllRoutes: string;
      readonly thisIsAClearlyMarkedPlaceholderNotTheCompleted: string;
      readonly page: string;
      readonly moreIn: string;
    };
    readonly values: {};
  };
}
