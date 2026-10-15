/**
 * External controller contract for Combobox.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ComboboxContext {
  readonly activities: any[];
  readonly initial: (...args: any[]) => any;
  readonly model: any;
  readonly contentConfig: {
    readonly texts: {
      readonly combobox: string;
      readonly density: string;
      readonly multiple: string;
      readonly selectAFavoriteActivityOrCreateANewOne: string;
      readonly iUseChips: string;
      readonly iUseAScopedSlot: string;
      readonly iMReadonly: string;
      readonly typeANewActivityAndPressEnterToAddIt: string;
      readonly resetExamples: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
