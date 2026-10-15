<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Notes/Notes.vue";
import type { NotesContext } from "../../com/Notes/types";
import { ref, computed } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import { demo, nextId } from "../../composables/useDemoStore";
import { confirmDemo, notify } from "../../composables/useFeedback";
const search = ref(""),
  selected = ref(demo.notes[0]?.id);
const filtered = computed(() =>
  demo.notes.filter((n) =>
    (n.title + " " + n.body)
      .toLowerCase()
      .includes((search.value || "").toLowerCase()),
  ),
);
const note = computed(() => demo.notes.find((n) => n.id === selected.value));
function add() {
  const n = {
    id: nextId(demo.notes),
    title: "Untitled note",
    body: "",
    color: "#635bff",
    date: new Date().toISOString().slice(0, 10),
  };
  demo.notes.unshift(n);
  selected.value = n.id;
  search.value = "";
}
async function remove(n) {
  if (await confirmDemo("Delete this note?")) {
    demo.notes = demo.notes.filter((x) => x.id !== n.id);
    if (selected.value === n.id) selected.value = demo.notes[0]?.id;
  }
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: NotesContext = __viewReactive({
  get add() {
    return __viewUnref(add);
  },
  get filtered() {
    return __viewUnref(filtered);
  },
  set filtered(value: any) {
    if (__viewIsRef(filtered)) (filtered as any).value = value;
  },
  get note() {
    return __viewUnref(note);
  },
  set note(value: any) {
    if (__viewIsRef(note)) (note as any).value = value;
  },
  get remove() {
    return __viewUnref(remove);
  },
  get search() {
    return __viewUnref(search);
  },
  set search(value: any) {
    if (__viewIsRef(search)) (search as any).value = value;
  },
  get selected() {
    return __viewUnref(selected);
  },
  set selected(value: any) {
    if (__viewIsRef(selected)) (selected as any).value = value;
  },
  contentConfig: {
    texts: {
      notesApp: "Notes App",
      allNotes: "All Notes",
      searchNotes: "Search Notes",
      notePreview: "note-preview",
      untitledNote: "Untitled note",
      delete: "Delete ",
      noMatchingNotes: "No matching notes.",
      editNotes: "Edit Notes",
      addNotes: "Add Notes",
      changeTitle: "Change Title",
      noteTitle: "Note title",
      yourNote: "Your note",
      changeNotesColor: "Change Notes Color",
      noteColor: "Note color ",
      notesSaveAutomaticallyInThisBrowser:
        " Notes save automatically in this browser. ",
      yourIdeasStartHere: "Your ideas start here",
      createANote: "Create a note",
    },
    values: {
      items1: ["#e8bc22", "#16cdc7", "#ff6692", "#36c76c", "#635bff"],
    },
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
