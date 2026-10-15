<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { ChatsContext } from "./types";

defineProps<{ context: ChatsContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.chatApp"
    ><v-card
      :class="[
        context.contentConfig.texts.chatLayout,
        {
          'hide-info': !context.info,
        },
      ]"
      ><aside class="chat-contacts">
        <div class="person-cell pa-5">
          <v-avatar size="44"
            ><img
              :src="context.avatar(1)"
              :alt="context.contentConfig.texts.davidMcMichael"
          /></v-avatar>
          <div>
            <strong>{{ context.contentConfig.texts.davidMcMichael }}</strong
            ><span>{{ context.contentConfig.texts.designer }}</span>
          </div>
        </div>
        <div class="px-5">
          <v-text-field
            v-model="context.search"
            :label="context.contentConfig.texts.searchContact"
            density="compact"
          />
          <p class="muted text-caption my-4">
            {{ context.contentConfig.texts.recentChats }}
          </p>
        </div>
        <button
          v-for="p in context.filtered"
          :key="p.id"
          :class="[
            context.contentConfig.texts.chatContact,
            {
              active: context.selected === p.id,
            },
          ]"
          @click="context.selected = p.id"
        >
          <v-avatar size="40"><img :src="p.image" :alt="p.name" /></v-avatar>
          <div>
            <strong>{{ p.name }}</strong
            ><span>{{
              p.messages.at(-1)?.text ||
              context.contentConfig.texts.startAConversation
            }}</span>
          </div>
          <i
            :class="{
              online: p.online,
            }"
          />
        </button>
      </aside>
      <section v-if="context.person" class="chat-conversation">
        <header>
          <div class="person-cell">
            <v-avatar size="42"
              ><img :src="context.person.image" :alt="context.person.name"
            /></v-avatar>
            <div>
              <strong>{{ context.person.name }}</strong
              ><span
                >{{
                  context.person.online
                    ? context.contentConfig.texts.online
                    : context.contentConfig.texts.offline
                }}{{ context.contentConfig.texts.sampleStatus }}</span
              >
            </div>
          </div>
          <v-spacer /><v-btn
            icon
            variant="text"
            size="32"
            :aria-label="context.contentConfig.texts.toggleConversationDetails"
            @click="context.info = !context.info"
            ><Icon name="menu" :size="19"
          /></v-btn>
        </header>
        <div
          :ref="(element) => (context.messages = element)"
          class="chat-messages"
        >
          <div
            v-for="m in context.person.messages"
            :key="m.id"
            :class="[
              context.contentConfig.texts.chatMessage,
              {
                own: m.own,
              },
            ]"
          >
            <small
              >{{ m.own ? context.contentConfig.texts.you : context.person.name
              }}{{ context.contentConfig.texts.text1 }}{{ m.time }}</small
            >
            <p v-if="m.text">{{ m.text }}</p>
            <img
              v-if="m.image"
              :src="m.image"
              :alt="context.contentConfig.texts.sharedLocalAttachment"
            />
          </div>
        </div>
        <form class="chat-compose" @submit.prevent="context.send()">
          <v-text-field
            v-model="context.text"
            :placeholder="context.contentConfig.texts.typeAMessage"
            :aria-label="context.contentConfig.texts.typeAMessage"
            variant="plain"
          /><v-btn
            icon
            variant="text"
            :aria-label="context.contentConfig.texts.attachImage"
            @click="context.attachment.click()"
            ><Icon name="attachment" :size="18" /></v-btn
          ><v-btn
            icon
            color="primary"
            size="36"
            type="submit"
            :disabled="!context.text.trim()"
            :aria-label="context.contentConfig.texts.sendMessage"
            ><Icon name="send" :size="18" /></v-btn
          ><input
            :ref="(element) => (context.attachment = element)"
            type="file"
            accept="image/jpeg,image/png"
            hidden
            @change="context.upload"
          />
        </form>
      </section>
      <aside v-if="context.info" class="chat-info">
        <h3>{{ context.contentConfig.texts.media }}</h3>
        <img
          :src="context.asset(context.contentConfig.texts.blogImg1)"
          :alt="context.contentConfig.texts.sampleConversationMedia"
        />
        <h3 class="mt-6 mb-4">
          {{ context.contentConfig.texts.conversationDetails }}
        </h3>
        <p class="muted">
          {{
            context.contentConfig.texts
              .messagesAndUploadedImagesStayInThisBrowserTheyAreNotDel
          }}
        </p>
        <v-chip color="primary" size="small" class="mt-5">{{
          context.contentConfig.texts.localConversation
        }}</v-chip>
      </aside></v-card
    ></WorkspacePage
  >
</template>
