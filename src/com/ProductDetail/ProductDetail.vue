<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { ProductDetailContext } from "./types";

defineProps<{ context: ProductDetailContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.productDetail"
    ><template v-if="context.product"
      ><v-card class="workspace-card product-detail"
        ><div>
          <img
            :src="context.image || context.product.image"
            :alt="context.product.name"
            class="product-hero"
          />
          <div class="product-thumbnails">
            <button
              v-for="src in [
                context.product.image,
                ...context.related.map((p) => p.image),
              ]"
              :key="src"
              @click="context.image = src"
              :aria-label="
                context.contentConfig.texts.preview +
                src.split(context.contentConfig.texts.text1).at(-1)
              "
            >
              <img
                :src="src"
                :alt="context.contentConfig.texts.productGalleryView"
              />
            </button>
          </div>
        </div>
        <div class="product-detail-copy">
          <div class="d-flex align-center ga-2">
            <v-chip
              :color="
                context.product.stock
                  ? context.contentConfig.texts.success
                  : context.contentConfig.texts.error
              "
              size="small"
              rounded="sm"
              >{{
                context.product.stock
                  ? context.contentConfig.texts.inStock
                  : context.contentConfig.texts.outOfStock
              }}</v-chip
            ><span class="text-caption muted">{{
              context.product.category
            }}</span>
          </div>
          <h1>{{ context.product.name }}</h1>
          <p class="muted">{{ context.product.description }}</p>
          <div class="detail-price">
            <del>{{ context.money(context.product.oldPrice) }}</del
            ><strong>{{ context.money(context.product.price) }}</strong>
          </div>
          <div class="d-flex align-center ga-3">
            <v-rating
              :model-value="context.product.rating"
              readonly
              color="warning"
              active-color="warning"
              size="20"
              density="compact"
            /><span class="text-caption muted">{{
              context.contentConfig.texts.text2
            }}</span>
          </div>
          <v-divider class="my-6" />
          <div class="d-flex align-center ga-4">
            <h3>{{ context.contentConfig.texts.colors }}</h3>
            <div class="color-choices">
              <button
                v-for="c in context.contentConfig.values.items1"
                :key="c"
                :style="{
                  background: c,
                }"
                :aria-label="context.contentConfig.texts.selectColor + c"
                @click="context.color = c"
              >
                <Icon v-if="context.color === c" name="check" :size="16" />
              </button>
            </div>
          </div>
          <div class="quantity-line">
            <h3>{{ context.contentConfig.texts.quantity }}</h3>
            <div class="quantity-control">
              <v-btn
                size="30"
                variant="text"
                :disabled="context.quantity &lt;= 1"
                :aria-label="context.contentConfig.texts.decreaseQuantity"
                @click="context.quantity--"
                >{{ context.contentConfig.texts.text3 }}</v-btn
              ><span>{{ context.quantity }}</span
              ><v-btn
                size="30"
                variant="text"
                :disabled="
                  context.quantity >= Math.max(1, context.product.stock)
                "
                :aria-label="context.contentConfig.texts.increaseQuantity"
                @click="context.quantity++"
                >{{ context.contentConfig.texts.text4 }}</v-btn
              >
            </div>
          </div>
          <v-divider class="my-6" />
          <div class="d-flex ga-4">
            <v-btn
              color="primary"
              :disabled="!context.product.stock"
              @click="context.add(true)"
              >{{ context.contentConfig.texts.buyNow }}</v-btn
            ><v-btn
              color="error"
              :disabled="!context.product.stock"
              @click="context.add()"
              >{{ context.contentConfig.texts.addToCart }}</v-btn
            >
          </div>
          <p class="text-caption muted mt-5">
            {{ context.contentConfig.texts.dispatchedIn23Weeks }}<br />{{
              context.contentConfig.texts.sampleProductAndDeliveryInformation
            }}
          </p>
          <v-btn
            :to="
              context.contentConfig.texts.ecommerceEditProductId +
              context.product.id
            "
            variant="text"
            color="primary"
            class="mt-3"
            >{{ context.contentConfig.texts.editProduct }}</v-btn
          >
        </div></v-card
      ><v-card class="workspace-card mt-6"
        ><v-tabs v-model="context.tab" color="primary"
          ><v-tab :value="context.contentConfig.texts.description">{{
            context.contentConfig.texts.description
          }}</v-tab
          ><v-tab :value="context.contentConfig.texts.review">{{
            context.contentConfig.texts.review
          }}</v-tab></v-tabs
        >
        <div
          class="py-6"
          v-if="context.tab === context.contentConfig.texts.description"
        >
          <h3>{{ context.contentConfig.texts.designedForEverydayMoments }}</h3>
          <p class="muted mt-4">{{ context.product.description }}</p>
          <p class="muted mt-4">
            {{
              context.contentConfig.texts
                .carefullySelectedMaterialsAndConsideredDetailsComeToget
            }}
          </p>
        </div>
        <div v-else class="review-list">
          <div
            v-for="(name, i) in context.contentConfig.values.items2"
            :key="name"
          >
            <strong>{{ name }}</strong
            ><v-rating
              :model-value="5 - (i % 2)"
              readonly
              density="compact"
              size="16"
              color="warning"
              active-color="warning"
            />
            <p class="muted">
              {{
                context.contentConfig.texts
                  .aThoughtfulDesignWithAGreatFinishVeryHappyWithTheQualit
              }}
            </p>
          </div>
        </div></v-card
      >
      <h2 class="my-6">{{ context.contentConfig.texts.relatedProducts }}</h2>
      <div class="related-product-grid">
        <component
          :is="context.ProductCard"
          v-for="p in context.related"
          :key="p.id"
          :product="p"
        /></div></template
    ><v-card v-else class="workspace-empty"
      ><h2>{{ context.contentConfig.texts.productNotFound }}</h2>
      <v-btn
        :to="context.contentConfig.texts.ecommerceProducts"
        color="primary"
        >{{ context.contentConfig.texts.backToShop }}</v-btn
      ></v-card
    ></WorkspacePage
  >
</template>
