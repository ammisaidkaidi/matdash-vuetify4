export const batch05Loaders = {
  "/charts/doughnut-pie-chart": () =>
    import("../snipets/CircularChartspage.vue"),
  "/charts/radialbar-chart": () =>
    import("../snipets/CircularChartspage.vue"),
  "/ui-components/alert": () => import("../snipets/Alertspage.vue"),
  "/ui-components/accordion": () => import("../snipets/Accordionpage.vue"),
  "/ui-components/avatar": () => import("../snipets/Avatarspage.vue"),
  "/ui-components/chip": () => import("../snipets/Chipspage.vue"),
  "/ui-components/dialogs": () => import("../snipets/Dialogspage.vue"),
  "/ui-components/list": () => import("../snipets/Listspage.vue"),
  "/ui-components/menus": () => import("../snipets/Menuspage.vue"),
  "/ui-components/rating": () => import("../snipets/Ratingspage.vue"),
  "/ui-components/tabs": () => import("../snipets/Tabspage.vue"),
  "/ui-components/tooltip": () => import("../snipets/Tooltipspage.vue"),
  "/ui-components/typography": () => import("../snipets/Typographypage.vue"),
  "/auth/404": () => import("../snipets/ErrorPagepage.vue"),
  "/auth/login": () => import("../snipets/Authpage.vue"),
  "/auth/login2": () => import("../snipets/Authpage.vue"),
  "/auth/register": () => import("../snipets/Authpage.vue"),
  "/auth/register2": () => import("../snipets/Authpage.vue"),
  "/auth/forgot-password": () => import("../snipets/Authpage.vue"),
  "/auth/forgot-password2": () => import("../snipets/Authpage.vue"),
};
