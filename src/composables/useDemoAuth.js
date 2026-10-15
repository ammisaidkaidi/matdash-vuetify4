// UI demonstration only. This flag is not authentication or authorization.
import { ref } from "vue";
const key = "matdash-auth-demo-v1";
let initial = false;
try {
  initial =
    JSON.parse(
      sessionStorage.getItem(key) || localStorage.getItem(key) || "null",
    )?.demo === true;
} catch {}
export const demoSignedIn = ref(initial);
export function beginDemoSession(remember) {
  demoSignedIn.value = true;
  try {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
    (remember ? localStorage : sessionStorage).setItem(
      key,
      JSON.stringify({ demo: true }),
    );
    return true;
  } catch {
    return false;
  }
}
export function clearDemoSession() {
  demoSignedIn.value = false;
  try {
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  } catch {}
}
