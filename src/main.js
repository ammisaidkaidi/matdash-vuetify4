import { createApp } from "vue";
import { createVuetify } from "vuetify";
import {
  VApp,
  VAppBar,
  VAvatar,
  VBadge,
  VBtn,
  VCard,
  VChip,
  VDialog,
  VDivider,
  VList,
  VListGroup,
  VListItem,
  VMain,
  VMenu,
  VNavigationDrawer,
  VProgressLinear,
  VSelect,
  VSnackbar,
  VSpacer,
  VSwitch,
  VTab,
  VTable,
  VTabs,
  VTextField,
  VTooltip,
  VForm,
  VAlert,
  VTextarea,
  VCheckbox,
  VRadio,
  VRadioGroup,
  VDataTable,
  VRating,
  VBtnToggle,
  VDatePicker,
} from "vuetify/components";
import { Ripple } from "vuetify/directives";
const components = {
  VApp,
  VAppBar,
  VAvatar,
  VBadge,
  VBtn,
  VCard,
  VChip,
  VDialog,
  VDivider,
  VList,
  VListGroup,
  VListItem,
  VMain,
  VMenu,
  VNavigationDrawer,
  VProgressLinear,
  VSelect,
  VSnackbar,
  VSpacer,
  VSwitch,
  VTab,
  VTable,
  VTabs,
  VTextField,
  VTooltip,
  VForm,
  VAlert,
  VTextarea,
  VCheckbox,
  VRadio,
  VRadioGroup,
  VDataTable,
  VRating,
  VBtnToggle,
  VDatePicker,
};
const directives = { Ripple };
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import "vuetify/styles";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import App from "./App.vue";
import { router } from "./app/router";
import "./styles/pages.css";
import Icon from "./com/ui/Icon.vue";
import "./styles/style.css";
import "./styles/apps.css";
import "./styles/forms.css";
import "./styles/batch03.css";
import "./styles/batch04.css";
import "./styles/batch05.css";
const colors = {
  primary: "#635BFF",
  secondary: "#16CDC7",
  error: "#ff6692",
  success: "#36c76c",
  warning: "#ffd648",
  background: "#ffffff",
  surface: "#ffffff",
  "on-surface": "#29343D",
  lightprimary: "#DDDBFF",
  lightsecondary: "#A6F7F5",
  lighterror: "#FFCCDB",
  canvas: "#F4F7FB",
  rail: "#EFF4FA",
  muted: "#98A4AE",
};
const vuetify = createVuetify({
  components,
  directives,
  icons: { defaultSet: "mdi", aliases, sets: { mdi } },
  theme: {
    defaultTheme: "light",
    themes: {
      light: { dark: false, colors },
      dark: {
        dark: true,
        colors: {
          ...colors,
          background: "#1a2537",
          surface: "#1f2b3e",
          "on-surface": "#eaeff4",
          canvas: "#152031",
          rail: "#182436",
          lightprimary: "#353365",
          lightsecondary: "#174d54",
          lighterror: "#573348",
          muted: "#93a3ba",
        },
      },
    },
  },
  defaults: {
    VCard: { elevation: 0, rounded: "lg" },
    VBtn: { style: "text-transform:none;letter-spacing:0", elevation: 0 },
    VTooltip: { openDelay: 350 },
    VSelect: { variant: "outlined", density: "compact", hideDetails: true },
    VTextField: { variant: "outlined", hideDetails: true },
    VDialog: { maxWidth: 560 },
  },
});
createApp(App).use(router).use(vuetify).component("Icon", Icon).mount("#app");
