/**
 * External controller contract for ProductEditor.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ProductEditorContext {
  draft: any;
  editing: any;
  existing: any;
  form: any;
  readonly pick: (...args: any[]) => any;
  readonly required: any;
  readonly save: (...args: any[]) => any;
  tab: string;
  tagText: any;
  upload: any;
  readonly contentConfig: {
    readonly texts: {
      readonly editProduct: string;
      readonly addProduct: string;
      readonly productNotFound: string;
      readonly ecommerceProductlist: string;
      readonly backToProducts: string;
      readonly general: string;
      readonly advanced: string;
      readonly reviews: string;
      readonly productName: string;
      readonly aProductNameIsRequiredAndRecommendedToBeUnique: string;
      readonly description: string;
      readonly setADescriptionForBetterProductVisibility: string;
      readonly media: string;
      readonly clickToUploadAProductImage: string;
      readonly jPGOrPNGUpTo800KB: string;
      readonly pricing: string;
      readonly basePrice: string;
      readonly enterAPriceGreaterThanZero: string;
      readonly discountType: string;
      readonly noDiscount: string;
      readonly discountAmount: string;
      readonly percentage: string;
      readonly enterAValidDiscount: string;
      readonly vATAmount: string;
      readonly use0100: string;
      readonly inventoryShipping: string;
      readonly sKU: string;
      readonly stockQuantity: string;
      readonly useZeroOrMore: string;
      readonly weightKg: string;
      readonly audience: string;
      readonly inventoryIsSampleDataStoredInThisBrowser: string;
      readonly aGreatProductWithThoughtfulDetails: string;
      readonly thumbnail: string;
      readonly productThumbnail: string;
      readonly setTheProductThumbnailJPGAndPNGImagesAreAccepted: string;
      readonly status: string;
      readonly productStatus: string;
      readonly productDetails: string;
      readonly categories: string;
      readonly tagsSeparatedByCommas: string;
      readonly productTemplate: string;
      readonly saveChanges: string;
      readonly cancel: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
      readonly items3: any[];
      readonly items4: any[];
      readonly items5: any[];
      readonly items6: any[];
    };
  };
}
