<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { PeopleContext } from "./types";

defineProps<{ context: PeopleContext }>();
</script>

<template>
  <WorkspacePage :title="context.title" data-batch="3"
    ><component :is="context.ProfileHeader" v-if="!context.isSocial" />
    <div class="b3-list-heading">
      <h2>
        {{ context.title }}
        <v-chip color="secondary" size="small">{{
          context.people.length
        }}</v-chip>
      </h2>
      <v-text-field
        v-model="context.query"
        :label="context.contentConfig.texts.search + context.title"
        density="compact"
        ><template #prepend-inner><Icon name="search" :size="17" /></template
      ></v-text-field>
    </div>
    <div
      :class="[
        context.contentConfig.texts.b3PeopleGrid,
        {
          'b3-followers': context.isFollowers,
        },
      ]"
    >
      <v-card
        v-for="p in context.people"
        :key="p.id"
        :class="[
          context.contentConfig.texts.b3Person,
          {
            compact: context.isFollowers,
          },
        ]"
        ><div class="b3-person-main">
          <button
            :aria-label="context.contentConfig.texts.view + p.name"
            class="b3-avatar-button"
            @click="context.selected = p"
          >
            <v-avatar :size="context.isFollowers ? 48 : 82"
              ><img :src="p.avatar" :alt="p.name"
            /></v-avatar>
          </button>
          <div>
            <h3>
              <button class="text-button" @click="context.selected = p">
                {{ p.name }}
              </button>
            </h3>
            <p class="muted text-caption mt-1">{{ p.place || p.job }}</p>
          </div>
        </div>
        <v-btn
          v-if="context.isFollowers"
          :variant="
            context.pageDemos.following.includes(p.id)
              ? context.contentConfig.texts.flat
              : context.contentConfig.texts.outlined
          "
          color="primary"
          size="small"
          :aria-label="
            (context.pageDemos.following.includes(p.id)
              ? context.contentConfig.texts.unfollow
              : context.contentConfig.texts.follow) + p.name
          "
          @click="context.toggleFollow(p.id)"
          >{{
            context.pageDemos.following.includes(p.id)
              ? context.contentConfig.texts.followed
              : context.contentConfig.texts.follow2
          }}</v-btn
        >
        <div v-else class="b3-social-buttons">
          <v-btn
            v-for="[icon, label] in context.contentConfig.values.items1"
            :key="label"
            icon
            size="30"
            variant="text"
            :color="
              label === context.contentConfig.texts.connect
                ? context.contentConfig.texts.error
                : context.contentConfig.texts.primary
            "
            :aria-label="label + context.contentConfig.texts.text1 + p.name"
            @click="context.selected = p"
            ><Icon :name="icon" :size="16"
          /></v-btn></div
      ></v-card>
    </div>
    <v-card v-if="!context.people.length" class="workspace-empty">{{
      context.contentConfig.texts.noMatchingPeople
    }}</v-card
    ><v-dialog
      :model-value="!!context.selected"
      @update:model-value="context.selected = null"
      ><v-card v-if="context.selected" class="dialog-body"
        ><div class="person-cell">
          <v-avatar size="70"
            ><img :src="context.selected.avatar" :alt="context.selected.name"
          /></v-avatar>
          <div>
            <h2>{{ context.selected.name }}</h2>
            <p class="muted">
              {{ context.selected.place || context.selected.job }}
            </p>
          </div>
        </div>
        <p class="my-5">
          {{
            context.contentConfig.texts
              .sampleCommunityProfileConnectionsAndMessagesInThisRecre
          }}
        </p>
        <div class="dialog-actions">
          <v-btn variant="text" @click="context.selected = null">{{
            context.contentConfig.texts.close
          }}</v-btn
          ><v-btn
            color="primary"
            @click="
              context.notify(
                context.contentConfig.texts
                  .demoConnectionRequestNotedLocallyNoNotificationWasSent,
              );
              context.selected = null;
            "
            >{{ context.contentConfig.texts.connect }}</v-btn
          ><v-btn
            :to="context.contentConfig.texts.appsChats"
            variant="tonal"
            color="primary"
            >{{ context.contentConfig.texts.openDemoChats }}</v-btn
          >
        </div></v-card
      ></v-dialog
    ></WorkspacePage
  >
</template>
