/**
 * External controller contract for Select.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface SelectContext {
  readonly items: any[];
  readonly model: Record<string, any>;
  readonly contentConfig: {
    readonly texts: {
      readonly select: string;
      readonly basic: string;
      readonly selectItem: string;
      readonly readOnly: string;
      readonly readOnlyItem: string;
      readonly multiple: string;
      readonly selectMultiple: string;
      readonly pickYourFavoriteStates: string;
      readonly chips: string;
      readonly selectRegions: string;
      readonly whatAreTheTargetRegions: string;
      readonly density: string;
    };
    readonly values: {
      readonly items1: any[];
    };
  };
}
