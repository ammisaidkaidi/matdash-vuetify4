/**
 * External controller contract for Tooltips.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface TooltipsContext {
  visible: boolean;
  readonly contentConfig: {
    readonly texts: {
      readonly tooltip: string;
      readonly simple: string;
      readonly tooltip2: string;
      readonly icon: string;
      readonly toggleTolltip: string;
      readonly hideTooltip: string;
      readonly showTooltip: string;
      readonly yourShoppingCart: string;
      readonly demoCartTooltipTarget: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
