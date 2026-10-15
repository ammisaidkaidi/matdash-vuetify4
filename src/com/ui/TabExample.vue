<script setup>
import { ref, computed } from "vue";
import { mdiArrowLeftBold, mdiArrowRightBold } from "@mdi/js";
import ExampleCard from "./ExampleCard.vue";
const props = defineProps({ title: String });
const active = ref(0);
const labels = computed(() =>
  props.title === "Center Active"
    ? [
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
      ]
    : props.title === "Custom Icons"
      ? Array.from({ length: 30 }, (_, i) => "Item " + (i + 1))
      : props.title === "Stacked"
        ? ["Recents", "Favorites", "Nearby"]
        : props.title.startsWith("Align")
          ? ["Landscape", "Products", "Abstract"]
          : ["Item One", "Item Two", "Item Three"],
);
const iconNames = ["clock", "heart", "globe"];
</script>
<template>
  <ExampleCard :title="title"
    ><v-tabs
      v-model="active"
      :bg-color="
        ['Basic', 'Stacked', 'Center Active', 'Custom Icons'].includes(title)
          ? 'primary'
          : undefined
      "
      :color="title === 'Colors' ? 'secondary' : undefined"
      :align-tabs="
        title === 'Align Center'
          ? 'center'
          : title === 'Align End'
            ? 'end'
            : 'start'
      "
      :center-active="title === 'Center Active'"
      :show-arrows="title === 'Custom Icons' || title === 'Center Active'"
      :prev-icon="title === 'Custom Icons' ? mdiArrowLeftBold : undefined"
      :next-icon="title === 'Custom Icons' ? mdiArrowRightBold : undefined"
      ><v-tab
        v-for="(label, i) in labels"
        :key="label"
        :value="i"
        :disabled="title === 'Disabled' && i === 1"
        :stacked="title === 'Stacked'"
        :aria-label="title === 'Icon' ? label : undefined"
        ><Icon
          v-if="title === 'Stacked' || title === 'Icon'"
          :name="iconNames[i % 3]"
          :size="20"
        /><span v-if="title !== 'Icon'">{{ label }}</span></v-tab
      ></v-tabs
    >
    <div
      class="b5-tab-content"
      role="tabpanel"
      :aria-label="title + ' selected content'"
      aria-live="polite"
    >
      <h3>{{ labels[active] }}</h3>
      <p v-if="title.startsWith('Align')" class="muted mt-3">
        {{
          [
            "Browse the details of this example. Switch tabs to explore another view.",
            "A product-focused view with its own selected state.",
            "A space for creative ideas and abstract inspiration.",
          ][active]
        }}
      </p>
    </div></ExampleCard
  >
</template>
