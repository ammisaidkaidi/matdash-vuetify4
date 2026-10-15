import type { Component } from "vue";

/**
 * External controller contract for ProductDetail.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ProductDetailContext {
  readonly ProductCard: Component;
  readonly add: (...args: any[]) => any;
  color: string;
  image: string;
  readonly money: (...args: any[]) => any;
  product: any;
  quantity: number;
  related: any;
  tab: string;
  readonly contentConfig: {
    readonly texts: {
      readonly productDetail: string;
      readonly preview: string;
      readonly text1: string;
      readonly productGalleryView: string;
      readonly success: string;
      readonly error: string;
      readonly inStock: string;
      readonly outOfStock: string;
      readonly text2: string;
      readonly colors: string;
      readonly selectColor: string;
      readonly quantity: string;
      readonly decreaseQuantity: string;
      readonly text3: string;
      readonly increaseQuantity: string;
      readonly text4: string;
      readonly buyNow: string;
      readonly addToCart: string;
      readonly dispatchedIn23Weeks: string;
      readonly sampleProductAndDeliveryInformation: string;
      readonly ecommerceEditProductId: string;
      readonly editProduct: string;
      readonly description: string;
      readonly review: string;
      readonly designedForEverydayMoments: string;
      readonly carefullySelectedMaterialsAndConsideredDetailsComeToget: string;
      readonly aThoughtfulDesignWithAGreatFinishVeryHappyWithTheQualit: string;
      readonly relatedProducts: string;
      readonly productNotFound: string;
      readonly ecommerceProducts: string;
      readonly backToShop: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
