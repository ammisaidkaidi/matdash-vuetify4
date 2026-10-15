<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { asset, avatar } from "../../data/app-seed";
import { demo, nextId } from "../../composables/useDemoStore";
import { notify } from "../../composables/useFeedback";
const route = useRoute(),
  story = ref(false),
  text = ref("");
function share() {
  demo.posts.unshift({
    id: nextId(demo.posts),
    author: "David McMichael",
    avatar: avatar(1),
    text: text.value.trim(),
    likes: 0,
    liked: false,
    comments: [],
  });
  story.value = false;
  text.value = "";
  notify("Story added to your local profile feed.");
}
</script>
<template>
  <v-card class="profile-cover-card"
    ><img
      :src="asset('profilebg-')"
      alt="Lavender abstract profile cover"
      class="profile-cover"
    />
    <div class="profile-overview">
      <div class="profile-stats">
        <div
          v-for="[n, label, icon] in [
            [938 + demo.posts.length - 3, 'Posts', 'file'],
            ['3,586', 'Followers', 'profile'],
            ['2,659', 'Following', 'user'],
          ]"
          :key="label"
        >
          <Icon :name="icon" :size="20" /><strong>{{ n }}</strong
          ><span>{{ label }}</span>
        </div>
      </div>
      <div class="profile-identity">
        <v-avatar size="105"
          ><img :src="avatar(1)" alt="David McMichael"
        /></v-avatar>
        <h2>David McMichael</h2>
        <p class="muted">Designer</p>
      </div>
      <div class="profile-social">
        <v-btn variant="tonal" color="primary" to="/pages/account-settings"
          >Edit Profile</v-btn
        ><v-btn color="primary" @click="story = true">Add To Story</v-btn>
      </div>
    </div>
    <v-tabs
      :model-value="route.path"
      color="primary"
      class="profile-navigation"
      align-tabs="end"
      ><v-tab
        v-for="[name, path, icon] in [
          ['Profile', '/apps/user/profile', 'profile'],
          ['Followers', '/apps/user/profile/followers', 'heart'],
          ['Friends', '/apps/user/profile/friends', 'user'],
          ['Gallery', '/apps/user/profile/gallery', 'grid'],
        ]"
        :key="path"
        :value="path"
        :to="path"
        ><Icon :name="icon" :size="17" class="mr-2" />{{ name }}</v-tab
      ></v-tabs
    ></v-card
  ><v-dialog v-model="story"
    ><v-card class="dialog-body"
      ><h2>Add to your story</h2>
      <p class="muted my-4">
        Stories in this demo are added to your local profile feed.
      </p>
      <v-textarea v-model="text" label="Your story" variant="outlined" />
      <div class="dialog-actions">
        <v-btn variant="text" @click="story = false">Cancel</v-btn
        ><v-btn color="primary" :disabled="!text.trim()" @click="share"
          >Share Story</v-btn
        >
      </div></v-card
    ></v-dialog
  >
</template>
