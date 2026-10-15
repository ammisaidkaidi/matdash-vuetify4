<script setup>
import { ref } from "vue";
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  id: String,
  items: Array,
  rules: { type: Array, default: () => [] },
  password: Boolean,
  type: { type: String, default: "text" },
  hint: String,
  placeholder: String,
});
defineEmits(["update:modelValue"]);
const visible = ref(false);
</script>
<template>
  <div class="settings-field">
    <label :for="id">{{ label }}</label
    ><v-select
      v-if="items"
      :id="id"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :items="items"
      :rules="rules"
      :aria-label="label"
      variant="outlined"
      density="comfortable"
      hide-details="auto"
    /><v-text-field
      v-else
      :id="id"
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      :type="password ? (visible ? 'text' : 'password') : type"
      :rules="rules"
      :placeholder="placeholder"
      :aria-label="label"
      :autocomplete="password ? 'off' : undefined"
      density="comfortable"
      variant="outlined"
      hide-details="auto"
      validate-on="blur"
      ><template v-if="password" #append-inner
        ><v-btn
          icon
          size="28"
          variant="text"
          :aria-label="(visible ? 'Hide ' : 'Show ') + label"
          @click="visible = !visible"
          ><Icon
            :name="visible ? 'eyeoff' : 'eye'"
            :size="18" /></v-btn></template
    ></v-text-field>
    <p v-if="hint" class="field-hint">{{ hint }}</p>
  </div>
</template>
