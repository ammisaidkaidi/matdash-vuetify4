<script setup>
import { ref, watch } from "vue";
import { clone } from "../../composables/useDemoStore";
import { required, validEmail } from "../../composables/useFeedback";
const props = defineProps({
  modelValue: Boolean,
  title: String,
  record: Object,
  fields: Array,
  saveLabel: { type: String, default: "Save" },
});
const emit = defineEmits(["update:modelValue", "save"]);
const form = ref(null),
  draft = ref({});
watch(
  () => props.modelValue,
  (value) => {
    if (value) draft.value = clone(props.record || {});
  },
);
async function submit() {
  if ((await form.value.validate()).valid) emit("save", clone(draft.value));
}
function rules(field) {
  return [
    ...(field.required ? [required] : []),
    ...(field.type === "email" ? [validEmail] : []),
  ];
}
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    max-width="580"
    ><v-card class="dialog-body"
      ><div class="dialog-title">
        <h2>{{ title }}</h2>
        <v-btn
          icon
          variant="text"
          size="small"
          aria-label="Close editor"
          @click="emit('update:modelValue', false)"
          ><Icon name="close"
        /></v-btn>
      </div>
      <v-form ref="form" @submit.prevent="submit"
        ><div class="record-fields">
          <template v-for="field in fields" :key="field.key"
            ><v-select
              v-if="field.items"
              v-model="draft[field.key]"
              :items="field.items"
              :label="field.label"
              :rules="rules(field)"
              hide-details="auto" /><v-textarea
              v-else-if="field.type === 'textarea'"
              v-model="draft[field.key]"
              :label="field.label"
              :rules="rules(field)"
              variant="outlined"
              rows="3"
              hide-details="auto" /><v-text-field
              v-else
              v-model="draft[field.key]"
              :label="field.label"
              :type="field.type || 'text'"
              :rules="rules(field)"
              hide-details="auto"
          /></template>
        </div>
        <div class="dialog-actions">
          <v-btn variant="text" @click="emit('update:modelValue', false)"
            >Cancel</v-btn
          ><v-btn color="primary" type="submit">{{ saveLabel }}</v-btn>
        </div></v-form
      ></v-card
    ></v-dialog
  >
</template>
