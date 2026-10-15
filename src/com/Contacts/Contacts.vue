<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { ContactsContext } from "./types";

defineProps<{ context: ContactsContext }>();
</script>

<template>
  <WorkspacePage :title="context.props.title"
    ><v-card class="workspace-card"
      ><h2 v-if="context.props.heading" class="mb-6">
        {{ context.props.heading }}
      </h2>
      <div class="workspace-toolbar">
        <v-text-field
          v-model="context.search"
          :label="context.contentConfig.texts.searchContacts"
          density="compact"
          clearable
          ><template #prepend-inner
            ><Icon name="search" :size="18" /></template></v-text-field
        ><v-spacer /><v-btn color="primary" @click="context.edit()"
          ><Icon name="user" :size="17" class="mr-2" />{{
            context.contentConfig.texts.addContact
          }}</v-btn
        >
      </div>
      <v-data-table
        :headers="context.headers"
        :items="context.demo.contacts"
        :search="context.search"
        :items-per-page="10"
        class="workspace-table"
        ><template #item.id="{ item }"
          >{{ context.contentConfig.texts.text1 }}{{ item.id }}</template
        ><template #item.name="{ item }"
          ><div class="person-cell">
            <v-avatar size="42"
              ><img :src="item.image" :alt="item.name"
            /></v-avatar>
            <div>
              <strong>{{ item.name }}</strong
              ><span>{{ item.email }}</span>
            </div>
          </div></template
        ><template #item.role="{ item }"
          ><v-chip
            :color="context.colors[item.role]"
            size="small"
            rounded="sm"
            >{{ item.role }}</v-chip
          ></template
        ><template #item.actions="{ item }"
          ><div class="row-actions">
            <v-btn
              icon
              size="32"
              variant="text"
              color="primary"
              :aria-label="context.contentConfig.texts.edit + item.name"
              @click="context.edit(item)"
              ><Icon name="edit" :size="17" /></v-btn
            ><v-btn
              icon
              size="32"
              variant="text"
              color="error"
              :aria-label="context.contentConfig.texts.delete + item.name"
              @click="context.remove(item)"
              ><Icon name="trash" :size="17"
            /></v-btn></div></template></v-data-table></v-card
    ><component
      :is="context.RecordDialog"
      v-model="context.editor"
      :title="
        context.record.id
          ? context.contentConfig.texts.editContact
          : context.contentConfig.texts.addContact
      "
      :record="context.record"
      :fields="context.fields"
      @save="context.save"
  /></WorkspacePage>
</template>
