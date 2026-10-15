<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import FaqList from "../ui/FaqList.vue";
import type { FaqContext } from "./types";

defineProps<{ context: FaqContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.fAQ" data-batch="3"
    ><div class="b3-centered-heading">
      <h2>{{ context.contentConfig.texts.frequentlyAskedQuestions }}</h2>
      <p>
        {{
          context.contentConfig.texts
            .getToKnowMoreAboutReadyToUseAdminDashboardTemplates
        }}
      </p>
    </div>
    <div class="b3-faq-wrap"><FaqList :items="context.faq" /></div>
    <v-card color="lightprimary" class="b3-question-card"
      ><div class="b3-avatar-stack">
        <v-avatar
          v-for="n in context.contentConfig.values.items1"
          :key="n"
          size="40"
          ><img
            :src="context.avatar(n)"
            :alt="context.contentConfig.texts.sampleTeamMember"
        /></v-avatar>
      </div>
      <h2>{{ context.contentConfig.texts.stillHaveQuestions }}</h2>
      <p>
        {{
          context.contentConfig.texts
            .canTFindTheAnswerYouReLookingForPleaseChatToOurFriendly
        }}
      </p>
      <v-btn :to="context.contentConfig.texts.appsChats" color="primary">{{
        context.contentConfig.texts.chatWithUs
      }}</v-btn></v-card
    ></WorkspacePage
  >
</template>
