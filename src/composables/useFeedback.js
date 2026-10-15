import { reactive } from "vue";
export const feedback = reactive({
  show: false,
  text: "",
  color: "primary",
  confirm: false,
  title: "",
  description: "",
});
let resolve;
export function notify(text, color = "primary") {
  feedback.text = text;
  feedback.color = color;
  feedback.show = true;
}
export function confirmDemo(
  title,
  description = "This changes only the sample data stored in this browser.",
) {
  feedback.title = title;
  feedback.description = description;
  feedback.confirm = true;
  return new Promise((r) => (resolve = r));
}
export function answerConfirm(value) {
  feedback.confirm = false;
  resolve?.(value);
  resolve = null;
}
export const required = (v) =>
  !!String(v ?? "").trim() || "This field is required.";
export const validEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "") || "Enter a valid email address.";
