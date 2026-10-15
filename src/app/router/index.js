import { createRouter, createWebHistory } from "vue-router";
import { batch01Loaders } from "./batch01";
import { batch02Loaders } from "./batch02";
import { batch03Loaders } from "./batch03";
import { batch04Loaders } from "./batch04";
import { batch05Loaders } from "./batch05";
import { routeCatalog } from "../../data/navigation";

const implementations = {
  ...batch01Loaders,
  ...batch02Loaders,
  ...batch03Loaders,
  ...batch04Loaders,
  ...batch05Loaders,
  "/dashboards/dashboard1": () => import("../snipets/Dashboardpage.vue"),
  "/pages/account-settings": () => import("../snipets/AccountSettingspage.vue"),
  "/pages/route-directory": () => import("../snipets/RouteDirectorypage.vue"),
};

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", redirect: "/dashboards/dashboard1" },
    ...routeCatalog.map((page) => ({
      path: page.routePath,
      name: page.path.slice(1).replaceAll("/", "-"),
      component:
        implementations[page.path] || (() => import("../snipets/QueuedPagepage.vue")),
      meta: { ...page },
    })),
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../snipets/NotFoundpage.vue"),
      meta: { title: "Page not found", category: "Others" },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.path === from.path) return false;
    if (to.hash) return { el: to.hash, top: 90, behavior: "smooth" };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = `${to.meta.title || "Dashboard"} · MatDash`;
});
