<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { BlogContext } from "./types";

defineProps<{ context: BlogContext }>();
</script>

<template>
  <WorkspacePage
    :title="
      context.list
        ? context.contentConfig.texts.blogApp
        : context.contentConfig.texts.blogDetails
    "
    ><template v-if="context.list"
      ><div class="blog-featured">
        <router-link
          v-for="a in context.articles.slice(0, 2)"
          :key="a.id"
          :to="context.contentConfig.texts.appsBlog + a.slug"
          class="featured-article"
          :style="{
            backgroundImage:
              context.contentConfig.texts
                .linearGradient180degRgba15102806Rgba15102878Url +
              a.image +
              context.contentConfig.texts.text1,
          }"
          ><div class="featured-top">
            <v-avatar size="38"
              ><img :src="a.avatar" :alt="a.author" /></v-avatar
            ><v-chip color="primary" variant="flat" size="small">{{
              a.category
            }}</v-chip>
          </div>
          <div>
            <h2>{{ a.title }}</h2>
            <div class="article-meta">
              <span><Icon name="eye" :size="15" />{{ a.views }}</span
              ><span
                ><Icon name="chats" :size="15" />{{
                  context.demo.articleComments[a.id]?.length || 3
                }}</span
              ><time>{{ a.date }}</time>
            </div>
          </div></router-link
        >
      </div>
      <div class="blog-grid">
        <v-card
          v-for="a in context.articles.slice(2)"
          :key="a.id"
          class="blog-card"
          ><router-link :to="context.contentConfig.texts.appsBlog + a.slug"
            ><img
              :src="a.image"
              :alt="a.title"
              class="blog-card-image"
              loading="lazy" /></router-link
          ><v-avatar class="blog-author" size="40"
            ><img :src="a.avatar" :alt="a.author"
          /></v-avatar>
          <div class="pa-6 pt-4">
            <v-chip size="x-small" color="primary">{{ a.category }}</v-chip
            ><router-link :to="context.contentConfig.texts.appsBlog + a.slug"
              ><h2 class="mt-3">{{ a.title }}</h2></router-link
            >
            <div class="article-meta muted">
              <span><Icon name="eye" :size="14" />{{ a.views }}</span
              ><span
                ><Icon name="chats" :size="14" />{{
                  context.contentConfig.texts.text2
                }}</span
              ><time>{{ a.date }}</time>
            </div>
          </div></v-card
        >
      </div></template
    ><template v-else-if="context.article"
      ><v-card class="article-card"
        ><img
          :src="context.article.image"
          :alt="context.article.title"
          class="article-hero"
        />
        <div class="article-title">
          <v-avatar size="44" class="mb-4"
            ><img :src="context.article.avatar" :alt="context.article.author"
          /></v-avatar>
          <div>
            <v-chip size="small" color="primary">{{
              context.article.category
            }}</v-chip>
          </div>
          <h1>{{ context.article.title }}</h1>
          <div class="article-meta muted">
            <span
              ><Icon name="eye" :size="16" />{{ context.article.views }}</span
            ><span
              ><Icon name="chats" :size="16" />{{
                context.comments.length
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
              context.contentConfig.texts
                .greatDesignIsTheResultOfClearThinkingAndCarefulAttentio
            }}
          </blockquote>
          <p class="text-caption muted">
            {{
              context.contentConfig.texts
                .illustrativeArticleCopyForThisFrontEndRecreation
            }}
          </p>
        </div></v-card
      ><v-card class="workspace-card mt-6"
        ><h2>
          {{ context.contentConfig.texts.comments
          }}{{ context.comments.length }}
        </h2>
        <div v-for="c in context.comments" :key="c.id" class="article-comment">
          <v-avatar size="42"
            ><img :src="context.avatar(1)" :alt="c.name"
          /></v-avatar>
          <div>
            <h3>
              {{ c.name }} <small class="muted">{{ c.date }}</small>
            </h3>
            <p>{{ c.text }}</p>
          </div>
        </div>
        <v-textarea
          v-model="context.comment"
          :label="context.contentConfig.texts.writeAComment"
          rows="4"
          variant="outlined"
          class="mt-6"
          hide-details
        />
        <div class="workspace-actions mt-4">
          <v-btn
            color="primary"
            :disabled="!context.comment.trim()"
            @click="context.post"
            >{{ context.contentConfig.texts.postComment }}</v-btn
          >
        </div></v-card
      ></template
    ><v-card v-else class="workspace-empty"
      ><h2>{{ context.contentConfig.texts.articleNotFound }}</h2>
      <v-btn color="primary" :to="context.contentConfig.texts.appsBlogPosts">{{
        context.contentConfig.texts.browseArticles
      }}</v-btn></v-card
    ></WorkspacePage
  >
</template>
