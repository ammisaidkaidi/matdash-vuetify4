import { reactive, ref, watch, computed } from "vue";
import { appSeed } from "../data/app-seed";
const key = "matdash-apps-v1";
export const clone = (v) => JSON.parse(JSON.stringify(v));
let initial = clone(appSeed);
try {
  const saved = JSON.parse(localStorage.getItem(key) || "null");
  if (saved?.version === 1)
    for (const field of Object.keys(initial))
      if (saved.data[field] !== undefined) initial[field] = saved.data[field];
} catch {}
export const demo = reactive(initial);
export const storageError = ref("");
let timer;
watch(
  demo,
  () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify({ version: 1, data: demo }));
        storageError.value = "";
      } catch {
        storageError.value =
          "Browser storage is unavailable or full. Recent changes remain in memory only.";
      }
    }, 180);
  },
  { deep: true },
);
export const nextId = (items) =>
  Math.max(0, ...items.map((i) => Number(i.id) || 0)) + 1;
export const money = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(n) || 0,
  );
export const cartLines = computed(() =>
  demo.cart
    .map((line) => ({
      ...line,
      product: demo.products.find((p) => p.id === line.productId),
    }))
    .filter((line) => line.product),
);
export const cartCount = computed(() =>
  demo.cart.reduce((sum, line) => sum + line.quantity, 0),
);
export const cartTotal = computed(() =>
  cartLines.value.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  ),
);
export function addToCart(productId, quantity = 1) {
  const item = demo.cart.find((i) => i.productId === productId);
  if (item) item.quantity += quantity;
  else demo.cart.push({ productId, quantity });
}
export const invoiceSubtotal = (invoice) =>
  invoice.items.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.quantity),
    0,
  );
export const invoiceTotal = (invoice) =>
  invoiceSubtotal(invoice) * (1 + Number(invoice.vat || 0) / 100);
export function downloadText(name, text, type = "text/plain") {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 500);
}
