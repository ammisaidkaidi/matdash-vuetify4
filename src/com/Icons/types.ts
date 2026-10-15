/**
 * External controller contract for Icons.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface IconsContext {
  copied: boolean;
  readonly copy: (...args: any[]) => any;
  data: any;
  readonly download: (...args: any[]) => any;
  error: string;
  readonly load: (...args: any[]) => any;
  names: any;
  page: number;
  query: string;
  selected: any;
  set: any;
  shown: any;
  readonly svg: (...args: any[]) => any;
  readonly contentConfig: {
    readonly texts: {
      readonly solar: string;
      readonly solarIcons: string;
      readonly tablerIcons: string;
      readonly solar2: string;
      readonly tabler: string;
      readonly iconLibrary: string;
      readonly locallyBundledSVGsNoExternalEmbed: string;
      readonly filterIcons: string;
      readonly text1: string;
      readonly matchingIcons: string;
      readonly retry: string;
      readonly noIconsMatchYourSearch: string;
      readonly text2: string;
      readonly iconName: string;
      readonly retainRequiredAttributionWhenUsingThisIcon: string;
      readonly close: string;
      readonly copied: string;
      readonly copyName: string;
      readonly downloadSVG: string;
    };
    readonly values: {};
  };
}
