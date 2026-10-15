/**
 * External controller contract for Search.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface SearchContext {
  page: number;
  query: any;
  results: any;
  shown: any;
  readonly contentConfig: {
    readonly texts: {
      readonly searchResults: string;
      readonly searchSampleResults: string;
      readonly searchResultFor: string;
      readonly text1: string;
      readonly localSampleResultsNotALiveWebSearch: string;
      readonly noMatchingResultsTryAngularOrVue: string;
    };
    readonly values: {};
  };
}
