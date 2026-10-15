import type { Component } from "vue";

/**
 * External controller contract for Products.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ProductsContext {
  readonly ProductCard: Component;
  categories: any[];
  filtered: any;
  gender: any[];
  readonly headers: any[];
  list: any;
  readonly money: (...args: any[]) => any;
  price: string;
  readonly priceOptions: any[];
  rating: number;
  readonly remove: (...args: any[]) => any;
  readonly reset: (...args: any[]) => any;
  search: string;
  sort: string;
  readonly contentConfig: {
    readonly texts: {
      readonly productList: string;
      readonly shop: string;
      readonly search: string;
      readonly ecommerceAddProduct: string;
      readonly addNewItem: string;
      readonly ecommerceProductDetail: string;
      readonly oct142026: string;
      readonly success: string;
      readonly error: string;
      readonly inStock: string;
      readonly outOfStock: string;
      readonly ecommerceEditProductId: string;
      readonly edit: string;
      readonly delete: string;
      readonly filterByCategory: string;
      readonly all: string;
      readonly byGender: string;
      readonly byPricing: string;
      readonly byRating: string;
      readonly resetFilters: string;
      readonly products: string;
      readonly searchProduct: string;
      readonly products2: string;
      readonly sortProducts: string;
      readonly noProductsMatchYourFilters: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
      readonly items3: any[];
    };
  };
}
