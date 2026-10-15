<script setup>
import { reactive, ref, useId, onBeforeUnmount } from "vue";
import { required, validEmail } from "../../composables/useFeedback";
const props = defineProps({
  fields: Array,
  horizontal: Boolean,
  columns: { type: Number, default: 1 },
  icons: Boolean,
  rightIcons: Boolean,
  alignRight: Boolean,
  disabled: Boolean,
  submitLabel: { type: String, default: "Submit" },
  cancel: Boolean,
  remember: Boolean,
  formName: { type: String, default: "Demo form" },
});
const id = useId();
const initial = () =>
  Object.fromEntries(
    props.fields
      .filter((f) => f.key)
      .map((f) => [f.key, f.value ?? (f.kind === "checkbox" ? false : "")]),
  );
const model = reactive(initial());
const form = ref(null),
  submitted = ref(false),
  consent = ref(false);
function rules(field) {
  if (field.readonly || field.disabled) return [];
  return [
    ...(field.required ? [required] : []),
    ...(field.type === "email"
      ? [(v) => (!v && !field.required) || validEmail(v)]
      : []),
    ...(field.type === "password" && !field.confirm
      ? [
          (v) =>
            (!v && !field.required) ||
            String(v).length >= 8 ||
            "Use at least 8 characters.",
        ]
      : []),
    ...(field.confirm
      ? [(v) => v === model.password || "Passwords do not match."]
      : []),
    ...(field.rules || []),
  ];
}
async function submit() {
  if ((await form.value.validate()).valid) {
    submitted.value = true;
    for (const field of props.fields)
      if (field.type === "password") model[field.key] = "";
    form.value.resetValidation();
  }
}
function reset() {
  Object.assign(model, initial());
  consent.value = false;
  submitted.value = false;
  form.value.resetValidation();
}
onBeforeUnmount(() => {
  for (const f of props.fields) if (f.type === "password") model[f.key] = "";
});
</script>
<template>
  <v-form
    ref="form"
    :aria-label="formName"
    @submit.prevent="submit"
    :disabled="disabled"
    class="demo-form"
    ><div
      :class="[
        'demo-field-grid',
        {
          'two-columns': columns === 2,
          'horizontal-fields': horizontal,
          'right-aligned-labels': alignRight,
        },
      ]"
    >
      <template
        v-for="(field, i) in fields"
        :key="field.key || field.section || i"
        ><h3 v-if="field.section" class="demo-form-section">
          {{ field.section }}
        </h3>
        <div v-else :class="['demo-field', { wide: field.wide }]">
          <label :for="id + '-' + field.key">{{ field.label }}</label>
          <div>
            <v-select
              v-if="field.items"
              v-model="model[field.key]"
              :id="id + '-' + field.key"
              :aria-label="field.label"
              :items="field.items"
              :rules="rules(field)"
              :disabled="field.disabled || disabled"
              :readonly="field.readonly"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
            /><v-radio-group
              v-else-if="field.kind === 'radio'"
              v-model="model[field.key]"
              inline
              :aria-label="field.label"
              :rules="rules(field)"
              hide-details="auto"
              ><v-radio
                v-for="option in field.options"
                :key="option"
                :label="option"
                :value="option"
                color="primary" /></v-radio-group
            ><v-checkbox
              v-else-if="field.kind === 'checkbox'"
              v-model="model[field.key]"
              :label="field.caption || field.label"
              :rules="rules(field)"
              color="primary"
              hide-details="auto"
            /><v-textarea
              v-else-if="field.kind === 'textarea'"
              v-model="model[field.key]"
              :id="id + '-' + field.key"
              :aria-label="field.label"
              :placeholder="field.placeholder"
              :rules="rules(field)"
              variant="outlined"
              rows="2"
              hide-details="auto"
              ><template v-if="icons" #prepend-inner
                ><Icon
                  :name="field.icon || 'file'"
                  :size="18" /></template></v-textarea
            ><v-text-field
              v-else
              v-model="model[field.key]"
              :id="id + '-' + field.key"
              :aria-label="field.label"
              :type="field.type || 'text'"
              :placeholder="field.placeholder"
              :rules="rules(field)"
              :readonly="field.readonly"
              :disabled="field.disabled || disabled"
              :autocomplete="field.type === 'password' ? 'off' : undefined"
              variant="outlined"
              density="comfortable"
              hide-details="auto"
              ><template v-if="icons && !rightIcons" #prepend-inner
                ><Icon :name="field.icon || 'user'" :size="18" /></template
              ><template v-if="icons && rightIcons" #append-inner
                ><Icon :name="field.icon || 'user'" :size="18" /></template
            ></v-text-field>
            <p v-if="field.hint" class="field-help">{{ field.hint }}</p>
          </div>
        </div></template
      >
    </div>
    <v-checkbox
      v-if="remember"
      v-model="consent"
      label="Check Me Out!"
      color="primary"
      density="compact"
      hide-details
      class="mt-4"
    /><v-alert
      v-if="submitted"
      type="success"
      variant="tonal"
      density="compact"
      class="mt-5"
      role="status"
      >Form validated locally. Nothing was sent or saved. Password fields were
      cleared.</v-alert
    >
    <div class="demo-form-actions">
      <v-btn color="primary" type="submit" :disabled="disabled">{{
        submitLabel
      }}</v-btn
      ><v-btn
        v-if="cancel"
        color="error"
        variant="tonal"
        :disabled="disabled"
        @click="reset"
        >Cancel</v-btn
      >
    </div></v-form
  >
</template>
