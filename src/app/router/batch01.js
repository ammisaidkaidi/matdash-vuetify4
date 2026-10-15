// Batch 1: shared implementations for twenty reference routes.
export const batch01Loaders = {
  "/ecommerce/products": () => import("../snipets/Productspage.vue"),
  "/ecommerce/productlist": () => import("../snipets/Productspage.vue"),
  "/ecommerce/product/detail/1": () =>
    import("../snipets/ProductDetailpage.vue"),
  "/ecommerce/add-product": () => import("../snipets/ProductEditorpage.vue"),
  "/ecommerce/edit-product": () => import("../snipets/ProductEditorpage.vue"),
  "/ecommerce/checkout": () => import("../snipets/Checkoutpage.vue"),
  "/apps/invoice": () => import("../snipets/Invoicespage.vue"),
  "/apps/invoice/details/102": () => import("../snipets/Invoicespage.vue"),
  "/apps/invoice/create": () => import("../snipets/Invoicespage.vue"),
  "/apps/invoice/edit/102": () => import("../snipets/Invoicespage.vue"),
  "/apps/calendar": () => import("../snipets/Calendarpage.vue"),
  "/apps/email": () => import("../snipets/Emailpage.vue"),
  "/apps/chats": () => import("../snipets/Chatspage.vue"),
  "/apps/notes": () => import("../snipets/Notespage.vue"),
  "/apps/kanban": () => import("../snipets/Kanbanpage.vue"),
  "/apps/contacts": () => import("../snipets/Contactspage.vue"),
  "/apps/tickets": () => import("../snipets/Ticketspage.vue"),
  "/apps/blog/posts": () => import("../snipets/Blogpage.vue"),
  "/apps/blog/early-black-friday-amazon-deals-cheap-tvs-headphones": () =>
    import("../snipets/Blogpage.vue"),
  "/apps/user/profile": () => import("../snipets/Profilepage.vue"),
};
