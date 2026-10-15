/**
 * External controller contract for Autocomplete.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface AutocompleteContext {
  readonly addresses: any[];
  caption: string;
  film: string;
  readonly films: any[];
  iconEmail: string;
  multi: any[];
  readonly contentConfig: {
    readonly texts: {
      readonly autocomplete: string;
      readonly comboBox: string;
      readonly favoriteFilm: string;
      readonly noMatchingFilms: string;
      readonly withCaption: string;
      readonly emailAddress: string;
      readonly emailAddressWithIcon: string;
      readonly comboWithMultipleOptions: string;
      readonly outlined: string;
    };
    readonly values: {};
  };
}
