<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Autocomplete/Autocomplete.vue";
import type { AutocompleteContext } from "../../com/Autocomplete/types";
import { ref } from "vue";
import { VAutocomplete } from "vuetify/components";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const films = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "Forrest Gump",
  "Fight Club",
  "Inception",
  "Interstellar",
];
const addresses = [
  "demo@company.com",
  "design@company.com",
  "support@company.com",
  "hello@matdash.com",
];
const film = ref("The Dark Knight"),
  caption = ref("demo@company.com"),
  iconEmail = ref("demo@company.com"),
  multi = ref(["The Dark Knight", "Fight Club"]);

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: AutocompleteContext = __viewReactive({
  get addresses() {
    return __viewUnref(addresses);
  },
  get caption() {
    return __viewUnref(caption);
  },
  set caption(value: any) {
    if (__viewIsRef(caption)) (caption as any).value = value;
  },
  get film() {
    return __viewUnref(film);
  },
  set film(value: any) {
    if (__viewIsRef(film)) (film as any).value = value;
  },
  get films() {
    return __viewUnref(films);
  },
  get iconEmail() {
    return __viewUnref(iconEmail);
  },
  set iconEmail(value: any) {
    if (__viewIsRef(iconEmail)) (iconEmail as any).value = value;
  },
  get multi() {
    return __viewUnref(multi);
  },
  set multi(value: any) {
    if (__viewIsRef(multi)) (multi as any).value = value;
  },
  contentConfig: {
    texts: {
      autocomplete: "Autocomplete",
      comboBox: "Combo Box",
      favoriteFilm: "Favorite film",
      noMatchingFilms: "No matching films",
      withCaption: "With Caption",
      emailAddress: "Email Address",
      emailAddressWithIcon: "Email Address with icon",
      comboWithMultipleOptions: "Combo with Multiple Options",
      outlined: "Outlined",
    },
    values: {},
  },
});
</script>

<template>
  <PresentationalView :context="__viewContext">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </PresentationalView>
</template>
