<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Profile/Profile.vue";
import type { ProfileContext } from "../../com/Profile/types";
import { ref } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import { demo, nextId } from "../../composables/useDemoStore";
import { avatar, asset } from "../../data/app-seed";
import { notify } from "../../composables/useFeedback";
const text = ref(""),
  comments = ref({}),
  upload = ref(null),
  image = ref(""),
  story = ref(false),
  storyText = ref("");
function post() {
  if (!text.value.trim() && !image.value) return;
  demo.posts.unshift({
    id: nextId(demo.posts),
    author: "David McMichael",
    avatar: avatar(1),
    text: text.value.trim(),
    image: image.value,
    likes: 0,
    liked: false,
    comments: [],
  });
  text.value = "";
  image.value = "";
  notify("Post saved locally.");
}
function addComment(p) {
  if (!comments.value[p.id]?.trim()) return;
  p.comments.push({
    name: "David McMichael",
    text: comments.value[p.id].trim(),
  });
  comments.value[p.id] = "";
}
function photo(e) {
  const f = e.target.files?.[0];
  if (!f) return;
  if (!["image/jpeg", "image/png"].includes(f.type) || f.size > 800 * 1024)
    return notify("Choose a JPG or PNG up to 800 KB.", "error");
  const r = new FileReader();
  r.onload = () => (image.value = r.result);
  r.readAsDataURL(f);
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: ProfileContext = __viewReactive({
  get addComment() {
    return __viewUnref(addComment);
  },
  get asset() {
    return __viewUnref(asset);
  },
  get avatar() {
    return __viewUnref(avatar);
  },
  get comments() {
    return __viewUnref(comments);
  },
  set comments(value: any) {
    if (__viewIsRef(comments)) (comments as any).value = value;
  },
  get demo() {
    return __viewUnref(demo);
  },
  get image() {
    return __viewUnref(image);
  },
  set image(value: any) {
    if (__viewIsRef(image)) (image as any).value = value;
  },
  get photo() {
    return __viewUnref(photo);
  },
  get post() {
    return __viewUnref(post);
  },
  get story() {
    return __viewUnref(story);
  },
  set story(value: any) {
    if (__viewIsRef(story)) (story as any).value = value;
  },
  get storyText() {
    return __viewUnref(storyText);
  },
  set storyText(value: any) {
    if (__viewIsRef(storyText)) (storyText as any).value = value;
  },
  get text() {
    return __viewUnref(text);
  },
  set text(value: any) {
    if (__viewIsRef(text)) (text as any).value = value;
  },
  get upload() {
    return __viewUnref(upload);
  },
  set upload(value: any) {
    if (__viewIsRef(upload)) (upload as any).value = value;
  },
  contentConfig: {
    texts: {
      userProfile: "User Profile",
      profilebg: "profilebg-",
      lavenderAbstractProfileCover: "Lavender abstract profile cover",
      posts: "Posts",
      text1: "3,586",
      followers: "Followers",
      text2: "2,659",
      following: "Following",
      davidMcMichael: "David McMichael",
      designer: "Designer",
      pagesAccountSettings: "/pages/account-settings",
      editProfile: "Edit Profile",
      addToStory: "Add To Story",
      introduction: "Introduction",
      helloIAmDavidMcMichaelILoveMakingWebsitesAndGraphicsSha:
        " Hello, I am David McMichael. I love making websites and graphics. Sharing ideas, learning new things, and building thoughtful experiences. ",
      photos: "Photos",
      s: "s",
      text3: "-",
      profileGallerySample: "Profile gallery sample",
      shareYourThoughts: "Share your thoughts",
      postAttachmentPreview: "Post attachment preview",
      photoVideo: "Photo / Video",
      post: "Post",
      justNowLocalPost: "Just now · Local post",
      postImage: "Post image",
      error: "error",
      comment: "Comment",
      postCommentOn: "Post comment on ",
      addToYourStory: "Add to your story",
      storiesInThisDemoAreAddedToYourLocalProfileFeed:
        " Stories in this demo are added to your local profile feed. ",
      yourStory: "Your story",
      cancel: "Cancel",
      text4: "",
      shareStory: "Share Story",
    },
    values: {
      items1: [
        ["Profile", "/apps/user/profile", "profile"],
        ["Followers", "/apps/user/profile/followers", "heart"],
        ["Friends", "/apps/user/profile/friends", "user"],
        ["Gallery", "/apps/user/profile/gallery", "grid"],
      ],
      items2: [
        ["invoice", "Sir, P P Institute Of Science"],
        ["email", "xyzjonathan@gmail.com"],
        ["monitor", "www.xyz.com"],
        ["home", "Newyork, USA - 100001"],
      ],
      items3: [1, 2, 3, 4, 5, 6],
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
