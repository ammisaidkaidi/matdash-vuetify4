<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Faq/Faq.vue";
import type { FaqContext } from "../../com/Faq/types";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import FaqList from "../../com/ui/FaqList.vue";
import { faq } from "../../data/batch03";
import { avatar } from "../../data/app-seed";

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: FaqContext = __viewReactive({
  get avatar() {
    return __viewUnref(avatar);
  },
  get faq() {
    return __viewUnref(faq);
  },
  contentConfig: {
    texts: {
      fAQ: "FAQ",
      frequentlyAskedQuestions: "Frequently asked questions",
      getToKnowMoreAboutReadyToUseAdminDashboardTemplates:
        "Get to know more about ready-to-use admin dashboard templates",
      sampleTeamMember: "Sample team member",
      stillHaveQuestions: "Still have questions",
      canTFindTheAnswerYouReLookingForPleaseChatToOurFriendly:
        " Can't find the answer you're looking for? Please chat to our friendly team. ",
      appsChats: "/apps/chats",
      chatWithUs: "Chat With Us",
    },
    values: {
      items1: [2, 3, 4],
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
