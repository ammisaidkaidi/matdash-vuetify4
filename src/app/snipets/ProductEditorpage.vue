<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/ProductEditor/ProductEditor.vue";
import type { ProductEditorContext } from "../../com/ProductEditor/types";
import { ref } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import { demo, nextId, clone, money } from "../../composables/useDemoStore";
import { notify, required, confirmDemo } from "../../composables/useFeedback";
import { asset } from "../../data/app-seed";
const route = useRoute(),
  router = useRouter(),
  editing = route.path.endsWith("edit-product");
const existing = editing
  ? demo.products.find((p) => p.id === Number(route.query.id || 12))
  : null;
const empty = {
  name: "",
  description: "",
  price: 0,
  basePrice: 0,
  oldPrice: 0,
  category: "Electronics",
  gender: "All",
  status: "Published",
  stock: 25,
  rating: 4,
  image: asset("preview-img-"),
  sku: "",
  tags: [],
  tax: 10,
  discountType: "No Discount",
  discount: 0,
  template: "Default",
  weight: 0.5,
};
const draft = ref(clone(existing || empty));
draft.value.basePrice = existing?.basePrice ?? existing?.price ?? 0;
const initial = JSON.stringify(draft.value);
let saved = false;
const tab = ref("General"),
  form = ref(null),
  upload = ref(null),
  tagText = ref((draft.value.tags || []).join(", "));
async function pick(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  if (
    !["image/jpeg", "image/png"].includes(file.type) ||
    file.size > 800 * 1024
  ) {
    notify("Choose a JPG or PNG no larger than 800 KB.", "error");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => (draft.value.image = reader.result);
  reader.readAsDataURL(file);
}
async function save() {
  if (!(await form.value.validate()).valid) return;
  if (!draft.value.name.trim() || Number(draft.value.basePrice) <= 0) {
    tab.value = "General";
    return notify(
      "Enter a product name and a price greater than zero.",
      "error",
    );
  }
  const p = clone(draft.value);
  p.tags = tagText.value
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  p.oldPrice = Number(p.basePrice);
  p.price =
    p.discountType === "Percentage %"
      ? p.basePrice * (1 - Number(p.discount) / 100)
      : p.discountType === "Fixed Price"
        ? Math.max(0, p.basePrice - Number(p.discount))
        : Number(p.basePrice);
  p.price = Math.round(p.price * 100) / 100;
  p.date = new Date().toISOString().slice(0, 10);
  if (editing && existing)
    demo.products.splice(
      demo.products.findIndex((x) => x.id === existing.id),
      1,
      p,
    );
  else {
    p.id = nextId(demo.products);
    demo.products.push(p);
  }
  saved = true;
  notify("Product saved locally.");
  router.push("/ecommerce/productlist");
}
onBeforeRouteLeave(
  async () =>
    saved ||
    JSON.stringify(draft.value) === initial ||
    (await confirmDemo("Discard unsaved product changes?")),
);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ProductEditorContext = __viewReactive({
  get draft() {
    return __viewUnref(draft);
  },
  set draft(value: any) {
    if (__viewIsRef(draft)) (draft as any).value = value;
  },
  get editing() {
    return __viewUnref(editing);
  },
  set editing(value: any) {
    if (__viewIsRef(editing)) (editing as any).value = value;
  },
  get existing() {
    return __viewUnref(existing);
  },
  set existing(value: any) {
    if (__viewIsRef(existing)) (existing as any).value = value;
  },
  get form() {
    return __viewUnref(form);
  },
  set form(value: any) {
    if (__viewIsRef(form)) (form as any).value = value;
  },
  get pick() {
    return __viewUnref(pick);
  },
  get required() {
    return __viewUnref(required);
  },
  get save() {
    return __viewUnref(save);
  },
  get tab() {
    return __viewUnref(tab);
  },
  set tab(value: any) {
    if (__viewIsRef(tab)) (tab as any).value = value;
  },
  get tagText() {
    return __viewUnref(tagText);
  },
  set tagText(value: any) {
    if (__viewIsRef(tagText)) (tagText as any).value = value;
  },
  get upload() {
    return __viewUnref(upload);
  },
  set upload(value: any) {
    if (__viewIsRef(upload)) (upload as any).value = value;
  },
  contentConfig: {
    texts: {
      editProduct: "Edit Product",
      addProduct: "Add Product",
      productNotFound: "Product not found",
      ecommerceProductlist: "/ecommerce/productlist",
      backToProducts: "Back to products",
      general: "General",
      advanced: "Advanced",
      reviews: "Reviews",
      productName: "Product Name *",
      aProductNameIsRequiredAndRecommendedToBeUnique:
        " A product name is required and recommended to be unique. ",
      description: "Description",
      setADescriptionForBetterProductVisibility:
        " Set a description for better product visibility. ",
      media: "Media",
      clickToUploadAProductImage: "Click to upload a product image",
      jPGOrPNGUpTo800KB: "JPG or PNG · up to 800 KB",
      pricing: "Pricing",
      basePrice: "Base Price *",
      enterAPriceGreaterThanZero: "Enter a price greater than zero",
      discountType: "Discount Type",
      noDiscount: "No Discount",
      discountAmount: "Discount amount",
      percentage: "Percentage %",
      enterAValidDiscount: "Enter a valid discount",
      vATAmount: "VAT Amount (%)",
      use0100: "Use 0–100%",
      inventoryShipping: "Inventory & Shipping",
      sKU: "SKU",
      stockQuantity: "Stock quantity",
      useZeroOrMore: "Use zero or more",
      weightKg: "Weight (kg)",
      audience: "Audience",
      inventoryIsSampleDataStoredInThisBrowser:
        " Inventory is sample data stored in this browser. ",
      aGreatProductWithThoughtfulDetails:
        "A great product with thoughtful details.",
      thumbnail: "Thumbnail",
      productThumbnail: "Product thumbnail",
      setTheProductThumbnailJPGAndPNGImagesAreAccepted:
        " Set the product thumbnail. JPG and PNG images are accepted. ",
      status: "Status",
      productStatus: "Product status",
      productDetails: "Product Details",
      categories: "Categories",
      tagsSeparatedByCommas: "Tags, separated by commas",
      productTemplate: "Product Template",
      saveChanges: "Save Changes",
      cancel: "Cancel",
    },
    values: {
      items1: ["No Discount", "Percentage %", "Fixed Price"],
      items2: ["All", "Male", "Female", "Kids"],
      items3: ["Jennie Alvarado", "Robert Murray"],
      items4: ["Published", "Draft", "Archived"],
      items5: ["Kitchen", "Electronics", "Books", "Fashion", "Toys", "Beauty"],
      items6: ["Default", "Office Stationary", "Digital Product"],
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
