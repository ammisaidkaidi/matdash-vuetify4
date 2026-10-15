<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Invoices/Invoices.vue";
import type { InvoicesContext } from "../../com/Invoices/types";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import {
  demo,
  nextId,
  clone,
  money,
  invoiceSubtotal,
  invoiceTotal,
  downloadText,
} from "../../composables/useDemoStore";
import { notify, confirmDemo, required } from "../../composables/useFeedback";
const route = useRoute(),
  router = useRouter();
const mode = route.path.includes("/details/")
  ? "detail"
  : route.path.includes("/edit/")
    ? "edit"
    : route.path.endsWith("/create")
      ? "create"
      : "list";
const existing = demo.invoices.find((i) => i.id === Number(route.params.id));
const form = ref(null),
  search = ref(""),
  status = ref("All");
const draft = ref(
  clone(
    existing || {
      id: nextId(demo.invoices),
      from: "",
      to: "",
      fromAddress: "",
      toAddress: "",
      fromEmail: "",
      toEmail: "",
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      vat: 10,
      items: [
        {
          name: "",
          price: 0,
          quantity: 1,
        },
      ],
    },
  ),
);
const title = {
  list: "Invoice List",
  detail: "Invoice Details",
  edit: "Edit Invoice",
  create: "Create Invoice",
}[mode];
const colors = {
  All: "primary",
  Shipped: "success",
  Delivered: "secondary",
  Pending: "warning",
};
const filtered = computed(() =>
  demo.invoices.filter(
    (i) => status.value === "All" || i.status === status.value,
  ),
);
const headers = [
  {
    title: "ID",
    key: "id",
  },
  {
    title: "BILL FROM",
    key: "from",
  },
  {
    title: "BILL TO",
    key: "to",
  },
  {
    title: "TOTAL COST",
    key: "total",
  },
  {
    title: "STATUS",
    key: "status",
  },
  {
    title: "ACTION",
    key: "actions",
    sortable: false,
  },
];
async function save() {
  if (!(await form.value.validate()).valid) return;
  if (!draft.value.items.length)
    return notify("Add at least one line item.", "error");
  if (mode === "edit")
    demo.invoices.splice(
      demo.invoices.findIndex((i) => i.id === draft.value.id),
      1,
      clone(draft.value),
    );
  else demo.invoices.push(clone(draft.value));
  notify("Invoice saved locally.");
  router.push("/apps/invoice/details/" + draft.value.id);
}
async function remove(i) {
  if (await confirmDemo("Delete invoice #" + i.id + "?"))
    demo.invoices = demo.invoices.filter((x) => x.id !== i.id);
}
function exportInvoice() {
  const i = draft.value;
  downloadText(
    `invoice-${i.id}.txt`,
    `INVOICE #${i.id}\n${i.date}\n\nBill from: ${i.from}\n${i.fromAddress}\nBill to: ${i.to}\n${i.toAddress}\n\n${i.items.map((l) => `${l.name}: ${l.quantity} x ${money(l.price)} = ${money(l.price * l.quantity)}`).join("\n")}\n\nSubtotal: ${money(invoiceSubtotal(i))}\nVAT: ${i.vat}%\nTotal: ${money(invoiceTotal(i))}\n\nLocal demo invoice — not sent.`,
  );
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: InvoicesContext = __viewReactive({
  get colors() {
    return __viewUnref(colors);
  },
  get demo() {
    return __viewUnref(demo);
  },
  get draft() {
    return __viewUnref(draft);
  },
  set draft(value: any) {
    if (__viewIsRef(draft)) (draft as any).value = value;
  },
  get existing() {
    return __viewUnref(existing);
  },
  set existing(value: any) {
    if (__viewIsRef(existing)) (existing as any).value = value;
  },
  get exportInvoice() {
    return __viewUnref(exportInvoice);
  },
  get filtered() {
    return __viewUnref(filtered);
  },
  set filtered(value: any) {
    if (__viewIsRef(filtered)) (filtered as any).value = value;
  },
  get form() {
    return __viewUnref(form);
  },
  set form(value: any) {
    if (__viewIsRef(form)) (form as any).value = value;
  },
  get headers() {
    return __viewUnref(headers);
  },
  get invoiceSubtotal() {
    return __viewUnref(invoiceSubtotal);
  },
  get invoiceTotal() {
    return __viewUnref(invoiceTotal);
  },
  get mode() {
    return __viewUnref(mode);
  },
  set mode(value: any) {
    if (__viewIsRef(mode)) (mode as any).value = value;
  },
  get money() {
    return __viewUnref(money);
  },
  get remove() {
    return __viewUnref(remove);
  },
  get required() {
    return __viewUnref(required);
  },
  get save() {
    return __viewUnref(save);
  },
  get search() {
    return __viewUnref(search);
  },
  set search(value: any) {
    if (__viewIsRef(search)) (search as any).value = value;
  },
  get status() {
    return __viewUnref(status);
  },
  set status(value: any) {
    if (__viewIsRef(status)) (status as any).value = value;
  },
  get title() {
    return __viewUnref(title);
  },
  set title(value: any) {
    if (__viewIsRef(title)) (title as any).value = value;
  },
  contentConfig: {
    texts: {
      list: "list",
      all: "All",
      total: "Total",
      invoices: " invoices",
      searchInvoice: "Search Invoice",
      appsInvoiceCreate: "/apps/invoice/create",
      newInvoice: "New Invoice",
      appsInvoiceDetails: "/apps/invoice/details/",
      appsInvoiceEdit: "/apps/invoice/edit/",
      editInvoice: "Edit invoice ",
      viewInvoice: "View invoice ",
      deleteInvoice: "Delete invoice ",
      detail: "detail",
      edit: "edit",
      invoiceNotFound: "Invoice not found",
      thisInvoiceMayHaveBeenDeletedFromTheLocalWorkspace:
        " This invoice may have been deleted from the local workspace. ",
      appsInvoice: "/apps/invoice",
      backToInvoices: "Back to invoices",
      assetsLogoDq6uoDMSvg: "/assets/logo-Dq6uoD-m.svg",
      matDash: "MatDash",
      edit2: "Edit",
      addNew: "Add New",
      invoiceDetails: " Invoice Details",
      iD: " ID: ",
      date: "Date: ",
      text1: "# ",
      billFrom: "Bill From",
      billTo: "Bill To",
      status: "Status",
      fromAddress: "From Address",
      billToAddress: "Bill To Address",
      vAT: "VAT (%)",
      use0100: "Use 0–100%",
      itemName: "Item Name",
      unitPrice: "Unit Price",
      units: "Units",
      totalCost: "Total Cost",
      text2: "",
      enterAPrice: "Enter a price",
      useAtLeast1: "Use at least 1",
      removeLine: "Remove line",
      addItem: "Add Item",
      subTotal: "Sub Total:",
      vAT2: "VAT (",
      text3: "%):",
      grandTotal: "Grand Total:",
      download: "Download",
      editInvoice2: "Edit Invoice",
      backToInvoiceList: "Back To Invoice List",
      create: "create",
      createInvoice: "Create Invoice",
      save: "Save",
      cancel: "Cancel",
    },
    values: {
      items1: ["All", "Shipped", "Delivered", "Pending"],
      items2: ["Shipped", "Delivered", "Pending"],
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
