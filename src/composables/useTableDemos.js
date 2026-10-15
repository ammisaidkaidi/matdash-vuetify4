import { reactive, watch, ref } from "vue";
import { dessertSeed } from "../data/table-seed";
const key = "matdash-table-demos-v1";
let initial = dessertSeed.map((p) => ({ ...p }));
try {
  const saved = JSON.parse(localStorage.getItem(key) || "null");
  if (
    saved?.version === 1 &&
    Array.isArray(saved.desserts) &&
    saved.desserts.every(
      (p) =>
        Number.isFinite(p.id) &&
        typeof p.name === "string" &&
        ["calories", "fat", "carbs", "protein"].every(
          (k) => Number.isFinite(p[k]) && p[k] >= 0,
        ),
    )
  )
    initial = saved.desserts;
} catch {}
export const tableDemos = reactive({ desserts: initial });
export const tableStorageError = ref("");
watch(
  tableDemos,
  () => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ version: 1, desserts: tableDemos.desserts }),
      );
      tableStorageError.value = "";
    } catch {
      tableStorageError.value =
        "Storage unavailable. Changes remain in memory only.";
    }
  },
  { deep: true },
);
