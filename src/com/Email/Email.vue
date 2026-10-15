<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { EmailContext } from "./types";

defineProps<{ context: EmailContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.emailApp"
    ><v-card class="email-layout"
      ><aside class="email-folders">
        <v-btn color="primary" block class="mb-5" @click="context.compose()">{{
          context.contentConfig.texts.compose
        }}</v-btn
        ><button
          v-for="name in context.folders"
          :key="name"
          :class="{
            active: context.folder === name,
          }"
          @click="context.folder = name"
        >
          {{ name
          }}<small>{{
            context.demo.mails.filter((m) => m.folder === name).length ||
            context.contentConfig.texts.text1
          }}</small>
        </button>
        <h4>{{ context.contentConfig.texts.sORTBY }}</h4>
        <button
          v-for="name in context.contentConfig.values.items1"
          :key="name"
          :class="{
            active: context.folder === name,
          }"
          @click="context.folder = name"
        >
          {{ name }}
        </button>
        <h4>{{ context.contentConfig.texts.lABELS }}</h4>
        <button
          v-for="name in context.contentConfig.values.items2"
          :key="name"
          :class="{
            active: context.folder === name,
          }"
          @click="context.folder = name"
        >
          <i
            :class="
              context.contentConfig.texts.labelDotBg + context.labelColors[name]
            "
          />{{ name }}
        </button>
      </aside>
      <section class="email-messages">
        <div class="pa-5">
          <v-text-field
            v-model="context.search"
            :label="context.contentConfig.texts.searchEmails"
            density="compact"
          />
        </div>
        <button
          v-for="m in context.filtered"
          :key="m.id"
          :class="[
            context.contentConfig.texts.emailPreview,
            {
              active: context.mail?.id === m.id,
              unread: !m.read,
            },
          ]"
          @click="context.open(m)"
        >
          <div>
            <strong>{{ m.from }}</strong
            ><v-chip
              :color="context.labelColors[m.label]"
              size="x-small"
              rounded="sm"
              >{{ m.label }}</v-chip
            >
          </div>
          <p>{{ m.subject }}</p>
          <small>{{ m.date }}</small>
        </button>
        <p v-if="!context.filtered.length" class="muted pa-6">
          {{ context.contentConfig.texts.noMessagesInThisView }}
        </p>
      </section>
      <section class="email-detail" v-if="context.mail">
        <div class="mail-actions">
          <v-btn
            icon
            variant="text"
            size="32"
            :color="
              context.mail.starred
                ? context.contentConfig.texts.warning
                : undefined
            "
            :aria-label="context.contentConfig.texts.toggleStarred"
            @click="context.mail.starred = !context.mail.starred"
            ><Icon name="star" :size="18" /></v-btn
          ><v-btn
            icon
            variant="text"
            size="32"
            :color="
              context.mail.important
                ? context.contentConfig.texts.primary
                : undefined
            "
            :aria-label="context.contentConfig.texts.toggleImportant"
            @click="context.mail.important = !context.mail.important"
            ><Icon name="info" :size="18" /></v-btn
          ><v-btn
            icon
            variant="text"
            size="32"
            :aria-label="context.contentConfig.texts.deleteEmail"
            @click="context.remove"
            ><Icon name="trash" :size="18"
          /></v-btn>
        </div>
        <div class="person-cell mt-5">
          <v-avatar size="42"
            ><img :src="context.avatar(10)" :alt="context.mail.from"
          /></v-avatar>
          <div>
            <strong>{{ context.mail.from }}</strong
            ><span>{{ context.mail.email }}</span>
          </div>
          <v-spacer /><v-chip
            :color="context.labelColors[context.mail.label]"
            size="small"
            >{{ context.mail.label }}</v-chip
          >
        </div>
        <h2 class="my-6">{{ context.mail.subject }}</h2>
        <p class="mail-body">{{ context.mail.body }}</p>
        <v-divider class="my-7" />
        <div class="d-flex ga-3">
          <v-btn variant="outlined" @click="context.compose(true)"
            ><Icon name="back" :size="16" class="mr-2" />{{
              context.contentConfig.texts.reply
            }}</v-btn
          ><v-btn variant="outlined" @click="context.compose(false, true)"
            >{{ context.contentConfig.texts.forward
            }}<Icon name="right" :size="16" class="ml-2"
          /></v-btn>
        </div>
      </section>
      <section v-else class="workspace-empty">
        <Icon name="email" :size="42" />
        <h3>{{ context.contentConfig.texts.noEmailSelected }}</h3>
      </section></v-card
    ><v-dialog v-model="context.composer" max-width="650"
      ><v-card class="dialog-body"
        ><div class="dialog-title">
          <h2>{{ context.contentConfig.texts.newMessage }}</h2>
          <v-btn
            icon
            size="30"
            variant="text"
            :aria-label="context.contentConfig.texts.closeComposer"
            @click="context.composer = false"
            ><Icon name="close"
          /></v-btn>
        </div>
        <v-form
          :ref="(element) => (context.form = element)"
          @submit.prevent="context.send"
          ><div class="record-fields">
            <v-text-field
              v-model="context.draft.to"
              :label="context.contentConfig.texts.to"
              :rules="[context.required, context.validEmail]"
              hide-details="auto"
            /><v-text-field
              v-model="context.draft.subject"
              :label="context.contentConfig.texts.subject"
              :rules="[context.required]"
              hide-details="auto"
            /><v-textarea
              v-model="context.draft.body"
              :label="context.contentConfig.texts.message"
              rows="8"
              variant="outlined"
              :rules="[context.required]"
              hide-details="auto"
            />
          </div>
          <p class="demo-caption mt-4">
            {{
              context.contentConfig.texts
                .localDemonstrationOnlyMessagesAreNotDelivered
            }}
          </p>
          <div class="dialog-actions">
            <v-btn
              variant="tonal"
              @click="context.savedMail(context.contentConfig.texts.draft)"
              >{{ context.contentConfig.texts.saveDraft }}</v-btn
            ><v-btn color="primary" type="submit">{{
              context.contentConfig.texts.sendDemoMessage
            }}</v-btn>
          </div></v-form
        ></v-card
      ></v-dialog
    ></WorkspacePage
  >
</template>
