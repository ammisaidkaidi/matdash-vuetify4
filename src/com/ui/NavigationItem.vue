<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
const props = defineProps({
  item: { type: Object, required: true },
  level: { type: Number, default: 0 },
});
const emit = defineEmits(["navigate", "category"]);
const route = useRoute();
const active = computed(
  () => props.item.path === route.meta.path || props.item.path === route.path,
);
</script>
<template>
  <v-list-group v-if="item.children" :value="item.name + '-' + level">
    <template #activator="{ props: activator }"
      ><v-list-item v-bind="activator" :title="item.name"
        ><template #prepend
          ><Icon
            :name="level ? 'circle' : item.icon"
            :size="level ? 7 : 18" /></template
        ><template #append
          ><Icon name="down" :size="17" /></template></v-list-item
    ></template>
    <NavigationItem
      v-for="(child, index) in item.children"
      :key="child.name + index"
      :item="child"
      :level="level + 1"
      @navigate="emit('navigate')"
      @category="emit('category', $event)"
    />
  </v-list-group>
  <v-list-item
    v-else
    :title="item.name"
    :to="item.path"
    :active="active"
    :class="{ 'selected-nav': active, 'child-nav': level > 0 }"
    @click="item.category ? emit('category', item.category) : emit('navigate')"
    ><template #prepend
      ><Icon
        :name="level ? 'circle' : item.icon"
        :size="level ? 7 : 18" /></template
  ></v-list-item>
</template>
