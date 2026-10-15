<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Checkout/Checkout.vue";
import type { CheckoutContext } from "../../com/Checkout/types";
import { ref, reactive } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import {
  demo,
  cartLines,
  cartTotal,
  money,
  nextId,
} from "../../composables/useDemoStore";
import { required, validEmail, notify } from "../../composables/useFeedback";
import { asset } from "../../data/app-seed";
const step = ref(1),
  form = ref(null),
  order = ref(null),
  method = ref("Invoice on delivery");
const billing = reactive({
  name: "",
  email: "",
  address: "",
  city: "",
  postcode: "",
  country: "United States",
});
async function next() {
  if (step.value === 2 && !(await form.value.validate()).valid) return;
  step.value++;
}
function place() {
  if (!cartLines.value.length) return;
  const value = {
    id: nextId(demo.orders),
    total: cartTotal.value,
    items: cartLines.value.map((l) => ({
      name: l.product.name,
      price: l.product.price,
      quantity: l.quantity,
    })),
    billing: {
      ...billing,
    },
    method: method.value,
    date: new Date().toISOString(),
  };
  demo.orders.push(value);
  demo.cart = [];
  order.value = value;
  notify("Demo order created locally. No payment was charged.");
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: CheckoutContext = __viewReactive({
  get asset() {
    return __viewUnref(asset);
  },
  get billing() {
    return __viewUnref(billing);
  },
  get cartLines() {
    return __viewUnref(cartLines);
  },
  get cartTotal() {
    return __viewUnref(cartTotal);
  },
  get demo() {
    return __viewUnref(demo);
  },
  get form() {
    return __viewUnref(form);
  },
  set form(value: any) {
    if (__viewIsRef(form)) (form as any).value = value;
  },
  get method() {
    return __viewUnref(method);
  },
  set method(value: any) {
    if (__viewIsRef(method)) (method as any).value = value;
  },
  get money() {
    return __viewUnref(money);
  },
  get next() {
    return __viewUnref(next);
  },
  get order() {
    return __viewUnref(order);
  },
  set order(value: any) {
    if (__viewIsRef(order)) (order as any).value = value;
  },
  get place() {
    return __viewUnref(place);
  },
  get required() {
    return __viewUnref(required);
  },
  get step() {
    return __viewUnref(step);
  },
  set step(value: any) {
    if (__viewIsRef(step)) (step as any).value = value;
  },
  get validEmail() {
    return __viewUnref(validEmail);
  },
  contentConfig: {
    texts: {
      checkout: "Checkout",
      primary: "primary",
      rail: "rail",
      basket: "basket",
      invoice: "invoice",
      creditcard: "creditcard",
      productSummary: "Product Summary",
      billingInformation: "Billing Information",
      demoPaymentMethod: "Demo payment method",
      demoOrder: "Demo order #",
      created: " created",
      savedLocallyNothingWasChargedOrSent:
        " · Saved locally. Nothing was charged or sent. ",
      ecommerceProducts: "/ecommerce/products",
      continueShopping: "Continue Shopping",
      emptyShoppingCart: "empty-shopping-cart-",
      emptyShoppingCart2: "Empty shopping cart",
      cartIsEmpty: "Cart is Empty",
      goBackToShopping: "Go Back To Shopping",
      ecommerceProductDetail: "/ecommerce/product/detail/",
      decreaseCartQuantity: "Decrease cart quantity",
      text1: "−",
      increaseCartQuantity: "Increase cart quantity",
      text2: "+",
      remove: "Remove ",
      orderSummary: "Order Summary",
      subtotal: "Subtotal",
      shipping: "Shipping",
      free: "Free",
      total: "Total",
      continueToBilling: "Continue to Billing",
      email: "email",
      country: "Country",
      back: "Back",
      continueToPayment: "Continue to Payment",
      payment: "Payment",
      thisIsALocalCheckoutPreviewNoPaymentDetailsAreCollected:
        "This is a local checkout preview. No payment details are collected and no charges are made.",
      invoiceOnDelivery: "Invoice on delivery",
      demoCardEndingIn2102: "Demo card ending in 2102",
      deliverTo: "Deliver to ",
      text3: ", ",
      orderTotal: "Order total",
      placeDemoOrder: "Place Demo Order",
    },
    values: {
      items1: ["Item Cart", "Billing", "Payment"],
      items2: ["name", "email", "address", "city", "postcode"],
      items3: ["United States", "United Kingdom", "Algeria", "India", "France"],
    },
  },
});
</script>

<template>
  <PresentationalView :context="__viewContext">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </PresentationalView>
</template>
