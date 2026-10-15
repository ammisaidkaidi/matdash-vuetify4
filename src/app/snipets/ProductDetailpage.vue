<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/ProductDetail/ProductDetail.vue";
import type { ProductDetailContext } from "../../com/ProductDetail/types";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import ProductCard from "../../com/ui/ProductCard.vue";
import { demo, money, addToCart } from "../../composables/useDemoStore";
import { notify } from "../../composables/useFeedback";
const route = useRoute(),
  router = useRouter();
const product = computed(() =>
  demo.products.find((p) => p.id === Number(route.params.id)),
);
const quantity = ref(1),
  color = ref("#ff6692"),
  tab = ref("Description"),
  image = ref("");
const related = computed(() =>
  demo.products.filter((p) => p.id !== product.value?.id).slice(0, 4),
);
function add(buy = false) {
  addToCart(product.value.id, quantity.value);
  if (buy) router.push("/ecommerce/checkout");
  else notify("Added to your demo cart.");
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ProductDetailContext = __viewReactive({
  get ProductCard() {
    return __viewUnref(ProductCard);
  },
  get add() {
    return __viewUnref(add);
  },
  get color() {
    return __viewUnref(color);
  },
  set color(value: any) {
    if (__viewIsRef(color)) (color as any).value = value;
  },
  get image() {
    return __viewUnref(image);
  },
  set image(value: any) {
    if (__viewIsRef(image)) (image as any).value = value;
  },
  get money() {
    return __viewUnref(money);
  },
  get product() {
    return __viewUnref(product);
  },
  set product(value: any) {
    if (__viewIsRef(product)) (product as any).value = value;
  },
  get quantity() {
    return __viewUnref(quantity);
  },
  set quantity(value: any) {
    if (__viewIsRef(quantity)) (quantity as any).value = value;
  },
  get related() {
    return __viewUnref(related);
  },
  set related(value: any) {
    if (__viewIsRef(related)) (related as any).value = value;
  },
  get tab() {
    return __viewUnref(tab);
  },
  set tab(value: any) {
    if (__viewIsRef(tab)) (tab as any).value = value;
  },
  contentConfig: {
    texts: {
      productDetail: "Product Detail",
      preview: "Preview ",
      text1: "/",
      productGalleryView: "Product gallery view",
      success: "success",
      error: "error",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      text2: "(236 reviews)",
      colors: "Colors*",
      selectColor: "Select color ",
      quantity: "Quantity",
      decreaseQuantity: "Decrease quantity",
      text3: "−",
      increaseQuantity: "Increase quantity",
      text4: "+",
      buyNow: "Buy Now",
      addToCart: "Add To Cart",
      dispatchedIn23Weeks: " Dispatched in 2–3 weeks",
      sampleProductAndDeliveryInformation:
        "Sample product and delivery information. ",
      ecommerceEditProductId: "/ecommerce/edit-product?id=",
      editProduct: "Edit Product",
      description: "Description",
      review: "Review",
      designedForEverydayMoments: "Designed for everyday moments.",
      carefullySelectedMaterialsAndConsideredDetailsComeToget:
        " Carefully selected materials and considered details come together in a simple, dependable product. This sample description can be changed from Edit Product. ",
      aThoughtfulDesignWithAGreatFinishVeryHappyWithTheQualit:
        " A thoughtful design with a great finish. Very happy with the quality. ",
      relatedProducts: "Related Products",
      productNotFound: "Product not found",
      ecommerceProducts: "/ecommerce/products",
      backToShop: "Back to shop",
    },
    values: {
      items1: ["#ff6692", "#ffd648", "#635bff", "#16cdc7"],
      items2: ["Jennie Alvarado", "Robert Murray", "Lenora Hernandez"],
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
