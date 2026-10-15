<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Products/Products.vue";
import type { ProductsContext } from "../../com/Products/types";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import ProductCard from "../../com/ui/ProductCard.vue";
import { demo, money } from "../../composables/useDemoStore";
import { confirmDemo } from "../../composables/useFeedback";
const list = useRoute().path.endsWith("productlist");
const search = ref(""),
  categories = ref([]),
  gender = ref([]),
  price = ref("All prices"),
  rating = ref(0),
  sort = ref("Price: low to high");
const priceOptions = [
  "All prices",
  "$10 - $50",
  "$50 - $100",
  "$100 - $150",
  "$150 - $200",
  "Over $200",
];
const filtered = computed(() => {
  let p = demo.products.filter((p) =>
    (p.name + " " + p.category)
      .toLowerCase()
      .includes((search.value || "").toLowerCase()),
  );
  if (!list) {
    p = p.filter(
      (p) =>
        (!categories.value.length || categories.value.includes(p.category)) &&
        (!gender.value.length || gender.value.includes(p.gender)) &&
        p.rating >= rating.value,
    );
    const index = priceOptions.indexOf(price.value);
    if (index > 0)
      p = p.filter((p) =>
        index === 5
          ? p.price > 200
          : p.price >= (index - 1) * 50 && p.price <= index * 50,
      );
    p.sort((a, b) =>
      sort.value === "Name"
        ? a.name.localeCompare(b.name)
        : sort.value === "Price: high to low"
          ? b.price - a.price
          : a.price - b.price,
    );
  }
  return p;
});
const headers = [
  {
    title: "Product Image",
    key: "name",
  },
  {
    title: "Category",
    key: "category",
  },
  {
    title: "Date",
    key: "date",
  },
  {
    title: "Status",
    key: "stock",
  },
  {
    title: "Price",
    key: "price",
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
  },
];
function reset() {
  categories.value = [];
  gender.value = [];
  price.value = "All prices";
  rating.value = 0;
  search.value = "";
}
async function remove(p) {
  if (await confirmDemo("Delete " + p.name + "?")) {
    demo.products = demo.products.filter((x) => x.id !== p.id);
    demo.cart = demo.cart.filter((x) => x.productId !== p.id);
  }
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ProductsContext = __viewReactive({
  get ProductCard() {
    return __viewUnref(ProductCard);
  },
  get categories() {
    return __viewUnref(categories);
  },
  set categories(value: any) {
    if (__viewIsRef(categories)) (categories as any).value = value;
  },
  get filtered() {
    return __viewUnref(filtered);
  },
  set filtered(value: any) {
    if (__viewIsRef(filtered)) (filtered as any).value = value;
  },
  get gender() {
    return __viewUnref(gender);
  },
  set gender(value: any) {
    if (__viewIsRef(gender)) (gender as any).value = value;
  },
  get headers() {
    return __viewUnref(headers);
  },
  get list() {
    return __viewUnref(list);
  },
  set list(value: any) {
    if (__viewIsRef(list)) (list as any).value = value;
  },
  get money() {
    return __viewUnref(money);
  },
  get price() {
    return __viewUnref(price);
  },
  set price(value: any) {
    if (__viewIsRef(price)) (price as any).value = value;
  },
  get priceOptions() {
    return __viewUnref(priceOptions);
  },
  get rating() {
    return __viewUnref(rating);
  },
  set rating(value: any) {
    if (__viewIsRef(rating)) (rating as any).value = value;
  },
  get remove() {
    return __viewUnref(remove);
  },
  get reset() {
    return __viewUnref(reset);
  },
  get search() {
    return __viewUnref(search);
  },
  set search(value: any) {
    if (__viewIsRef(search)) (search as any).value = value;
  },
  get sort() {
    return __viewUnref(sort);
  },
  set sort(value: any) {
    if (__viewIsRef(sort)) (sort as any).value = value;
  },
  contentConfig: {
    texts: {
      productList: "Product List",
      shop: "Shop",
      search: "Search",
      ecommerceAddProduct: "/ecommerce/add-product",
      addNewItem: "Add New Item",
      ecommerceProductDetail: "/ecommerce/product/detail/",
      oct142026: "Oct 14, 2026",
      success: "success",
      error: "error",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      ecommerceEditProductId: "/ecommerce/edit-product?id=",
      edit: "Edit ",
      delete: "Delete ",
      filterByCategory: "Filter by Category",
      all: "All",
      byGender: "By Gender",
      byPricing: "By Pricing",
      byRating: "By Rating",
      resetFilters: "Reset Filters",
      products: "Products",
      searchProduct: "Search Product",
      products2: " products",
      sortProducts: "Sort products",
      noProductsMatchYourFilters: "No products match your filters",
    },
    values: {
      items1: ["Kitchen", "Electronics", "Books", "Fashion", "Toys", "Beauty"],
      items2: ["Male", "Female", "Kids"],
      items3: ["Price: low to high", "Price: high to low", "Name"],
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
