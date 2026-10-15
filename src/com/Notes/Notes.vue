<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { NotesContext } from "./types";

defineProps<{ context: NotesContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.notesApp"
    ><v-card class="notes-layout"
      ><aside class="notes-list">
        <h3>{{ context.contentConfig.texts.allNotes }}</h3>
        <v-text-field
          v-model="context.search"
          :placeholder="context.contentConfig.texts.searchNotes"
          :aria-label="context.contentConfig.texts.searchNotes"
          density="compact"
          class="my-4"
        /><button
          v-for="n in context.filtered"
          :key="n.id"
          :class="[
            context.contentConfig.texts.notePreview,
            {
              selected: context.selected === n.id,
            },
          ]"
          :style="{
            '--note-color': n.color,
          }"
          @click="context.selected = n.id"
        >
          <strong>{{
            n.title || context.contentConfig.texts.untitledNote
          }}</strong>
          <p>{{ n.body }}</p>
          <span>{{ n.date }}</span
          ><v-btn
            icon
            variant="text"
            size="25"
            :aria-label="context.contentConfig.texts.delete + n.title"
            @click.stop="context.remove(n)"
            ><Icon name="trash" :size="15"
          /></v-btn>
        </button>
        <p v-if="!context.filtered.length" class="muted">
          {{ context.contentConfig.texts.noMatchingNotes }}
        </p>
      </aside>
      <section class="note-editor">
        <div class="workspace-toolbar">
          <h3>{{ context.contentConfig.texts.editNotes }}</h3>
          <v-spacer /><v-btn color="primary" @click="context.add">{{
            context.contentConfig.texts.addNotes
          }}</v-btn>
        </div>
        <template v-if="context.note"
          ><label class="field-label">{{
            context.contentConfig.texts.changeTitle
          }}</label
          ><v-text-field
            v-model="context.note.title"
            :aria-label="context.contentConfig.texts.noteTitle"
            class="mb-6"
          /><v-textarea
            v-model="context.note.body"
            :label="context.contentConfig.texts.yourNote"
            rows="10"
            auto-grow
            variant="outlined"
            hide-details
          />
          <h3 class="mt-7 mb-4">
            {{ context.contentConfig.texts.changeNotesColor }}
          </h3>
          <div class="color-choices">
            <button
              v-for="color in context.contentConfig.values.items1"
              :key="color"
              :style="{
                background: color,
              }"
              :aria-label="context.contentConfig.texts.noteColor + color"
              :aria-pressed="context.note.color === color"
              @click="context.note.color = color"
            >
              <Icon
                v-if="context.note.color === color"
                name="check"
                :size="18"
              />
            </button>
          </div>
          <p class="muted text-caption mt-7">
            {{
              context.contentConfig.texts.notesSaveAutomaticallyInThisBrowser
            }}
          </p></template
        >
        <div v-else class="workspace-empty">
          <Icon name="notes" :size="40" />
          <h3>{{ context.contentConfig.texts.yourIdeasStartHere }}</h3>
          <v-btn color="primary" @click="context.add">{{
            context.contentConfig.texts.createANote
          }}</v-btn>
        </div>
      </section></v-card
    ></WorkspacePage
  >
</template>
