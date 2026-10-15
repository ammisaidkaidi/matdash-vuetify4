<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/AccountSettings/AccountSettings.vue";
import type { AccountSettingsContext } from "../../com/AccountSettings/types";
import { computed, reactive, ref, onBeforeUnmount, onMounted } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import PageHeader from "../../com/ui/PageHeader.vue";
import SettingsField from "../../com/ui/SettingsField.vue";
import {
  useAccountSettings,
  defaultAvatar,
} from "../../composables/useAccountSettings";
const route = useRoute(),
  router = useRouter();
const { draft, dirty, save, reset, sectionDirty } = useAccountSettings();
const tabs = [
  {
    value: "account",
    title: "Account",
    icon: "profile",
  },
  {
    value: "notification",
    title: "Notification",
    icon: "bell",
  },
  {
    value: "bills",
    title: "Bills",
    icon: "invoice",
  },
  {
    value: "security",
    title: "Security",
    icon: "lock",
  },
];
const tab = computed({
  get: () =>
    tabs.some((t) => t.value === route.query.tab) ? route.query.tab : "account",
  set: (value) =>
    router.replace({
      query:
        value === "account"
          ? {}
          : {
              tab: value,
            },
    }),
});
const forms = ref({}),
  upload = ref(null),
  uploadError = ref(""),
  saving = ref(false),
  snackbar = ref(false),
  message = ref(""),
  messageColor = ref("primary");
const passwords = reactive({
  current: "",
  next: "",
  confirm: "",
});
const passwordsDirty = computed(() => Object.values(passwords).some(Boolean));
const hasChanges = computed(() => dirty.value || passwordsDirty.value);
const required = (v) => !!String(v || "").trim() || "This field is required.";
const email = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "") || "Enter a valid email address.";
const phone = (v) =>
  /^[+()\d\s.-]{7,25}$/.test(v || "") || "Enter a valid phone number.";
const passwordRules = {
  current: [
    (v) => !passwordsDirty.value || !!v || "Enter your current password.",
  ],
  next: [
    (v) =>
      !passwordsDirty.value ||
      String(v).length >= 8 ||
      "Use at least 8 characters.",
    (v) =>
      !passwordsDirty.value ||
      v !== passwords.current ||
      "Choose a different password.",
  ],
  confirm: [
    (v) =>
      !passwordsDirty.value ||
      (!!v && v === passwords.next) ||
      "Passwords do not match.",
  ],
};
const locations = [
  "United States",
  "United Kingdom",
  "India",
  "Russia",
  "Algeria",
  "France",
  "Romania",
];
const currencies = [
  "US Dollar ($)",
  "United Kingdom (Pound)",
  "India (INR)",
  "Russia (Ruble)",
  "Algerian Dinar (DZD)",
  "Euro (€)",
];
const preferences = [
  {
    key: "newsletter",
    title: "Our newsletter",
    text: "We will always let you know about important changes",
    icon: "file",
  },
  {
    key: "confirmation",
    title: "Order Confirmation",
    text: "You will be notified when a customer orders any product",
    icon: "check",
  },
  {
    key: "status",
    title: "Order Status Changed",
    text: "You will be notified when a customer makes changes to an order",
    icon: "clock",
  },
  {
    key: "delivered",
    title: "Order Delivered",
    text: "You will be notified once an order is delivered",
    icon: "truck",
  },
  {
    key: "emailUpdates",
    title: "Email Notification",
    text: "Turn on email notifications to get updates through email",
    icon: "email",
  },
];
const zones = [
  {
    title: "(UTC +02:00) Athens, Bucharest",
    value: "Europe/Athens",
  },
  {
    title: "(UTC +00:00) London",
    value: "Europe/London",
  },
  {
    title: "(UTC +01:00) Algiers",
    value: "Africa/Algiers",
  },
  {
    title: "(UTC -05:00) New York",
    value: "America/New_York",
  },
  {
    title: "(UTC +05:30) Kolkata",
    value: "Asia/Kolkata",
  },
];
const plans = [
  {
    name: "Starter",
    visits: "50,000",
    price: "Free",
  },
  {
    name: "Professional",
    visits: "250,000",
    price: "$29 / month",
  },
  {
    name: "Executive",
    visits: "750,000",
    price: "$59 / month",
  },
];
const selectedPlan = computed(
  () => plans.find((p) => p.name === draft.bills.plan) || plans[2],
);
const planDialog = ref(false),
  planChoice = ref("Executive"),
  paymentDialog = ref(false),
  helpDialog = ref(false);
const setupDialog = ref(false),
  setupMode = ref("app"),
  setupValue = ref(""),
  setupError = ref("");
