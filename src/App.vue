<script setup>
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useDisplay, useTheme } from "vuetify";
import { useRoute, useRouter } from "vue-router";
import AppFeedback from "./com/ui/AppFeedback.vue";
import NavigationItem from "./com/ui/NavigationItem.vue";
import { demoSignedIn, clearDemoSession } from "./composables/useDemoAuth";
import { cartCount, cartTotal, money } from "./composables/useDemoStore";
import groups from "../builtin/assets/AppSitemap.V2.json";
import { routeCatalog } from "./data/navigation";
import { productSets } from "./data/dashboard";

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */
const DASHBOARD_PATH = "/dashboards/dashboard1";
const THEME_KEY = "matdash-theme";
const PROFILE_KEY = "matdash-account-settings-v1";
const DEFAULT_ACCENT = "#635bff";
const ACCENTS = [DEFAULT_ACCENT, "#0074ba", "#763ebd", "#008f84"];
const MAX_SEARCH_RESULTS = 30;
const FRONT_PAGES = new Set([
  "/front-page/contact-us",
  "/front-page/homepage",
  "/front-page/about-us",
]);

/* -------------------------------------------------------------------------- */
/* Safe localStorage helpers (private mode / blocked storage)                 */
/* -------------------------------------------------------------------------- */
function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}
function readJson(key) {
  try {
    return JSON.parse(readStorage(key));
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Framework state                                                            */
/* -------------------------------------------------------------------------- */
const { mdAndUp } = useDisplay();
const theme = useTheme();
const route = useRoute();
const router = useRouter();

const dark = computed(() => theme.current.value.dark);
const themeLabel = computed(() =>
  dark.value ? "Switch to light mode" : "Switch to dark mode",
);

// Restored synchronously during setup so the first paint is already correct
// (no light -> dark flash). If you ever add SSR, move this back to onMounted.
if (readStorage(THEME_KEY) === "dark") theme.change("dark");

function setDark(value) {
  if (dark.value === value) return;
  const name = value ? "dark" : "light";
  theme.change(name);
  writeStorage(THEME_KEY, name);
}
const toggleTheme = () => setDark(!dark.value);

/* -------------------------------------------------------------------------- */
/* Page type                                                                  */
/* -------------------------------------------------------------------------- */
const isFrontPage = computed(
  () =>
    FRONT_PAGES.has(route.path) || route.path.startsWith("/front-page/blog/"),
);
const isAuthPage = computed(
  () => route.path.startsWith("/auth/") && route.meta.status === "ready",
);
const standalone = computed(() => isFrontPage.value || isAuthPage.value);
const canvasClass = computed(() =>
  standalone.value
    ? "front-canvas"
    : ["dashboard-canvas", { "page-canvas": route.path !== DASHBOARD_PATH }],
);
const viewKey = computed(() => route.path + (route.query.id || ""));

/* -------------------------------------------------------------------------- */
/* Account                                                                    */
/* -------------------------------------------------------------------------- */
const accountProfile = ref(
  readJson(PROFILE_KEY)?.data?.account || {
    name: "David",
    avatar: "/assets/user-1-4oeL4QIr.jpg",
  },
);
const updateProfile = (event) => {
  accountProfile.value = event.detail;
};
function demoLogout() {
  clearDemoSession();
  router.push("/auth/login");
}

/* -------------------------------------------------------------------------- */
/* UI state                                                                   */
/* -------------------------------------------------------------------------- */
const dashboard = ref(null);
const openedGroups = ref([]);
const sidebar = ref(mdAndUp.value);
const searchOpen = ref(false);
const search = ref("");
const settingsOpen = ref(false);
const compact = ref(false);
const bordered = ref(false);
const accent = ref(DEFAULT_ACCENT);
const unread = ref(true);
const snack = ref(false);
const snackText = ref("");

const notice = (text) => {
  snackText.value = text;
  snack.value = true;
};

/* -------------------------------------------------------------------------- */
/* Static data — built once, never re-created on render                       */
/* -------------------------------------------------------------------------- */
const categoryNames = Object.keys(groups);
const defaultCategory = categoryNames[0] ?? "";

// The JSON controls category names/order and every sidebar group/item.
// It has no rail-specific icons, so retain the existing presentation presets.
const categoryIcons = {
  Dashboards: "layers",
  Pages: "notes",
  Forms: "palette",
  Tables: "table",
  Charts: "chart",
  "UI Components": "grid",
  Authentication: "lock",
  Others: "panel",
};
const categories = categoryNames.map((name) => ({
  name,
  icon: categoryIcons[name] || groups[name]?.[0]?.items?.[0]?.icon || "folder",
}));

const sections = [
  { name: "Revenue Forecast", id: "revenue", icon: "layers" },
  { name: "Your Performance", id: "performance", icon: "store" },
  { name: "Customers", id: "customers", icon: "chart" },
  { name: "Sales Overview", id: "sales", icon: "trending" },
  { name: "Revenue by Product", id: "products", icon: "grid" },
  { name: "Total settlements", id: "settlements", icon: "package" },
];

const notifications = [
  {
    title: "Your weekly report is ready",
    text: "Revenue is up 26.5% from last week.",
    icon: "chart",
    time: "5 minutes ago",
  },
  {
    title: "64 new orders received",
    text: "Your latest orders are being processed.",
    icon: "store",
    time: "18 minutes ago",
  },
  {
    title: "Settlement completed",
    text: "Your account balance has been updated.",
    icon: "package",
    time: "1 hour ago",
  },
];

/* -------------------------------------------------------------------------- */
/* Sidebar navigation                                                         */
/* -------------------------------------------------------------------------- */
// path -> [{ category, ancestors, order }]. Built once by walking the sitemap,
// so resolving the active item on a route change is a Map lookup instead of a
// recursive scan of the whole tree. `order` is the original traversal order.
const navIndex = (() => {
  const index = new Map();
  let order = 0;
  const walk = (items, category, trail, level) => {
    for (const item of items) {
      if (item.children) {
        walk(item.children, category, [...trail, `${item.name}-${level}`], level + 1);
      } else if (item.path) {
        const hits = index.get(item.path);
        const hit = { category, ancestors: trail, order: order++ };
        if (hits) hits.push(hit);
        else index.set(item.path, [hit]);
      }
    }
  };
  for (const category of categoryNames) {
    for (const group of groups[category]) walk(group.items, category, [], 0);
  }
  return index;
})();

const category = ref(defaultCategory);
const currentGroups = computed(() => groups[category.value] ?? []);

function syncNavigation() {
  const { category: preferred, path: metaPath } = route.meta;
  const hasPreferred = categoryNames.includes(preferred);

  const hits = [
    ...(navIndex.get(route.path) ?? []),
    ...(navIndex.get(metaPath) ?? []),
  ];
  // Route metadata only breaks ties when a path lives in several categories.
  const inPreferred = hasPreferred
    ? hits.filter((h) => h.category === preferred)
    : [];
  const pool = inPreferred.length ? inPreferred : hits;
  const hit = pool.reduce((a, b) => (!a || b.order < a.order ? b : a), null);

  category.value = hit?.category ?? (hasPreferred ? preferred : defaultCategory);
  openedGroups.value = hit ? [...hit.ancestors] : [];
  if (!mdAndUp.value) sidebar.value = false;
}
watch(() => route.path, syncNavigation, { immediate: true });
watch(mdAndUp, (value) => (sidebar.value = value));

function chooseCategory(name) {
  if (!categoryNames.includes(name)) return;
  category.value = name;
  sidebar.value = true;
}
const closeSidebarOnMobile = () => {
  if (!mdAndUp.value) sidebar.value = false;
};

/* -------------------------------------------------------------------------- */
/* Search                                                                     */
/* -------------------------------------------------------------------------- */
const pages = routeCatalog.map(({ title, path, icon, status }) => ({
  name: title,
  path,
  icon,
  status,
}));
const productEntries = Object.keys(productSets).map((name) => ({
  name: `${name} projects`,
  id: "products",
  icon: "folder",
  tab: name,
}));

// Lower-cased once, instead of on every keystroke for every item.
const searchIndex = [...pages, ...sections, ...productEntries].map((item) => ({
  item,
  name: (item.name ?? "").toLowerCase(),
  path: item.path?.toLowerCase() ?? "",
}));

const defaultResults = [
  pages.find((p) => p.path === "/pages/account-settings"),
  pages.find((p) => p.path === "/pages/route-directory"),
  ...sections,
].filter(Boolean);

const searchResults = computed(() => {
  const query = search.value.trim().toLowerCase();
  if (!query) return defaultResults;
  const results = [];
  for (const entry of searchIndex) {
    if (entry.name.includes(query) || entry.path.includes(query)) {
      results.push(entry.item);
      if (results.length === MAX_SEARCH_RESULTS) break;
    }
  }
  return results;
});

async function jump(item) {
  searchOpen.value = false;
  if (item.path) return router.push(item.path);

  if (route.path !== DASHBOARD_PATH) {
    const failure = await router.push(DASHBOARD_PATH);
    if (failure) return;
    await nextTick();
  }
  if (item.tab) dashboard.value?.selectTab(item.tab);
  else
    document
      .getElementById(item.id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* -------------------------------------------------------------------------- */
/* Settings                                                                   */
/* -------------------------------------------------------------------------- */
watch(accent, (value) => {
  theme.themes.value.light.colors.primary = value;
  theme.themes.value.dark.colors.primary = value;
});

function resetSettings() {
  compact.value = false;
  bordered.value = false;
  accent.value = DEFAULT_ACCENT;
  setDark(false);
}

/* -------------------------------------------------------------------------- */
/* Export                                                                     */
/* -------------------------------------------------------------------------- */
const csvCell = (value) => {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

function exportReport() {
  const rows = [
    ["Product", "Manager", "Progress", "Priority", "Budget"],
    ...productSets.App.map((p) => [
      p.name,
      p.person,
      `${p.progress}%`,
      p.priority,
      p.budget,
    ]),
  ];
  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "matdash-revenue-sept-2025.csv";
  link.click();
  // Revoking immediately can cancel the download in some browsers (Safari).
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notice("Revenue report downloaded");
}

/* -------------------------------------------------------------------------- */
/* Lifecycle                                                                  */
/* -------------------------------------------------------------------------- */
function onKeydown(e) {
  // `e.key` can be undefined on browser autofill events.
  if ((e.metaKey || e.ctrlKey) && e.key?.toLowerCase() === "k") {
    e.preventDefault();
    searchOpen.value = !searchOpen.value;
  }
}
onMounted(() => {
  document.addEventListener("keydown", onKeydown);
  window.addEventListener("matdash-profile-updated", updateProfile);
});
onBeforeUnmount(() => {
  document.removeEventListener("keydown", onKeydown);
  window.removeEventListener("matdash-profile-updated", updateProfile);
});
</script>

<template>
  <v-app :class="{ 'compact-layout': compact, 'bordered-cards': bordered }">
    <!-- Icon rail -->
    <v-navigation-drawer
      v-if="mdAndUp && !standalone"
      permanent
      :width="80"
      class="icon-rail"
      color="rail"
      :border="false"
    >
      <div class="rail-menu">
        <v-btn
          icon
          variant="text"
          aria-label="Toggle sidebar"
          @click="sidebar = !sidebar"
        >
          <Icon name="menu" :size="24" />
        </v-btn>
      </div>
      <div class="rail-items">
        <template v-for="({ name, icon }, index) in categories" :key="name">
          <v-divider v-if="index === 3 || index === 6" class="rail-divider" />
          <v-btn
            icon
            rounded="lg"
            :variant="category === name ? 'flat' : 'text'"
            :color="category === name ? 'primary' : undefined"
            :aria-label="name"
            :aria-pressed="category === name"
            @click="chooseCategory(name)"
          >
            <Icon :name="icon" :size="25" />
            <v-tooltip activator="parent" :text="name" location="right" />
          </v-btn>
        </template>
      </div>
    </v-navigation-drawer>

    <!-- Main sidebar -->
    <v-navigation-drawer
      v-if="!standalone"
      v-model="sidebar"
      :permanent="mdAndUp && sidebar"
      :temporary="!mdAndUp"
      :width="240"
      class="main-sidebar"
      :border="false"
    >
      <router-link :to="DASHBOARD_PATH" class="brand" aria-label="MatDash home">
        <img src="/assets/logo-Dq6uoD-m.svg" alt="MatDash" />
      </router-link>
      <div v-if="!mdAndUp" class="mobile-categories">
        <v-select
          v-model="category"
          :items="categoryNames"
          aria-label="Navigation category"
        />
      </div>
      <v-list
        v-model:opened="openedGroups"
        class="side-list"
        nav
        bg-color="transparent"
        density="comfortable"
      >
        <template v-for="group in currentGroups" :key="group.title">
          <div class="nav-section-title">{{ group.title }}</div>
          <NavigationItem
            v-for="(item, index) in group.items"
            :key="item.name + index"
            :item="item"
            @navigate="closeSidebarOnMobile"
            @category="chooseCategory"
          />
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Top bar -->
    <v-app-bar v-if="!standalone" :height="70" elevation="0" class="topbar">
      <v-btn
        v-if="!mdAndUp"
        icon
        variant="text"
        aria-label="Open navigation"
        @click="sidebar = !sidebar"
      >
        <Icon name="menu" />
      </v-btn>

      <v-btn
        icon
        variant="text"
        aria-label="Search dashboard"
        @click="searchOpen = true"
      >
        <Icon name="search" :size="23" />
        <v-tooltip activator="parent" text="Search dashboard · Ctrl K" />
      </v-btn>

      <v-btn icon variant="text" aria-label="Dashboard shortcuts">
        <Icon name="grid" :size="22" />
        <v-menu activator="parent" location="bottom start" :offset="10">
          <v-card width="330" class="pa-5 dropdown-card">
            <h3 class="mb-4">Your workspace</h3>
            <div class="shortcut-grid">
              <v-btn
                v-for="section in sections"
                :key="section.id"
                variant="tonal"
                color="primary"
                class="shortcut"
                @click="jump(section)"
              >
                <Icon :name="section.icon" :size="23" />
                <span>{{ section.name }}</span>
              </v-btn>
            </div>
          </v-card>
        </v-menu>
      </v-btn>

      <v-spacer />

      <v-btn icon variant="text" :aria-label="themeLabel" @click="toggleTheme">
        <Icon :name="dark ? 'sun' : 'moon'" :size="23" />
        <v-tooltip activator="parent" :text="themeLabel" />
      </v-btn>

      <span class="language-flag" role="img" aria-label="English language">
        <svg viewBox="0 0 60 60" width="22" height="22">
          <defs>
            <clipPath id="flag-clip">
              <circle cx="30" cy="30" r="30" />
            </clipPath>
          </defs>
          <g clip-path="url(#flag-clip)">
            <path fill="#2435a2" d="M0 0h60v60H0z" />
            <path stroke="#fff" stroke-width="12" d="m0 0 60 60M0 60 60 0" />
            <path stroke="#ee3264" stroke-width="5" d="m0 0 60 60M0 60 60 0" />
            <path stroke="#fff" stroke-width="20" d="M30 0v60M0 30h60" />
            <path stroke="#ee3264" stroke-width="12" d="M30 0v60M0 30h60" />
          </g>
        </svg>
        <v-tooltip activator="parent" text="Language: English" />
      </span>

      <!-- Cart -->
      <v-btn icon variant="text" aria-label="Shopping cart">
        <v-badge :content="cartCount" color="error" floating>
          <Icon name="cart" :size="22" />
        </v-badge>
        <v-menu activator="parent" location="bottom end" :offset="10">
          <v-card width="310" class="pa-7 text-center dropdown-card">
            <v-avatar color="lightprimary" size="64" class="mb-4">
              <Icon name="cart" :size="30" class="text-primary" />
            </v-avatar>
            <h3>
              {{
                cartCount
                  ? cartCount + " items in your cart"
                  : "Your cart is empty"
              }}
            </h3>
            <p class="muted mt-2 mb-5">
              {{
                cartCount
                  ? "Subtotal: " + money(cartTotal)
                  : "Products you add will appear here."
              }}
            </p>
            <v-btn
              color="primary"
              :to="cartCount ? '/ecommerce/checkout' : '/ecommerce/products'"
            >
              {{ cartCount ? "View Cart" : "Browse Shop" }}
              <Icon name="external" :size="15" class="ml-2" />
            </v-btn>
          </v-card>
        </v-menu>
      </v-btn>

      <!-- Notifications -->
      <v-btn icon variant="text" aria-label="Notifications">
        <v-badge :model-value="unread" dot color="primary">
          <Icon name="bell" :size="22" />
        </v-badge>
        <v-menu
          activator="parent"
          location="bottom end"
          :offset="10"
          :close-on-content-click="false"
        >
          <v-card width="360" max-width="94vw" class="dropdown-card">
            <div class="pa-5 d-flex justify-space-between align-center">
              <h3>Notifications</h3>
              <v-chip v-if="unread" size="small" color="primary">
                {{ notifications.length }} new
              </v-chip>
            </div>
            <v-divider />
            <div
              v-for="note in notifications"
              :key="note.title"
              class="notification-item"
            >
              <v-avatar size="40" color="lightprimary" rounded="lg">
                <Icon :name="note.icon" class="text-primary" />
              </v-avatar>
              <div>
                <h4>{{ note.title }}</h4>
                <p>{{ note.text }}</p>
                <small>{{ note.time }}</small>
              </div>
            </div>
            <div class="pa-4 pt-0">
              <v-btn
                block
                variant="tonal"
                color="primary"
                @click="unread = false"
              >
                <Icon name="checks" :size="18" class="mr-2" />{{
                  unread ? "Mark all as read" : "All caught up"
                }}
              </v-btn>
            </div>
          </v-card>
        </v-menu>
      </v-btn>

      <!-- Account -->
      <v-btn
        icon
        variant="text"
        aria-label="Account menu"
        class="profile-button"
      >
        <v-avatar size="35">
          <img :src="accountProfile.avatar" :alt="accountProfile.name" width="35" />
        </v-avatar>
        <v-menu activator="parent" location="bottom end" :offset="10">
          <v-card width="280" class="pa-5 dropdown-card">
            <div class="d-flex align-center ga-3 mb-4">
              <v-avatar size="48">
                <img
                  :src="accountProfile.avatar"
                  :alt="accountProfile.name"
                  width="48"
                />
              </v-avatar>
              <div>
                <h3>{{ accountProfile.name }}</h3>
                <p class="muted text-caption">Administrator · Demo account</p>
              </div>
            </div>
            <v-divider class="mb-2" />
            <v-list density="compact">
              <v-list-item
                v-if="demoSignedIn"
                title="Sign out of demo"
                @click="demoLogout"
              >
                <template #prepend><Icon name="logout" class="mr-3" /></template>
              </v-list-item>
              <v-list-item v-else title="Demo sign in" to="/auth/login">
                <template #prepend><Icon name="user" class="mr-3" /></template>
              </v-list-item>
              <v-list-item title="Account Settings" to="/pages/account-settings">
                <template #prepend><Icon name="user" class="mr-3" /></template>
              </v-list-item>
              <v-list-item title="Download revenue report" @click="exportReport">
                <template #prepend>
                  <Icon name="download" class="mr-3" />
                </template>
              </v-list-item>
              <v-list-item
                title="Dashboard settings"
                @click="settingsOpen = true"
              >
                <template #prepend>
                  <Icon name="settings" class="mr-3" />
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-btn>
    </v-app-bar>

    <!-- Page -->
    <v-main>
      <div :class="canvasClass">
        <router-view v-slot="{ Component }">
          <component :is="Component" ref="dashboard" :key="viewKey" />
        </router-view>
      </div>
    </v-main>

    <!-- Settings button + drawer -->
    <v-btn
      v-if="!standalone"
      class="settings-fab"
      icon
      color="primary"
      size="56"
      aria-label="Customize dashboard"
      @click="settingsOpen = true"
    >
      <Icon name="settings" :size="24" />
      <v-tooltip activator="parent" text="Customize dashboard" location="left" />
    </v-btn>

    <v-navigation-drawer
      v-model="settingsOpen"
      temporary
      location="right"
      width="340"
      class="settings-drawer"
    >
      <div class="pa-6">
        <div class="d-flex justify-space-between align-center mb-7">
          <h2>Dashboard settings</h2>
          <v-btn
            icon
            variant="text"
            size="small"
            aria-label="Close settings"
            @click="settingsOpen = false"
          >
            <Icon name="close" />
          </v-btn>
        </div>
        <p class="muted mb-6">Make your workspace feel like you.</p>

        <h3 class="mb-3">Appearance</h3>
        <div class="appearance-options">
          <v-btn
            :variant="dark ? 'outlined' : 'tonal'"
            color="primary"
            height="70"
            @click="setDark(false)"
          >
            <Icon name="sun" />Light
          </v-btn>
          <v-btn
            :variant="dark ? 'tonal' : 'outlined'"
            color="primary"
            height="70"
            @click="setDark(true)"
          >
            <Icon name="moon" />Dark
          </v-btn>
        </div>

        <h3 class="mt-7 mb-4">Accent colour</h3>
        <div class="d-flex ga-3">
          <v-btn
            v-for="color in ACCENTS"
            :key="color"
            :color="color"
            icon
            size="44"
            :aria-label="'Use ' + color + ' accent'"
            @click="accent = color"
          >
            <Icon v-if="accent === color" name="check" />
          </v-btn>
        </div>

        <v-divider class="my-7" />

        <h3>Layout</h3>
        <v-switch
          v-model="compact"
          color="primary"
          label="Compact spacing"
          hide-details
          inset
        />
        <v-switch
          v-model="bordered"
          color="primary"
          label="Card borders"
          hide-details
          inset
        />
        <v-switch
          v-model="sidebar"
          color="primary"
          label="Show sidebar"
          hide-details
          inset
        />
        <v-btn
          variant="tonal"
          color="primary"
          block
          class="mt-6"
          @click="resetSettings"
        >
          Reset to default
        </v-btn>
        <v-btn
          to="/pages/route-directory"
          variant="text"
          color="primary"
          block
          class="mt-4"
          @click="settingsOpen = false"
        >
          View route directory
        </v-btn>
        <p class="text-caption muted mt-6">
          Vue 3 · Vuetify 4.2.5<br />Recreated from the MatDash public demo.
        </p>
      </div>
    </v-navigation-drawer>

    <!-- Search -->
    <v-dialog v-model="searchOpen" max-width="600">
      <v-card class="search-dialog" rounded="xl">
        <div class="pa-5 d-flex align-center ga-3">
          <Icon name="search" :size="23" class="text-primary" />
          <v-text-field
            v-model="search"
            autofocus
            placeholder="Search dashboard…"
            variant="plain"
            aria-label="Search dashboard sections"
          />
          <v-btn
            icon
            variant="text"
            size="small"
            aria-label="Close search"
            @click="searchOpen = false"
          >
            <Icon name="close" />
          </v-btn>
        </div>
        <v-divider />
        <div class="pa-3">
          <p class="text-caption muted px-3 py-2">PAGES & DASHBOARD</p>
          <v-list v-if="searchResults.length">
            <v-list-item
              v-for="result in searchResults"
              :key="result.path || result.name"
              :title="result.name"
              rounded="lg"
              @click="jump(result)"
            >
              <template #prepend>
                <Icon :name="result.icon" class="mr-4 text-primary" />
              </template>
              <template #append><Icon name="arrow" :size="18" /></template>
            </v-list-item>
          </v-list>
          <div v-else class="pa-8 text-center muted">
            No matches for “{{ search }}”. Try revenue, customers, or projects.
          </div>
        </div>
        <v-divider />
        <div class="pa-4 text-caption muted">
          Search your dashboard · Esc to close
        </div>
      </v-card>
    </v-dialog>

    <AppFeedback />

    <v-snackbar
      v-model="snack"
      color="primary"
      location="top right"
      :timeout="3500"
    >
      {{ snackText }}
      <template #actions>
        <v-btn
          variant="text"
          aria-label="Dismiss notification"
          @click="snack = false"
        >
          <Icon name="close" />
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
