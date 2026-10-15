/**
 * External controller contract for RouteDirectory.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface RouteDirectoryContext {
  byCategory: any;
  readonly categories: any[];
  category: string;
  filtered: any;
  query: string;
  ready: any;
  readonly routeCatalog: any;
  status: string;
  readonly contentConfig: {
    readonly texts: {
      readonly routeDirectory: string;
      readonly mATDASHBUILDPROGRESS: string;
      readonly oneWorkspaceEveryRouteConnected: string;
      readonly allOriginalSidebarDestinationsNowOpenLocallyFollowTheSt: string;
      readonly mappedRoutes: string;
      readonly localNavigationWithVueRouter: string;
      readonly readyPages: string;
      readonly implementedFrontEndPagesAcrossCompletedBatches: string;
      readonly queuedPages: string;
      readonly explicitPlaceholdersNotFinishedRecreations: string;
      readonly findARoute: string;
      readonly searchPagesOrPaths: string;
      readonly filterRouteCategory: string;
      readonly filterRouteStatus: string;
      readonly routesFoundReadyRefersToTheFrontEndDemoNoBackendIsConne: string;
      readonly ready: string;
      readonly success: string;
      readonly primary: string;
      readonly ready2: string;
      readonly queued: string;
      readonly noMatchingRoutes: string;
      readonly tryADifferentPageNameCategoryOrStatus: string;
      readonly text1: string;
      readonly allCategories: string;
      readonly allStatuses: string;
      readonly clearFilters: string;
    };
    readonly values: {
      readonly items1: any[];
    };
  };
}
