<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Treeview/Treeview.vue";
import type { TreeviewContext } from "../../com/Treeview/types";
import { ref } from "vue";
import { VTreeview } from "vuetify/components";
import FormPage from "../../com/ui/FormPage.vue";
import ExampleCard from "../../com/ui/ExampleCard.vue";
const active = ref([]);
let id = 0;
function node(title, children) {
  return {
    id: ++id,
    title,
    ...(children
      ? {
          children,
        }
      : {}),
  };
}
const items = [
  node("Applications :", [
    node("Calendar : app"),
    node("Chrome : app"),
    node("Webstorm : app"),
  ]),
  node("Documents :", [
    node("vuetify :", [
      node("src :", [node("index : ts"), node("bootstrap : ts")]),
    ]),
    node("material2 :", [
      node("src :", [
        node("v-btn : ts"),
        node("v-card : ts"),
        node("v-window : ts"),
      ]),
    ]),
  ]),
  node("Downloads :", [
    node("October : pdf"),
    node("November : pdf"),
    node("Tutorial : html"),
  ]),
  node("Videos :", [
    node("Tutorials :", [
      node("Basic layouts : mp4"),
      node("Advanced techniques : mp4"),
      node("All about app : dir"),
    ]),
    node("Intro : mov"),
    node("Conference introduction : avi"),
  ]),
];
function find(nodes, key) {
  for (const n of nodes) {
    if (n.id === key) return n.title;
    const child = n.children && find(n.children, key);
    if (child) return child;
  }
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: TreeviewContext = __viewReactive({
  get active() {
    return __viewUnref(active);
  },
  set active(value: any) {
    if (__viewIsRef(active)) (active as any).value = value;
  },
  get find() {
    return __viewUnref(find);
  },
  get items() {
    return __viewUnref(items);
  },
  contentConfig: {
    texts: {
      treeview: "Treeview",
      basic: "Basic",
      activatable: "Activatable",
      selected: " Selected: ",
      color: "Color",
      density: "Density",
      openAll: "Open all",
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
