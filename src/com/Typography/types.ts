/**
 * External controller contract for Typography.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface TypographyContext {
  readonly bodyStyles: any[];
  readonly headingSizes: any[];
  readonly text: string;
  readonly contentConfig: {
    readonly texts: {
      readonly typography: string;
      readonly heading: string;
      readonly h: string;
      readonly px: string;
      readonly heading2: string;
      readonly fontSize: string;
      readonly lineHeight: string;
      readonly fontWeight600: string;
      readonly overline: string;
      readonly uppercase: string;
      readonly text1: string;
      readonly fontWeight400: string;
      readonly defaultText: string;
      readonly text: string;
      readonly text2: string;
      readonly textAlignment: string;
      readonly leftAlignedOnAllViewportSizes: string;
      readonly centerAlignedOnAllViewportSizes: string;
      readonly rightAlignedOnAllViewportSizes: string;
      readonly left: string;
      readonly leftAlignedOnViewports: string;
      readonly orWider: string;
      readonly decoration: string;
      readonly pagesRouteDirectory: string;
      readonly nonUnderlinedLink: string;
      readonly lineThroughText: string;
      readonly overlineText: string;
      readonly underlineText: string;
      readonly opacity: string;
      readonly highEmphasisHasAnOpacityOf87InLightSkinAnd100InDark: string;
      readonly mediumEmphasisTextAndHintTextHaveOpacitiesOf60InLightSk: string;
      readonly disabledTextHasAnOpacityOf38InLightSkinAnd50InDark: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
