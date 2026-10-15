<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/FrontBlog/FrontBlog.vue";
import type { FrontBlogContext } from "../../com/FrontBlog/types";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import FrontLayout from "../../com/ui/FrontLayout.vue";
import { articles, asset, avatar } from "../../data/app-seed";
const route = useRoute(),
  list = route.path.endsWith("/posts"),
  query = ref("");
const all = [
  ...articles.slice(2),
  {
    id: 10,
    title: "COVID outbreak deepens as more lockdowns loom in China",
    category: "Health",
    image: asset("blog-img7-"),
    slug: "covid-outbreak-deepens-as-more-lockdowns-loom-in-china",
    author: "Robert Murray",
    avatar: avatar(3),
    date: "2026-10-10",
    views: 8262,
  },
  ...articles.slice(0, 2),
];
const filtered = computed(() =>
  all.filter((a) =>
    `${a.title} ${a.category}`
      .toLowerCase()
      .includes(query.value.toLowerCase()),
  ),
);
const article = computed(() => all.find((a) => a.slug === route.params.slug));

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: FrontBlogContext = __viewReactive({
  get FrontLayout() {
    return __viewUnref(FrontLayout);
  },
  get article() {
    return __viewUnref(article);
  },
  set article(value: any) {
    if (__viewIsRef(article)) (article as any).value = value;
  },
  get filtered() {
    return __viewUnref(filtered);
  },
  set filtered(value: any) {
    if (__viewIsRef(filtered)) (filtered as any).value = value;
  },
  get list() {
    return __viewUnref(list);
  },
  set list(value: any) {
    if (__viewIsRef(list)) (list as any).value = value;
  },
  get query() {
    return __viewUnref(query);
  },
  set query(value: any) {
    if (__viewIsRef(query)) (query as any).value = value;
  },
  contentConfig: {
    texts: {
      latestBlogNews: "Latest blog & news",
      ourMostRecentArticles: "Our most recent articles",
      frontPageHomepage: "/front-page/homepage",
      mATDASH: "MATDASH",
      text1: "•",
      bLOGPAGE: "BLOG PAGE",
      bLOGDETAILS: "BLOG DETAILS",
      searchArticles: "Search articles",
      frontPageBlog: "/front-page/blog/",
      text2: "2 min read",
      text3: "3",
      noArticlesMatchYourSearch: "No articles match your search.",
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
      lifeIsShortSmileWhileYouStillHaveTeeth:
        " Life is short, Smile while you still have teeth! ",
      illustrativeArticleCopyForThisFrontEndRecreation:
        " Illustrative article copy for this front-end recreation. ",
      frontPageBlogPosts: "/front-page/blog/posts",
      backToArticles: "Back to articles",
      articleNotFound: "Article not found",
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
