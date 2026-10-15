/**
 * External controller contract for Invoices.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface InvoicesContext {
  readonly colors: Record<string, any>;
  readonly demo: any;
  draft: any;
  existing: any;
  readonly exportInvoice: (...args: any[]) => any;
  filtered: any;
  form: any;
  readonly headers: any[];
  readonly invoiceSubtotal: (...args: any[]) => any;
  readonly invoiceTotal: (...args: any[]) => any;
  mode: any;
  readonly money: (...args: any[]) => any;
  readonly remove: (...args: any[]) => any;
  readonly required: any;
  readonly save: (...args: any[]) => any;
  search: string;
  status: string;
  title: any;
  readonly contentConfig: {
    readonly texts: {
      readonly list: string;
      readonly all: string;
      readonly total: string;
      readonly invoices: string;
      readonly searchInvoice: string;
      readonly appsInvoiceCreate: string;
      readonly newInvoice: string;
      readonly appsInvoiceDetails: string;
      readonly appsInvoiceEdit: string;
      readonly editInvoice: string;
      readonly viewInvoice: string;
      readonly deleteInvoice: string;
      readonly detail: string;
      readonly edit: string;
      readonly invoiceNotFound: string;
      readonly thisInvoiceMayHaveBeenDeletedFromTheLocalWorkspace: string;
      readonly appsInvoice: string;
      readonly backToInvoices: string;
      readonly assetsLogoDq6uoDMSvg: string;
      readonly matDash: string;
      readonly edit2: string;
      readonly addNew: string;
      readonly invoiceDetails: string;
      readonly iD: string;
      readonly date: string;
      readonly text1: string;
      readonly billFrom: string;
      readonly billTo: string;
      readonly status: string;
      readonly fromAddress: string;
      readonly billToAddress: string;
      readonly vAT: string;
      readonly use0100: string;
      readonly itemName: string;
      readonly unitPrice: string;
      readonly units: string;
      readonly totalCost: string;
      readonly text2: string;
      readonly enterAPrice: string;
      readonly useAtLeast1: string;
      readonly removeLine: string;
      readonly addItem: string;
      readonly subTotal: string;
      readonly vAT2: string;
      readonly text3: string;
      readonly grandTotal: string;
      readonly download: string;
      readonly editInvoice2: string;
      readonly backToInvoiceList: string;
      readonly create: string;
      readonly createInvoice: string;
      readonly save: string;
      readonly cancel: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
