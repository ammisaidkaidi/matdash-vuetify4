/**
 * External controller contract for Menus.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface MenusContext {
  readonly choose: (...args: any[]) => any;
  location: string;
  readonly mergeProps: (...args: any[]) => any;
  popover: boolean;
  readonly contentConfig: {
    readonly texts: {
      readonly menus: string;
      readonly anchor: string;
      readonly location: string;
      readonly dropdown: string;
      readonly item: string;
      readonly hover: string;
      readonly hoverItem: string;
      readonly activatorAndTooltip: string;
      readonly openTheExampleMenu: string;
      readonly dropdownWTooltip: string;
      readonly popover: string;
      readonly menuAsPopover: string;
      readonly aLittleMoreInformation: string;
      readonly menusCanHoldMoreThanAListThisPopoverKeepsAShortPieceOfI: string;
      readonly gotIt: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
