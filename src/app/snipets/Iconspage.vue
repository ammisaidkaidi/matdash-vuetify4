<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Icons/Icons.vue";
import type { IconsContext } from "../../com/Icons/types";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { VPagination } from "vuetify/components";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import { notify } from "../../composables/useFeedback";
const set = useRoute().path.endsWith("solar") ? "solar" : "tabler";
const data = ref(null),
  error = ref(""),
  query = ref(""),
  page = ref(1),
  selected = ref(null),
  copied = ref(false);
const names = computed(() =>
  Object.keys(data.value?.icons || {}).filter((n) =>
    n.includes(query.value.toLowerCase().trim()),
  ),
);
const shown = computed(() =>
  names.value.slice((page.value - 1) * 60, page.value * 60),
);
watch(query, () => (page.value = 1));
async function load() {
  error.value = "";
  try {
    const response = await fetch("/icons/" + set + ".json");
    if (!response.ok) throw Error("Unable to load local icons.");
    data.value = await response.json();
  } catch (e) {
    error.value = e.message;
  }
}
onMounted(load);
function svg(name) {
  const icon = data.value.icons[name];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.width || data.value.width || 24} ${icon.height || data.value.height || 24}" width="24" height="24"><metadata>${data.value.attribution.name} by ${data.value.attribution.author.name}; ${data.value.attribution.license.title}; ${data.value.attribution.license.url}</metadata>${icon.body}</svg>`;
}
async function copy() {
  try {
    await navigator.clipboard.writeText(set + ":" + selected.value);
    copied.value = true;
    notify("Icon name copied.");
  } catch {
    notify(
      "Clipboard access blocked. Select and copy the icon name below.",
      "warning",
    );
  }
}
function download() {
  const url = URL.createObjectURL(
    new Blob([svg(selected.value)], {
      type: "image/svg+xml",
    }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = set + "-" + selected.value + ".svg";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: IconsContext = __viewReactive({
  get copied() {
    return __viewUnref(copied);
  },
  set copied(value: any) {
    if (__viewIsRef(copied)) (copied as any).value = value;
  },
  get copy() {
    return __viewUnref(copy);
  },
  get data() {
    return __viewUnref(data);
  },
  set data(value: any) {
    if (__viewIsRef(data)) (data as any).value = value;
  },
  get download() {
    return __viewUnref(download);
  },
  get error() {
    return __viewUnref(error);
  },
  set error(value: any) {
    if (__viewIsRef(error)) (error as any).value = value;
  },
  get load() {
    return __viewUnref(load);
  },
  get names() {
    return __viewUnref(names);
  },
  set names(value: any) {
    if (__viewIsRef(names)) (names as any).value = value;
  },
  get page() {
    return __viewUnref(page);
  },
  set page(value: any) {
    if (__viewIsRef(page)) (page as any).value = value;
  },
  get query() {
    return __viewUnref(query);
  },
  set query(value: any) {
    if (__viewIsRef(query)) (query as any).value = value;
  },
  get selected() {
    return __viewUnref(selected);
  },
  set selected(value: any) {
    if (__viewIsRef(selected)) (selected as any).value = value;
  },
  get set() {
    return __viewUnref(set);
  },
  set set(value: any) {
    if (__viewIsRef(set)) (set as any).value = value;
  },
  get shown() {
    return __viewUnref(shown);
  },
  set shown(value: any) {
    if (__viewIsRef(shown)) (shown as any).value = value;
  },
  get svg() {
    return __viewUnref(svg);
  },
  contentConfig: {
    texts: {
      solar: "solar",
      solarIcons: "Solar Icons",
      tablerIcons: "Tabler Icons",
      solar2: "Solar",
      tabler: "Tabler",
      iconLibrary: " icon library",
      locallyBundledSVGsNoExternalEmbed:
        " Locally bundled SVGs · No external embed ",
      filterIcons: "Filter icons",
      text1: " · ",
      matchingIcons: " matching icons ",
      retry: "Retry",
      noIconsMatchYourSearch: " No icons match your search. ",
      text2: ":",
      iconName: "Icon name",
      retainRequiredAttributionWhenUsingThisIcon:
        ". Retain required attribution when using this icon. ",
      close: "Close",
      copied: "Copied",
      copyName: "Copy name",
      downloadSVG: "Download SVG",
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
