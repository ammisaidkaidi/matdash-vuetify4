import type { Component } from "vue";

/**
 * External controller contract for FrontBlog.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface FrontBlogContext {
  readonly FrontLayout: Component;
  article: any;
  filtered: any;
  list: any;
  query: string;
  readonly contentConfig: {
    readonly texts: {
      readonly latestBlogNews: string;
      readonly ourMostRecentArticles: string;
      readonly frontPageHomepage: string;
      readonly mATDASH: string;
      readonly text1: string;
      readonly bLOGPAGE: string;
      readonly bLOGDETAILS: string;
      readonly searchArticles: string;
      readonly frontPageBlog: string;
      readonly text2: string;
      readonly text3: string;
      readonly noArticlesMatchYourSearch: string;
      readonly titleOfTheParagraph: string;
      readonly thoughtfulDesignMakesTechnologyFeelMoreApproachableFrom: string;
      readonly findingTheRightProductMeansLookingBeyondTheHeadlineCons: string;
      readonly thisIsStrongText: string;
      readonly thisIsItalicText: string;
      readonly unorderedList: string;
      readonly focusOnTheFeaturesThatMatterMost: string;
      readonly compareQualityUsabilityAndLongTermValue: string;
      readonly lookForThoughtfulDetailsAndDependableSupport: string;
      readonly orderedList: string;
      readonly exploreYourOptionsAndCollectInspiration: string;
      readonly reviewTheDetailsAndCompareYourShortlist: string;
      readonly makeAConsideredChoiceThatWorksForYou: string;
      readonly quotes: string;
      readonly lifeIsShortSmileWhileYouStillHaveTeeth: string;
      readonly illustrativeArticleCopyForThisFrontEndRecreation: string;
      readonly frontPageBlogPosts: string;
      readonly backToArticles: string;
      readonly articleNotFound: string;
      readonly browseArticles: string;
    };
    readonly values: {};
  };
}
