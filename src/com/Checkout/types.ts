/**
 * External controller contract for Checkout.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface CheckoutContext {
  readonly asset: (...args: any[]) => any;
  readonly billing: Record<string, any>;
  readonly cartLines: any;
  readonly cartTotal: any;
  readonly demo: any;
  form: any;
  method: string;
  readonly money: (...args: any[]) => any;
  readonly next: (...args: any[]) => any;
  order: any;
  readonly place: (...args: any[]) => any;
  readonly required: any;
  step: number;
  readonly validEmail: any;
  readonly contentConfig: {
    readonly texts: {
      readonly checkout: string;
      readonly primary: string;
      readonly rail: string;
      readonly basket: string;
      readonly invoice: string;
      readonly creditcard: string;
      readonly productSummary: string;
      readonly billingInformation: string;
      readonly demoPaymentMethod: string;
      readonly demoOrder: string;
      readonly created: string;
      readonly savedLocallyNothingWasChargedOrSent: string;
      readonly ecommerceProducts: string;
      readonly continueShopping: string;
      readonly emptyShoppingCart: string;
      readonly emptyShoppingCart2: string;
      readonly cartIsEmpty: string;
      readonly goBackToShopping: string;
      readonly ecommerceProductDetail: string;
      readonly decreaseCartQuantity: string;
      readonly text1: string;
      readonly increaseCartQuantity: string;
      readonly text2: string;
      readonly remove: string;
      readonly orderSummary: string;
      readonly subtotal: string;
      readonly shipping: string;
      readonly free: string;
      readonly total: string;
      readonly continueToBilling: string;
      readonly email: string;
      readonly country: string;
      readonly back: string;
      readonly continueToPayment: string;
      readonly payment: string;
      readonly thisIsALocalCheckoutPreviewNoPaymentDetailsAreCollected: string;
      readonly invoiceOnDelivery: string;
      readonly demoCardEndingIn2102: string;
      readonly deliverTo: string;
      readonly text3: string;
      readonly orderTotal: string;
      readonly placeDemoOrder: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
      readonly items3: any[];
    };
  };
}
