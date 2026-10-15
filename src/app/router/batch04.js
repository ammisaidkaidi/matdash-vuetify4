export const batch04Loaders = {
  "/tables/basic": () => import("../snipets/PlainTablespage.vue"),
  "/tables/dark": () => import("../snipets/PlainTablespage.vue"),
  "/tables/density": () => import("../snipets/PlainTablespage.vue"),
  "/tables/fixed-header": () => import("../snipets/PlainTablespage.vue"),
  "/tables/height": () => import("../snipets/PlainTablespage.vue"),
  "/tables/editable": () => import("../snipets/Editablepage.vue"),
  "/tables/datatables/basic": () => import("../snipets/DataTablespage.vue"),
  "/tables/datatables/header": () => import("../snipets/DataTablespage.vue"),
  "/tables/datatables/selection": () =>
    import("../snipets/DataTablespage.vue"),
  "/tables/datatables/sorting": () => import("../snipets/DataTablespage.vue"),
  "/tables/datatables/pagination": () =>
    import("../snipets/DataTablespage.vue"),
  "/tables/datatables/filtering": () =>
    import("../snipets/DataTablespage.vue"),
  "/tables/datatables/grouping": () =>
    import("../snipets/DataTablespage.vue"),
  "/tables/datatables/slots": () => import("../snipets/DataTablespage.vue"),
  "/tables/datatables/crudtable": () =>
    import("../snipets/Crudtablepage.vue"),
  "/charts/line-chart": () => import("../snipets/Chartspage.vue"),
  "/charts/gredient-chart": () => import("../snipets/Chartspage.vue"),
  "/charts/area-chart": () => import("../snipets/Chartspage.vue"),
  "/charts/candlestick-chart": () => import("../snipets/Chartspage.vue"),
  "/charts/column-chart": () => import("../snipets/Chartspage.vue"),
};
