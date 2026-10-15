/**
 * External controller contract for Buttons.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ButtonsContext {
  readonly clicked: (...args: any[]) => any;
  readonly colors: any[];
  groups: any[];
  readonly iconNames: any[];
  readonly sizes: any[];
  readonly contentConfig: {
    readonly texts: {
      readonly buttons: string;
      readonly base: string;
      readonly elevated: string;
      readonly primary: string;
      readonly colors: string;
      readonly size: string;
      readonly outlined: string;
      readonly primary2: string;
      readonly secondary: string;
      readonly disabled: string;
      readonly formsFormElementsCombobox: string;
      readonly link: string;
      readonly outlinedIcon: string;
      readonly leftIcon: string;
      readonly rightIcon: string;
      readonly outlineSize: string;
      readonly textColor: string;
      readonly outlinedIconColor: string;
      readonly iconColor: string;
      readonly outlined2: string;
      readonly flat: string;
      readonly outlined3: string;
      readonly text1: string;
      readonly button: string;
      readonly sizes: string;
      readonly outlinedIconSize: string;
      readonly iconSize: string;
      readonly icon: string;
      readonly buttonGroup: string;
      readonly default: string;
      readonly text2: string;
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
