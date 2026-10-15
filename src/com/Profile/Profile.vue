<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { ProfileContext } from "./types";

defineProps<{ context: ProfileContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.userProfile"
    ><v-card class="profile-cover-card"
      ><img
        :src="context.asset(context.contentConfig.texts.profilebg)"
        :alt="context.contentConfig.texts.lavenderAbstractProfileCover"
        class="profile-cover"
      />
      <div class="profile-overview">
        <div class="profile-stats">
          <div>
            <Icon name="file" :size="20" /><strong>{{
              938 + context.demo.posts.length - 3
            }}</strong
            ><span>{{ context.contentConfig.texts.posts }}</span>
          </div>
          <div>
            <Icon name="profile" :size="20" /><strong>{{
              context.contentConfig.texts.text1
            }}</strong
            ><span>{{ context.contentConfig.texts.followers }}</span>
          </div>
          <div>
            <Icon name="user" :size="20" /><strong>{{
              context.contentConfig.texts.text2
            }}</strong
            ><span>{{ context.contentConfig.texts.following }}</span>
          </div>
        </div>
        <div class="profile-identity">
          <v-avatar size="105"
            ><img
              :src="context.avatar(1)"
              :alt="context.contentConfig.texts.davidMcMichael"
          /></v-avatar>
          <h2>{{ context.contentConfig.texts.davidMcMichael }}</h2>
          <p class="muted">{{ context.contentConfig.texts.designer }}</p>
        </div>
        <div class="profile-social">
          <v-btn
            variant="tonal"
            color="primary"
            :to="context.contentConfig.texts.pagesAccountSettings"
            >{{ context.contentConfig.texts.editProfile }}</v-btn
          ><v-btn color="primary" @click="context.story = true">{{
            context.contentConfig.texts.addToStory
          }}</v-btn>
        </div>
      </div>
      <v-tabs
        color="primary"
        class="profile-navigation"
        align-tabs="end"
        model-value="/apps/user/profile"
        ><v-tab
          v-for="[name, path, icon] in context.contentConfig.values.items1"
          :key="name"
          :value="path"
          :to="path"
          ><Icon :name="icon" :size="17" class="mr-2" />{{ name }}</v-tab
        ></v-tabs
      ></v-card
    >
    <div class="profile-feed-layout">
      <aside class="stack-cards">
        <v-card class="workspace-card"
          ><h2>{{ context.contentConfig.texts.introduction }}</h2>
          <p class="muted my-5">
            {{
              context.contentConfig.texts
                .helloIAmDavidMcMichaelILoveMakingWebsitesAndGraphicsSha
            }}
          </p>
          <p
            v-for="[icon, label] in context.contentConfig.values.items2"
            :key="label"
            class="profile-info-line"
          >
            <Icon :name="icon" :size="18" />{{ label }}
          </p></v-card
        ><v-card class="workspace-card"
          ><h2 class="mb-5">{{ context.contentConfig.texts.photos }}</h2>
          <div class="profile-photos">
            <img
              v-for="i in context.contentConfig.values.items3"
              :key="i"
              :src="
                context.asset(
                  context.contentConfig.texts.s +
                    i +
                    context.contentConfig.texts.text3,
                )
              "
              :alt="context.contentConfig.texts.profileGallerySample"
            /></div
        ></v-card>
      </aside>
      <section class="stack-cards">
        <v-card class="workspace-card"
          ><v-textarea
            v-model="context.text"
            :label="context.contentConfig.texts.shareYourThoughts"
            variant="outlined"
            rows="4"
            hide-details /><img
            v-if="context.image"
            :src="context.image"
            :alt="context.contentConfig.texts.postAttachmentPreview"
            class="post-attachment" />
          <div class="post-compose-actions">
            <v-btn variant="text" @click="context.upload.click()"
              ><Icon name="grid" :size="18" class="text-primary mr-2" />{{
                context.contentConfig.texts.photoVideo
              }}</v-btn
            ><v-spacer /><v-btn
              color="primary"
              :disabled="!context.text.trim() &amp;&amp; !context.image"
              @click="context.post"
              >{{ context.contentConfig.texts.post }}</v-btn
            >
          </div>
          <input
            :ref="(element) => (context.upload = element)"
            type="file"
            accept="image/jpeg,image/png"
            hidden
            @change="context.photo" /></v-card
        ><v-card
          v-for="p in context.demo.posts"
          :key="p.id"
          class="workspace-card feed-post"
          ><div class="person-cell">
            <v-avatar size="44"
              ><img :src="p.avatar" :alt="p.author"
            /></v-avatar>
            <div>
              <strong>{{ p.author }}</strong
              ><span>{{ context.contentConfig.texts.justNowLocalPost }}</span>
            </div>
          </div>
          <p class="post-text">{{ p.text }}</p>
          <img
            v-if="p.image"
            :src="p.image"
            :alt="context.contentConfig.texts.postImage"
            class="feed-image" />
          <div class="post-reactions">
            <v-btn
              variant="text"
              :color="p.liked ? context.contentConfig.texts.error : undefined"
              @click="
                p.liked = !p.liked;
                p.likes += p.liked ? 1 : -1;
              "
              ><Icon name="heart" :size="18" class="mr-2" />{{ p.likes }}</v-btn
            ><span
              ><Icon name="chats" :size="18" />{{ p.comments.length }}</span
            >
          </div>
          <div v-for="(c, i) in p.comments" :key="i" class="feed-comment">
            <v-avatar size="30"
              ><img :src="context.avatar(2)" :alt="c.name"
            /></v-avatar>
            <div>
              <strong>{{ c.name }}</strong>
              <p>{{ c.text }}</p>
            </div>
          </div>
          <form
            class="d-flex ga-3 mt-4"
            @submit.prevent="context.addComment(p)"
          >
            <v-text-field
              v-model="context.comments[p.id]"
              :label="context.contentConfig.texts.comment"
              density="compact"
            /><v-btn
              color="primary"
              icon
              size="40"
              type="submit"
              :disabled="!context.comments[p.id]?.trim()"
              :aria-label="context.contentConfig.texts.postCommentOn + p.id"
              ><Icon name="send" :size="17"
            /></v-btn></form
        ></v-card>
      </section>
    </div>
    <v-dialog v-model="context.story"
      ><v-card class="dialog-body"
        ><h2>{{ context.contentConfig.texts.addToYourStory }}</h2>
        <p class="muted mt-2 mb-5">
          {{
            context.contentConfig.texts
              .storiesInThisDemoAreAddedToYourLocalProfileFeed
          }}
        </p>
        <v-textarea
          v-model="context.storyText"
          :label="context.contentConfig.texts.yourStory"
          variant="outlined"
          rows="4"
        />
        <div class="dialog-actions">
          <v-btn variant="text" @click="context.story = false">{{
            context.contentConfig.texts.cancel
          }}</v-btn
          ><v-btn
            color="primary"
            :disabled="!context.storyText.trim()"
            @click="
              context.text = context.storyText;
              context.post();
              context.storyText = context.contentConfig.texts.text4;
              context.story = false;
            "
            >{{ context.contentConfig.texts.shareStory }}</v-btn
          >
        </div></v-card
      ></v-dialog
    ></WorkspacePage
  >
</template>
