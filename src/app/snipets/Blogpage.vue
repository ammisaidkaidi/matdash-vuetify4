<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Blog/Blog.vue";
import type { BlogContext } from "../../com/Blog/types";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import { articles, avatar } from "../../data/app-seed";
import { demo } from "../../composables/useDemoStore";
import { notify } from "../../composables/useFeedback";
const route = useRoute();
const list = route.path.endsWith("/posts");
const article = computed(() =>
  articles.find((a) => a.slug === route.params.slug),
);
const comment = ref("");
const comments = computed(() => demo.articleComments[article.value?.id] || []);
function post() {
  if (!comment.value.trim()) return;
  demo.articleComments[article.value.id] ??= [];
  demo.articleComments[article.value.id].push({
    id: Date.now(),
    name: "David McMichael",
    text: comment.value.trim(),
    date: new Date().toISOString().slice(0, 10),
  });
  comment.value = "";
  notify("Comment saved locally.");
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: BlogContext = __viewReactive({
  get article() {
    return __viewUnref(article);
  },
  set article(value: any) {
    if (__viewIsRef(article)) (article as any).value = value;
  },
  get articles() {
    return __viewUnref(articles);
  },
  get avatar() {
    return __viewUnref(avatar);
  },
  get comment() {
    return __viewUnref(comment);
  },
  set comment(value: any) {
    if (__viewIsRef(comment)) (comment as any).value = value;
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
  get list() {
    return __viewUnref(list);
  },
  set list(value: any) {
    if (__viewIsRef(list)) (list as any).value = value;
  },
  get post() {
    return __viewUnref(post);
  },
  contentConfig: {
    texts: {
      blogApp: "Blog app",
      blogDetails: "Blog Details",
      appsBlog: "/apps/blog/",
      linearGradient180degRgba15102806Rgba15102878Url:
        "linear-gradient(180deg,rgba(15,10,28,.06),rgba(15,10,28,.78)),url(",
      text1: ")",
      text2: "3",
      titleOfTheParagraph: "Title of the paragraph",
      thoughtfulDesignMakesTechnologyFeelMoreApproachableFrom:
        " Thoughtful design makes technology feel more approachable. From the products we use every day to the services that help us stay connected, the best experiences are clear, useful, and built around people. ",
      findingTheRightProductMeansLookingBeyondTheHeadlineCons:
        " Finding the right product means looking beyond the headline. Consider the details, compare the features that matter to you, and take the time to understand how it fits into your everyday routine. ",
      thisIsStrongText: "This is strong text.",
      thisIsItalicText: "This is italic text.",
      unorderedList: "Unordered list.",
      focusOnTheFeaturesThatMatterMost:
        "Focus on the features that matter most.",
      compareQualityUsabilityAndLongTermValue:
        "Compare quality, usability, and long-term value.",
      lookForThoughtfulDetailsAndDependableSupport:
        "Look for thoughtful details and dependable support.",
      orderedList: "Ordered list.",
      exploreYourOptionsAndCollectInspiration:
        "Explore your options and collect inspiration.",
      reviewTheDetailsAndCompareYourShortlist:
        "Review the details and compare your shortlist.",
      makeAConsideredChoiceThatWorksForYou:
        "Make a considered choice that works for you.",
      quotes: "Quotes",
      greatDesignIsTheResultOfClearThinkingAndCarefulAttentio:
        " “Great design is the result of clear thinking and careful attention to the details.” ",
      illustrativeArticleCopyForThisFrontEndRecreation:
        " Illustrative article copy for this front-end recreation. ",
      comments: "Comments ",
      writeAComment: "Write a comment",
      postComment: "Post Comment",
      articleNotFound: "Article not found",
      appsBlogPosts: "/apps/blog/posts",
      browseArticles: "Browse articles",
    },
    values: {},
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