const setupTitle = computed(
  () =>
    ({
      app: "Authentication App",
      email: "Recovery email",
      sms: "SMS Recovery",
      twoFactor: "Two-factor Authentication",
    })[setupMode.value],
);
const deviceDetails = {
  iphone: {
    title: "iPhone 14",
    text: "London UK, Oct 23 at 1:15 AM",
    icon: "phone",
  },
  macbook: {
    title: "Macbook Air",
    text: "Gujarat India, Oct 24 at 3:15 AM",
    icon: "laptop",
  },
};
const confirmDialog = ref(false),
  confirmation = reactive({
    title: "",
    text: "",
    action: null,
  });
const leaveDialog = ref(false);
let resolveLeave = null;
const notify = (text, color = "primary") => {
  message.value = text;
  messageColor.value = color;
  snackbar.value = true;
};
function askConfirmation(title, text, action) {
  Object.assign(confirmation, {
    title,
    text,
    action,
  });
  confirmDialog.value = true;
}
function confirmAction() {
  confirmation.action?.();
  confirmDialog.value = false;
}
function clearPasswords() {
  passwords.current = "";
  passwords.next = "";
  passwords.confirm = "";
}
async function saveTab() {
  const form = forms.value[tab.value];
  if (form) {
    const { valid } = await form.validate();
    if (!valid) {
      notify("Please correct the highlighted fields.", "error");
      return;
    }
  }
  saving.value = true;
  try {
    const checkedPassword = tab.value === "account" && passwordsDirty.value;
    save(tab.value);
    if (tab.value === "account") clearPasswords();
    notify(
      checkedPassword
        ? "Profile saved locally. Password format checked only; no real password was changed."
        : "Changes saved in this browser.",
    );
  } catch (error) {
    notify(error.message, "error");
  } finally {
    saving.value = false;
  }
}
function cancelChanges() {
  reset(tab.value);
  if (tab.value === "account") {
    clearPasswords();
    uploadError.value = "";
  }
  forms.value[tab.value]?.resetValidation();
  notify("Unsaved changes in this tab were discarded.");
}
function readUpload(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  uploadError.value = "";
  if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
    uploadError.value = "Please choose a JPG, PNG, or GIF image.";
    return;
  }
  if (file.size > 800 * 1024) {
    uploadError.value = "The image must be 800 KB or smaller.";
    return;
  }
  const reader = new FileReader();
  reader.onerror = () => (uploadError.value = "This image could not be read.");
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      draft.account.avatar = reader.result;
    };
    image.onerror = () =>
      (uploadError.value = "The file is not a valid image.");
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}
function openSetup(mode) {
  setupMode.value = mode;
  setupValue.value =
    mode === "email"
      ? draft.security.recoveryEmail
      : mode === "sms"
        ? draft.security.recoveryPhone
        : "";
  setupError.value = "";
  setupDialog.value = true;
}
function finishSetup() {
  if (setupMode.value === "email" && email(setupValue.value) !== true) {
    setupError.value = "Enter a valid recovery email.";
    return;
  }
  if (setupMode.value === "sms" && phone(setupValue.value) !== true) {
    setupError.value = "Enter a valid recovery phone number.";
    return;
  }
  if (setupMode.value === "app") draft.security.app = true;
  if (setupMode.value === "email")
    draft.security.recoveryEmail = setupValue.value;
  if (setupMode.value === "sms")
    draft.security.recoveryPhone = setupValue.value;
  if (setupMode.value === "twoFactor")
    draft.security.twoFactor = !draft.security.twoFactor;
  setupDialog.value = false;
  notify("Demo setting updated. Choose Save to keep it locally.");
}
function respondToLeave(leave) {
  leaveDialog.value = false;
  resolveLeave?.(leave);
  resolveLeave = null;
}
onBeforeRouteLeave(() => {
  if (!hasChanges.value) return true;
  leaveDialog.value = true;
  return new Promise((resolve) => {
    resolveLeave = resolve;
  });
});
function beforeUnload(e) {
  if (hasChanges.value) {
    e.preventDefault();
    e.returnValue = "";
  }
}
onMounted(() => window.addEventListener("beforeunload", beforeUnload));
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", beforeUnload);
  clearPasswords();
});

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: AccountSettingsContext = __viewReactive({
  get askConfirmation() {
    return __viewUnref(askConfirmation);
  },
  get cancelChanges() {
    return __viewUnref(cancelChanges);
  },
  get confirmAction() {
    return __viewUnref(confirmAction);
  },
  get confirmDialog() {
    return __viewUnref(confirmDialog);
  },
  set confirmDialog(value: any) {
    if (__viewIsRef(confirmDialog)) (confirmDialog as any).value = value;
  },
  get confirmation() {
    return __viewUnref(confirmation);
  },
  get currencies() {
    return __viewUnref(currencies);
  },
  get defaultAvatar() {
    return __viewUnref(defaultAvatar);
  },
  get deviceDetails() {
    return __viewUnref(deviceDetails);
  },
  get draft() {
    return __viewUnref(draft);
  },
  set draft(value: any) {
    if (__viewIsRef(draft)) (draft as any).value = value;
  },
  get email() {
    return __viewUnref(email);
  },
  get finishSetup() {
    return __viewUnref(finishSetup);
  },
  get forms() {
    return __viewUnref(forms);
  },
  set forms(value: any) {
    if (__viewIsRef(forms)) (forms as any).value = value;
  },
  get helpDialog() {
    return __viewUnref(helpDialog);
  },
  set helpDialog(value: any) {
    if (__viewIsRef(helpDialog)) (helpDialog as any).value = value;
  },
  get leaveDialog() {
    return __viewUnref(leaveDialog);
  },
  set leaveDialog(value: any) {
    if (__viewIsRef(leaveDialog)) (leaveDialog as any).value = value;
  },
  get locations() {
    return __viewUnref(locations);
  },
  get message() {
    return __viewUnref(message);
  },
  set message(value: any) {
    if (__viewIsRef(message)) (message as any).value = value;
  },
  get messageColor() {
    return __viewUnref(messageColor);
  },
  set messageColor(value: any) {
    if (__viewIsRef(messageColor)) (messageColor as any).value = value;
  },
  get openSetup() {
    return __viewUnref(openSetup);
  },
  get passwordRules() {
    return __viewUnref(passwordRules);
  },
  get passwords() {
    return __viewUnref(passwords);
  },
  get passwordsDirty() {
    return __viewUnref(passwordsDirty);
  },
  set passwordsDirty(value: any) {
    if (__viewIsRef(passwordsDirty)) (passwordsDirty as any).value = value;
  },
  get paymentDialog() {
    return __viewUnref(paymentDialog);
  },
  set paymentDialog(value: any) {
    if (__viewIsRef(paymentDialog)) (paymentDialog as any).value = value;
  },
  get phone() {
    return __viewUnref(phone);
  },
  get planChoice() {
    return __viewUnref(planChoice);
  },
  set planChoice(value: any) {
    if (__viewIsRef(planChoice)) (planChoice as any).value = value;
  },
  get planDialog() {
    return __viewUnref(planDialog);
  },
  set planDialog(value: any) {
    if (__viewIsRef(planDialog)) (planDialog as any).value = value;
  },
  get plans() {
    return __viewUnref(plans);
  },
  get preferences() {
    return __viewUnref(preferences);
  },
  get readUpload() {
    return __viewUnref(readUpload);
  },
  get required() {
    return __viewUnref(required);
  },
  get respondToLeave() {
    return __viewUnref(respondToLeave);
  },
  get saveTab() {
    return __viewUnref(saveTab);
  },
  get saving() {
    return __viewUnref(saving);
  },
  set saving(value: any) {
    if (__viewIsRef(saving)) (saving as any).value = value;
  },
  get sectionDirty() {
    return __viewUnref(sectionDirty);
  },
  set sectionDirty(value: any) {
    if (__viewIsRef(sectionDirty)) (sectionDirty as any).value = value;
  },
  get selectedPlan() {
    return __viewUnref(selectedPlan);
  },
  set selectedPlan(value: any) {
    if (__viewIsRef(selectedPlan)) (selectedPlan as any).value = value;
  },
  get setupDialog() {
    return __viewUnref(setupDialog);
  },
  set setupDialog(value: any) {
    if (__viewIsRef(setupDialog)) (setupDialog as any).value = value;
  },
  get setupError() {
    return __viewUnref(setupError);
  },
  set setupError(value: any) {
    if (__viewIsRef(setupError)) (setupError as any).value = value;
  },
  get setupMode() {
    return __viewUnref(setupMode);
  },
  set setupMode(value: any) {
    if (__viewIsRef(setupMode)) (setupMode as any).value = value;
  },
  get setupTitle() {
    return __viewUnref(setupTitle);
  },
  set setupTitle(value: any) {
    if (__viewIsRef(setupTitle)) (setupTitle as any).value = value;
  },
  get setupValue() {
    return __viewUnref(setupValue);
  },
  set setupValue(value: any) {
    if (__viewIsRef(setupValue)) (setupValue as any).value = value;
  },
  get snackbar() {
    return __viewUnref(snackbar);
  },
  set snackbar(value: any) {
    if (__viewIsRef(snackbar)) (snackbar as any).value = value;
  },
  get tab() {
    return __viewUnref(tab);
  },
  set tab(value: any) {
    if (__viewIsRef(tab)) (tab as any).value = value;
  },
  get tabs() {
    return __viewUnref(tabs);
  },
  get upload() {
    return __viewUnref(upload);
  },
  set upload(value: any) {
    if (__viewIsRef(upload)) (upload as any).value = value;
  },
  get uploadError() {
    return __viewUnref(uploadError);
  },
  set uploadError(value: any) {
    if (__viewIsRef(uploadError)) (uploadError as any).value = value;
  },
  get zones() {
    return __viewUnref(zones);
  },
  contentConfig: {
    texts: {
      accountSetting: "Account Setting",
      accountSettingsSections: "Account settings sections",
      account: "account",
      unsavedChanges: "Unsaved changes",
      changeProfile: "Change Profile",
      changeYourProfilePictureFromHere:
        " Change your profile picture from here ",
      profilePreview: "Profile preview",
      upload: "Upload",
      text1: "",
      reset: "Reset",
      uploadProfileImage: "Upload profile image",
      allowedJPGGIFOrPNGMaxSizeOf800K:
        "Allowed JPG, GIF or PNG. Max size of 800K",
      changePassword: "Change Password",
      toChangeYourPasswordPleaseConfirmHere:
        " To change your password please confirm here ",
      currentPassword: "Current Password",
      enterCurrentPassword: "Enter current password",
      newPassword: "New Password",
      atLeast8Characters: "At least 8 characters",
      confirmPassword: "Confirm Password",
      reEnterNewPassword: "Re-enter new password",
      demoOnlyPasswordsAreCheckedNeverSavedOrChanged:
        " Demo only. Passwords are checked, never saved or changed. ",
      personalDetails: "Personal Details",
      toChangeYourPersonalDetailsEditAndSaveFromHere:
        " To change your personal details, edit and save from here ",
      yourName: "Your Name",
      storeName: "Store Name",
      location: "Location",
      currency: "Currency",
      email: "Email",
      phone: "Phone",
      address: "Address",
      notification: "notification",
      notificationPreferences: "Notification Preferences",
      selectTheNotificationsYouWouldLikeToReceiveViaEmailPlea:
        " Select the notifications you would like to receive via email. Please note that you cannot opt out of receiving service messages, such as payment, security or legal notifications. ",
      emailAddress: "Email Address*",
      requiredForNotifications: "Required for notifications.",
      dateTime: "Date & Time",
      timeZonesAndCalendarDisplaySettings:
        " Time zones and calendar display settings. ",
      timeZone: "Time zone",
      uTCOffsetsShownAreStandardTimeLabelsDaylightSavingMayAp:
        " UTC offsets shown are standard-time labels; daylight saving may apply. ",
      ignoreTracking: "Ignore Tracking",
      ignoreBrowserTracking: "Ignore Browser Tracking",
      browserCookie: "Browser Cookie",
      preferencePreviewOnlyThisAppDoesNotSendAnalyticsOrNotif:
        " Preference preview only. This app does not send analytics or notification emails. ",
      bills: "bills",
      billingInformation: "Billing Information",
      businessName: "Business Name*",
      businessSector: "Business Sector*",
      businessAddress: "Business Address*",
      country: "Country*",
      firstName: "First Name*",
      lastName: "Last Name*",
      currentPlan: " Current Plan : ",
      textError: "text-error",
      textSuccess: "text-success",
      cancelled: "Cancelled",
      yourSampleSubscriptionIsMarkedAsCancelled:
        "Your sample subscription is marked as cancelled.",
      thanksForBeingAPremiumMemberAndSupportingOurDevelopment:
        "Thanks for being a premium member and supporting our development.",
      currentPlan2: "Current Plan",
      monthlyVisits: " Monthly Visits",
      viewPlanChoices: "View plan choices",
      changePlan: "Change Plan",
      executive: "Executive",
      resetPlan: "Reset Plan",
      paymentMethod: "Payment Method",
      on26December2024: "On 26 December, 2024",
      visa: "Visa",
      text2: "*****2102",
      paymentMethodDetails: "Payment method details",
      ifYouUpdateYourPaymentMethodItWillOnlyBeDisplayedHereAf:
        " If you update your payment method, it will only be displayed here after your next billing cycle. ",
      cancelSampleSubscription: "Cancel sample subscription?",
      thisChangesOnlyTheLocalDemoNoRealSubscriptionOrPaymentW:
        "This changes only the local demo. No real subscription or payment will be affected.",
      cancelSubscription: "Cancel Subscription",
      demoBillingInformationNoPaymentServiceIsConnected:
        " Demo billing information. No payment service is connected. ",
      security: "security",
      twoFactorAuthentication: "Two-factor Authentication",
      addAnExtraLayerOfProtectionToYourAccountExploreTheSetup:
        " Add an extra layer of protection to your account. Explore the setup options in this local demonstration. ",
      twoFactor: "twoFactor",
      disable: "Disable",
      enable: "Enable",
      enabledInDemoOnly: "Enabled in demo only",
      authenticationApp: "Authentication App",
      configuredInThisDemo: "Configured in this demo",
      googleAuthApp: "Google auth app",
      app: "app",
      manage: "Manage",
      setup: "Setup",
      anotherEMail: "Another e-mail",
      eMailToSendVerificationLink: "E-mail to send verification link",
      email2: "email",
      sMSRecovery: "SMS Recovery",
      yourPhoneNumberForAccountRecovery:
        "Your phone number for account recovery",
      sms: "sms",
      theseControlsDoNotActivateRealMFAVerifyRecoveryDetailsO:
        " These controls do not activate real MFA, verify recovery details, or protect an account. A backend integration is required. ",
      devices: "Devices",
      reviewTheSampleDevicesAssociatedWithThisAccount:
        " Review the sample devices associated with this account. ",
      signOutSampleDevices: "Sign out sample devices?",
      thisWillClearTheDemoDeviceListOnlyNoRealSessionsWillBeE:
        "This will clear the demo device list only. No real sessions will be ended.",
      signOutFromAllDevices: "Sign Out From All Devices",
      monitor: "monitor",
      optionsFor: "Options for ",
      removeSampleDevice: "Remove sample device",
      removeThisSampleDevice: "Remove this sample device?",
      onlyTheLocalDeviceListWillChange:
        "Only the local device list will change.",
      noSampleDevicesSignedIn: "No sample devices signed in",
      needHelp: "Need Help?",
      youHaveUnsavedChanges: "You have unsaved changes",
      changesAreStoredInThisBrowserOnly:
        "Changes are stored in this browser only",
      save: "Save",
      cancel: "Cancel",
      dismissMessage: "Dismiss message",
      chooseYourPlan: "Choose your plan",
      closePlanChoices: "Close plan choices",
      previewASubscriptionPlanThisDoesNotCreateACharge:
        " Preview a subscription plan. This does not create a charge. ",
      planOption: "plan-option",
      monthlyVisits2: " monthly visits",
      useThisDemoPlan: "Use this demo plan",
      paymentMethodPreview: "Payment method preview",
      visaEndingIn2102IsSampleDataThisAppDoesNotCollectOrStor:
        " Visa ending in 2102 is sample data. This app does not collect or store payment card numbers. Connect a payment provider’s secure hosted form before enabling payment updates. ",
      gotIt: "Got it",
      closeSecuritySetup: "Close security setup",
      demoSetupOnlyNoCodesEmailsOrSMSMessagesAreSent:
        "Demo setup only. No codes, emails, or SMS messages are sent.",
      authenticatorApp: "Authenticator app",
      aRealSetupRequiresAServerGeneratedSecretAndVerifiedTime:
        " A real setup requires a server-generated secret and verified time-based code. ",
      recoveryEmailAddress: "Recovery email address",
      recoveryPhoneNumber: "Recovery phone number",
      theTwoFactorSettingInTheLocalPreviewThisDoesNotChangeRe:
        " the two-factor setting in the local preview. This does not change real account security. ",
      markAsConfigured: "Mark as configured",
      confirmDemoSetting: "Confirm demo setting",
      useForDemo: "Use for demo",
      keepCurrentSetting: "Keep current setting",
      confirm: "Confirm",
      leaveWithoutSaving: "Leave without saving?",
      yourUnsavedAccountChangesWillBeDiscardedStayHereToSaveT:
        " Your unsaved account changes will be discarded. Stay here to save them first. ",
      stayHere: "Stay here",
      discardAndLeave: "Discard and leave",
      keepYourAccountSecure: "Keep your account secure",
      useAUniquePasswordEnableAuthenticatorBasedTwoFactorAuth:
        " Use a unique password, enable authenticator-based two-factor authentication, and regularly review active sessions. ",
      thisIsAFrontEndPreviewRealAuthenticationAndDeviceManage:
        " This is a front-end preview. Real authentication and device management must be implemented by your backend. ",
      understood: "Understood",
    },
    values: {},
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
