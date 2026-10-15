// Batch 2: all thirteen form-element siblings first, then forms and Contact Us.
export const batch02Loaders = {
  "/forms/form-elements/combobox": () => import("../snipets/Comboboxpage.vue"),
  "/forms/form-elements/autocomplete": () =>
    import("../snipets/Autocompletepage.vue"),
  "/forms/form-elements/button": () => import("../snipets/Buttonspage.vue"),
  "/forms/form-elements/checkbox": () => import("../snipets/Choicespage.vue"),
  "/forms/form-elements/custominputs": () =>
    import("../snipets/CustomInputspage.vue"),
  "/forms/form-elements/fileinputs": () =>
    import("../snipets/FileInputspage.vue"),
  "/forms/form-elements/radio": () => import("../snipets/Choicespage.vue"),
  "/forms/form-elements/date-time": () => import("../snipets/DateTimepage.vue"),
  "/forms/form-elements/select": () => import("../snipets/Selectpage.vue"),
  "/forms/form-elements/slider": () => import("../snipets/Sliderspage.vue"),
  "/forms/form-elements/switch": () => import("../snipets/Choicespage.vue"),
  "/forms/form-elements/time-picker": () =>
    import("../snipets/TimePickerspage.vue"),
  "/forms/form-elements/stepper": () => import("../snipets/Stepperspage.vue"),
  "/forms/form-layouts": () => import("../snipets/FormLayoutspage.vue"),
  "/forms/form-horizontal": () => import("../snipets/DirectionalFormspage.vue"),
  "/forms/form-vertical": () => import("../snipets/DirectionalFormspage.vue"),
  "/forms/form-custom": () => import("../snipets/CustomFormpage.vue"),
  "/forms/form-validation": () => import("../snipets/Validationpage.vue"),
  "/forms/editor": () => import("../snipets/Editorpage.vue"),
  "/front-page/contact-us": () => import("../snipets/ContactUspage.vue"),
};
