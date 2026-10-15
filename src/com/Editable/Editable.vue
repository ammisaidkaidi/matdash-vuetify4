<script setup lang="ts" generic="T extends Record<string, any>">
import { ref } from "vue";
import CrudTable from "../CrudTable/Crudtable.vue";
import type { CrudField, CrudLabels, EditableHandle } from "./types";

defineOptions({ inheritAttrs: false });
defineProps<{
  fields: CrudField<T>[];
  title?: string;
  entity?: string;
  entityPlural?: string;
  itemKey?: Extract<keyof T, string>;
  itemLabel?: Extract<keyof T, string> | ((item: T) => string);
  labels?: Partial<CrudLabels>;
}>();
const items = defineModel<T[]>({ required: true });
const emit = defineEmits<{
  create: [item: T];
  update: [item: T, previous: T];
  delete: [item: T];
}>();
const table = ref<EditableHandle<T> | null>(null);
defineExpose({
  openEditor: (item?: T) => table.value?.openEditor(item),
  remove: (item: T) => table.value?.remove(item),
});
</script>

<template>
  <CrudTable
    ref="table"
    v-model="items"
    v-bind="$attrs"
    :fields="fields"
    :title="title"
    :entity="entity"
    :entity-plural="entityPlural"
    :item-key="itemKey"
    :item-label="itemLabel"
    :labels="labels"
    @create="emit('create', $event)"
    @update="(item, previous) => emit('update', item, previous)"
    @delete="emit('delete', $event)"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </CrudTable>
</template>
