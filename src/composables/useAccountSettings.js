import { computed, reactive, ref } from "vue";

const KEY = "matdash-account-settings-v1";
export const defaultAvatar = "/assets/user-1-4oeL4QIr.jpg";
export const defaultSettings = {
  account: {
    name: "Mathew Anderson",
    store: "Maxima Studio",
    location: "United States",
    currency: "US Dollar ($)",
    email: "info@modernize.com",
    phone: "+91 12345 65478",
    address: "814 Howard Street, 120065, India",
    avatar: defaultAvatar,
  },
  notification: {
    email: "info@modernize.com",
    newsletter: false,
    confirmation: true,
    status: false,
    delivered: false,
    emailUpdates: true,
    timezone: "Europe/Athens",
    ignoreTracking: false,
  },
  bills: {
    business: "Visitor Analytics",
    sector: "Arts, Media & Entertainment",
    address: "",
    country: "Romania",
    firstName: "",
    lastName: "",
    plan: "Executive",
    cancelled: false,
  },
  security: {
    twoFactor: false,
    app: false,
    recoveryEmail: "",
    recoveryPhone: "",
    devices: ["iphone", "macbook"],
  },
};
const clone = (value) => JSON.parse(JSON.stringify(value));

export function useAccountSettings() {
  const initial = clone(defaultSettings);
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) || "null");
    if (stored && stored.version === 1) {
      for (const key of Object.keys(initial))
        if (stored.data?.[key])
          initial[key] = { ...initial[key], ...stored.data[key] };
    }
  } catch {
    /* An unavailable storage service should not prevent the page loading. */
  }
  const saved = ref(clone(initial));
  const draft = reactive(clone(initial));
  const dirty = computed(
    () => JSON.stringify(draft) !== JSON.stringify(saved.value),
  );
  function save(section) {
    const next = clone(saved.value);
    next[section] = clone(draft[section]);
    // Passwords, payment card numbers and MFA secrets are never accepted into this store.
    try {
      localStorage.setItem(KEY, JSON.stringify({ version: 1, data: next }));
    } catch {
      throw new Error(
        "Changes could not be saved. Browser storage may be full or unavailable.",
      );
    }
    saved.value = next;
    if (section === "account")
      window.dispatchEvent(
        new CustomEvent("matdash-profile-updated", {
          detail: clone(next.account),
        }),
      );
  }
  function reset(section) {
    draft[section] = clone(saved.value[section]);
  }
  function sectionDirty(section) {
    return (
      JSON.stringify(draft[section]) !== JSON.stringify(saved.value[section])
    );
  }
  return { draft, saved, dirty, save, reset, sectionDirty };
}
