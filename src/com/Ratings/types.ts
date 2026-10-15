/**
 * External controller contract for Ratings.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface RatingsContext {
  readonly mdiCircle: any;
  readonly mdiCircleHalfFull: any;
  readonly mdiCircleOutline: any;
  readonly mdiHeart: any;
  readonly mdiHeartHalfFull: any;
  readonly mdiHeartOutline: any;
  readonly ratings: Record<string, any>;
  readonly contentConfig: {
    readonly texts: {
      readonly rating: string;
      readonly basic: string;
      readonly text1: string;
      readonly readOnly: string;
      readonly clearable: string;
      readonly clickTheCurrentRatingAgainToClear: string;
      readonly hover: string;
      readonly halfRatting: string;
      readonly length: string;
      readonly label: string;
      readonly sad: string;
      readonly happy: string;
      readonly icons: string;
      readonly size: string;
    };
    readonly values: {
      readonly itemlabels1: any[];
      readonly items2: any[];
    };
  };
}
