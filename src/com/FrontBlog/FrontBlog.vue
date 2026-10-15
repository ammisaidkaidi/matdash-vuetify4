<script setup lang="ts">
import Icon from "../ui/Icon.vue";
import type { FrontBlogContext } from "./types";

defineProps<{ context: FrontBlogContext }>();
</script>

<template>
  <component :is="context.FrontLayout"
    ><div class="b3-blog-hero front-container">
      <h1>
        {{
          context.list
            ? context.contentConfig.texts.latestBlogNews
            : context.contentConfig.texts.ourMostRecentArticles
        }}
      </h1>
      <p>
        <router-link :to="context.contentConfig.texts.frontPageHomepage">{{
          context.contentConfig.texts.mATDASH
        }}</router-link>
        <span>{{ context.contentConfig.texts.text1 }}</span>
        {{
          context.list
            ? context.contentConfig.texts.bLOGPAGE
            : context.contentConfig.texts.bLOGDETAILS
        }}
      </p>
    </div>
    <div class="front-container b3-blog-body">
      <template v-if="context.list"
        ><v-text-field
          v-model="context.query"
          :label="context.contentConfig.texts.searchArticles"
          density="compact"
          class="b3-blog-search mb-7"
          ><template #prepend-inner><Icon name="search" :size="18" /></template
        ></v-text-field>
        <div class="b3-three">
          <v-card v-for="a in context.filtered" :key="a.id" class="b3-blog-card"
            ><router-link
              :to="context.contentConfig.texts.frontPageBlog + a.slug"
              ><div class="b3-blog-image">
                <img :src="a.image" :alt="a.title" loading="lazy" /><v-chip
                  size="small"
                  variant="flat"
                  >{{ context.contentConfig.texts.text2 }}</v-chip
                >
              </div>
              <div class="pa-6">
                <v-avatar size="42" class="b3-blog-avatar"
                  ><img :src="a.avatar" :alt="a.author" /></v-avatar
                ><v-chip color="primary" size="small" class="mt-3">{{
                  a.category
                }}</v-chip>
                <h2 class="mt-4 mb-6">{{ a.title }}</h2>
                <div class="article-meta">
                  <span><Icon name="eye" :size="15" />{{ a.views }}</span
                  ><span
                    ><Icon name="chats" :size="15" />{{
                      context.contentConfig.texts.text3
                    }}</span
                  ><time>{{ a.date }}</time>
                </div>
              </div></router-link
            ></v-card
          >
        </div>
        <v-card v-if="!context.filtered.length" class="workspace-empty">{{
          context.contentConfig.texts.noArticlesMatchYourSearch
        }}</v-card></template
      >
      <article v-else-if="context.article" class="b3-front-article">
        <img
          :src="context.article.image"
          :alt="context.article.title"
          class="b3-article-cover"
        />
        <div class="b3-article-heading">
          <v-avatar size="50"
            ><img
              :src="context.article.avatar"
              :alt="context.article.author" /></v-avatar
          ><v-chip size="small" color="primary" class="ml-4">{{
            context.article.category
          }}</v-chip>
          <h2>{{ context.article.title }}</h2>
          <div class="article-meta">
            <span
              ><Icon name="eye" :size="17" />{{ context.article.views }}</span
            ><span
              ><Icon name="chats" :size="17" />{{
                context.contentConfig.texts.text3
              }}</span
            ><time>{{ context.article.date }}</time>
          </div>
        </div>
        <v-divider />
        <div class="article-body">
          <h2>{{ context.contentConfig.texts.titleOfTheParagraph }}</h2>
          <p>
            {{
              context.contentConfig.texts
                .thoughtfulDesignMakesTechnologyFeelMoreApproachableFrom
            }}
          </p>
          <p>
            {{
              context.contentConfig.texts
                .findingTheRightProductMeansLookingBeyondTheHeadlineCons
            }}
          </p>
          <p>
            <strong>{{ context.contentConfig.texts.thisIsStrongText }}</strong>
          </p>
          <p>
            <em>{{ context.contentConfig.texts.thisIsItalicText }}</em>
          </p>
          <h2>{{ context.contentConfig.texts.unorderedList }}</h2>
          <ul>
            <li>
              {{ context.contentConfig.texts.focusOnTheFeaturesThatMatterMost }}
            </li>
            <li>
              {{
                context.contentConfig.texts
                  .compareQualityUsabilityAndLongTermValue
              }}
            </li>
            <li>
              {{
                context.contentConfig.texts
                  .lookForThoughtfulDetailsAndDependableSupport
              }}
            </li>
          </ul>
          <h2>{{ context.contentConfig.texts.orderedList }}</h2>
          <ol>
            <li>
              {{
                context.contentConfig.texts
                  .exploreYourOptionsAndCollectInspiration
              }}
            </li>
            <li>
              {{
                context.contentConfig.texts
                  .reviewTheDetailsAndCompareYourShortlist
              }}
            </li>
            <li>
              {{
                context.contentConfig.texts.makeAConsideredChoiceThatWorksForYou
              }}
            </li>
          </ol>
          <h2>{{ context.contentConfig.texts.quotes }}</h2>
          <blockquote>
            {{
              context.contentConfig.texts.lifeIsShortSmileWhileYouStillHaveTeeth
            }}
          </blockquote>
          <p class="text-caption muted">
            {{
              context.contentConfig.texts
                .illustrativeArticleCopyForThisFrontEndRecreation
            }}
          </p>
          <v-btn
            :to="context.contentConfig.texts.frontPageBlogPosts"
            color="primary"
            variant="tonal"
            >{{ context.contentConfig.texts.backToArticles }}</v-btn
          >
        </div>
      </article>
      <v-card v-else class="workspace-empty"
        ><h2>{{ context.contentConfig.texts.articleNotFound }}</h2>
        <v-btn
          :to="context.contentConfig.texts.frontPageBlogPosts"
          color="primary"
          class="mt-4"
          >{{ context.contentConfig.texts.browseArticles }}</v-btn
        ></v-card
      >
    </div></component
  >
</template>
