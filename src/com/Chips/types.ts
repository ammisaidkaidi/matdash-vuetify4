/**
 * External controller contract for Chips.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ChipsContext {
  readonly avatar: (...args: any[]) => any;
  readonly colors: any[];
  hidden: any[];
  readonly mdiCheck: any;
  readonly remove: (...args: any[]) => any;
  readonly rows: any[];
  readonly contentConfig: {
    readonly texts: {
      readonly chip: string;
      readonly tonal: string;
      readonly filled: string;
      readonly outlined: string;
      readonly primary: string;
      readonly primary2: string;
      readonly secondary: string;
      readonly secondary2: string;
      readonly default: string;
      readonly filled2: string;
      readonly delete: string;
      readonly chip2: string;
      readonly deletable: string;
      readonly customOutlinedIcon: string;
      readonly customIcon: string;
      readonly outlined2: string;
      readonly disabled: string;
      readonly sizes: string;
      readonly default2: string;
      readonly closable: string;
      readonly chip3: string;
      readonly closeChipsIndividuallyThenRestoreTheExamples: string;
      readonly resetChips: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
      readonly items3: any[];
      readonly items4: any[];
      readonly items5: any[];
    };
  };
}
