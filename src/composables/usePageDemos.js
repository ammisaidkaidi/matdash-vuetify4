import { reactive, watch } from "vue";
import { notify } from "./useFeedback";
const defaults = {
  following: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 18, 19, 20],
  plan: "Silver",
  billing: "Monthly",
  widgetFriends: [],
  bannerFriend: "pending",
  sound: 45,
  chat: true,
};
let saved;
try {
  saved = JSON.parse(localStorage.getItem("matdash-pages-v1") || "null");
} catch {}
export const pageDemos = reactive({
  ...defaults,
  ...(saved?.version === 1 ? saved.data : {}),
});
watch(
  pageDemos,
  () => {
    try {
      localStorage.setItem(
        "matdash-pages-v1",
        JSON.stringify({ version: 1, data: pageDemos }),
      );
    } catch {
      notify("Storage unavailable. These changes remain in memory.", "warning");
    }
  },
  { deep: true },
);
export function toggleFollow(id) {
  const i = pageDemos.following.indexOf(id);
  if (i < 0) pageDemos.following.push(id);
  else pageDemos.following.splice(i, 1);
}
