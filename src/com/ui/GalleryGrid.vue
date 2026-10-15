<script setup>
import { ref, computed } from "vue";
import { gallery } from "../../data/batch03";
defineProps({ searchable: Boolean });
const query = ref(""),
  open = ref(false),
  index = ref(0);
const filtered = computed(() =>
  gallery.filter((p) =>
    p.name.toLowerCase().includes(query.value.toLowerCase()),
  ),
);
const current = computed(() => filtered.value[index.value]);
function move(n) {
  index.value =
    (index.value + n + filtered.value.length) % filtered.value.length;
}
</script>
<template>
  <div v-if="searchable" class="b3-list-heading">
    <h2>
      Gallery
      <v-chip size="small" color="secondary">{{ filtered.length }}</v-chip>
    </h2>
    <v-text-field
      v-model="query"
      label="Search gallery"
      density="compact"
      clearable
      @update:model-value="query = query || ''"
    />
  </div>
  <div class="b3-gallery-grid">
    <v-card
      v-for="(photo, i) in filtered"
      :key="photo.id"
      class="b3-gallery-card"
      ><button
        class="b3-photo-button"
        :aria-label="'Open ' + photo.name"
        @click="
          index = i;
          open = true;
        "
      >
        <img :src="photo.image" :alt="photo.name" loading="lazy" />
      </button>
      <div class="pa-4">
        <h3>{{ photo.name }}</h3>
        <p class="muted text-caption mt-1">{{ photo.date }}</p>
      </div></v-card
    >
  </div>
  <p v-if="!filtered.length" class="workspace-empty">No matching images.</p>
  <v-dialog
    v-model="open"
    max-width="1000"
    @keydown.left.prevent="move(-1)"
    @keydown.right.prevent="move(1)"
    ><v-card v-if="current" class="b3-lightbox"
      ><header>
        <div>
          <h2>{{ current.name }}</h2>
          <small
            >Sample image {{ index + 1 }} of {{ filtered.length }} · Original
            filenames are illustrative.</small
          >
        </div>
        <v-btn
          icon
          variant="text"
          aria-label="Close image"
          @click="open = false"
          ><Icon name="close"
        /></v-btn>
      </header>
      <img :src="current.image" :alt="current.name" />
      <footer>
        <v-btn variant="tonal" aria-label="Previous image" @click="move(-1)"
          ><Icon name="back" /></v-btn
        ><v-btn
          :href="current.image"
          :download="current.image.split('/').at(-1)"
          color="primary"
          variant="text"
          >Download image</v-btn
        ><v-btn variant="tonal" aria-label="Next image" @click="move(1)"
          ><Icon name="right"
        /></v-btn></footer></v-card
  ></v-dialog>
</template>
