<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { ProductEditorContext } from "./types";

defineProps<{ context: ProductEditorContext }>();
</script>

<template>
  <WorkspacePage
    :title="
      context.editing
        ? context.contentConfig.texts.editProduct
        : context.contentConfig.texts.addProduct
    "
    ><v-card
      v-if="context.editing &amp;&amp; !context.existing"
      class="workspace-empty"
      ><h2>{{ context.contentConfig.texts.productNotFound }}</h2>
      <v-btn :to="context.contentConfig.texts.ecommerceProductlist">{{
        context.contentConfig.texts.backToProducts
      }}</v-btn></v-card
    ><v-form
      v-else
      :ref="(element) => (context.form = element)"
      @submit.prevent="context.save"
      ><v-tabs v-model="context.tab" color="primary" class="mb-6"
        ><v-tab :value="context.contentConfig.texts.general">{{
          context.contentConfig.texts.general
        }}</v-tab
        ><v-tab :value="context.contentConfig.texts.advanced">{{
          context.contentConfig.texts.advanced
        }}</v-tab
        ><v-tab
          v-if="context.editing"
          :value="context.contentConfig.texts.reviews"
          >{{ context.contentConfig.texts.reviews }}</v-tab
        ></v-tabs
      >
      <div class="product-editor-grid">
        <div class="stack-cards">
          <template v-if="context.tab === context.contentConfig.texts.general"
            ><v-card class="workspace-card"
              ><h2>{{ context.contentConfig.texts.general }}</h2>
              <v-text-field
                v-model="context.draft.name"
                :label="context.contentConfig.texts.productName"
                :rules="[context.required]"
                hide-details="auto"
                class="mt-6"
              />
              <p class="field-help">
                {{
                  context.contentConfig.texts
                    .aProductNameIsRequiredAndRecommendedToBeUnique
                }}
              </p>
              <v-textarea
                v-model="context.draft.description"
                :label="context.contentConfig.texts.description"
                variant="outlined"
                rows="7"
                hide-details
                class="mt-6"
              />
              <p class="field-help">
                {{
                  context.contentConfig.texts
                    .setADescriptionForBetterProductVisibility
                }}
              </p></v-card
            ><v-card class="workspace-card"
              ><h2>{{ context.contentConfig.texts.media }}</h2>
              <button
                class="upload-zone"
                type="button"
                @click="context.upload.click()"
              >
                <Icon name="upload" :size="28" /><span>{{
                  context.contentConfig.texts.clickToUploadAProductImage
                }}</span
                ><small>{{
                  context.contentConfig.texts.jPGOrPNGUpTo800KB
                }}</small>
              </button></v-card
            ><v-card class="workspace-card"
              ><h2>{{ context.contentConfig.texts.pricing }}</h2>
              <v-text-field
                v-model.number="context.draft.basePrice"
                :label="context.contentConfig.texts.basePrice"
                type="number"
                min="0.01"
                :rules="[
                  (v) =>
                    Number(v) > 0 ||
                    context.contentConfig.texts.enterAPriceGreaterThanZero,
                ]"
                hide-details="auto"
                class="mt-6" />
              <h3 class="mt-6">
                {{ context.contentConfig.texts.discountType }}
              </h3>
              <v-radio-group
                v-model="context.draft.discountType"
                inline
                hide-details
                ><v-radio
                  v-for="d in context.contentConfig.values.items1"
                  :key="d"
                  :label="d"
                  :value="d"
                  color="primary" /></v-radio-group
              ><v-text-field
                v-if="
                  context.draft.discountType !==
                  context.contentConfig.texts.noDiscount
                "
                v-model.number="context.draft.discount"
                type="number"
                :label="context.contentConfig.texts.discountAmount"
                :rules="[v => Number(v) >= 0 &amp;&amp; (context.draft.discountType !== context.contentConfig.texts.percentage || Number(v) &lt;= 100) || context.contentConfig.texts.enterAValidDiscount]"
                hide-details="auto"
                class="mt-4" /><v-text-field
                v-model.number="context.draft.tax"
                type="number"
                :label="context.contentConfig.texts.vATAmount"
                min="0"
                max="100"
                :rules="[v => Number(v) >= 0 &amp;&amp; Number(v) &lt;= 100 || context.contentConfig.texts.use0100]"
                hide-details="auto"
                class="mt-6" /></v-card></template
          ><v-card
            v-else-if="context.tab === context.contentConfig.texts.advanced"
            class="workspace-card"
            ><h2>{{ context.contentConfig.texts.inventoryShipping }}</h2>
            <div class="record-fields mt-6">
              <v-text-field
                v-model="context.draft.sku"
                :label="context.contentConfig.texts.sKU"
              /><v-text-field
                v-model.number="context.draft.stock"
                type="number"
                min="0"
                :label="context.contentConfig.texts.stockQuantity"
                :rules="[
                  (v) =>
                    Number(v) >= 0 || context.contentConfig.texts.useZeroOrMore,
                ]"
                hide-details="auto"
              /><v-text-field
                v-model.number="context.draft.weight"
                type="number"
                min="0"
                :label="context.contentConfig.texts.weightKg"
              /><v-select
                v-model="context.draft.gender"
                :items="context.contentConfig.values.items2"
                :label="context.contentConfig.texts.audience"
              />
            </div>
            <p class="field-help">
              {{
                context.contentConfig.texts
                  .inventoryIsSampleDataStoredInThisBrowser
              }}
            </p></v-card
          ><v-card v-else class="workspace-card"
            ><h2>{{ context.contentConfig.texts.reviews }}</h2>
            <div class="review-list">
              <div
                v-for="name in context.contentConfig.values.items3"
                :key="name"
              >
                <h3>{{ name }}</h3>
                <v-rating
                  :model-value="4"
                  readonly
                  color="warning"
                  active-color="warning"
                  density="compact"
                  size="20"
                />
                <p class="muted">
                  {{
                    context.contentConfig.texts
                      .aGreatProductWithThoughtfulDetails
                  }}
                </p>
              </div>
            </div></v-card
          >
        </div>
        <aside class="stack-cards">
          <v-card class="workspace-card"
            ><h2>{{ context.contentConfig.texts.thumbnail }}</h2>
            <button
              type="button"
              class="thumbnail-upload"
              @click="context.upload.click()"
            >
              <img
                :src="context.draft.image"
                :alt="context.contentConfig.texts.productThumbnail"
              />
            </button>
            <p class="field-help">
              {{
                context.contentConfig.texts
                  .setTheProductThumbnailJPGAndPNGImagesAreAccepted
              }}
            </p>
            <input
              :ref="(element) => (context.upload = element)"
              type="file"
              accept="image/jpeg,image/png"
              hidden
              @change="context.pick" /></v-card
          ><v-card class="workspace-card"
            ><h2>{{ context.contentConfig.texts.status }}</h2>
            <v-select
              v-model="context.draft.status"
              :items="context.contentConfig.values.items4"
              :label="context.contentConfig.texts.productStatus"
              class="mt-5" /></v-card
          ><v-card class="workspace-card"
            ><h2>{{ context.contentConfig.texts.productDetails }}</h2>
            <v-select
              v-model="context.draft.category"
              :items="context.contentConfig.values.items5"
              :label="context.contentConfig.texts.categories"
              class="mt-5" /><v-text-field
              v-model="context.tagText"
              :label="context.contentConfig.texts.tagsSeparatedByCommas"
              class="mt-5" /><v-select
              v-model="context.draft.template"
              :items="context.contentConfig.values.items6"
              :label="context.contentConfig.texts.productTemplate"
              class="mt-5"
          /></v-card>
        </aside>
      </div>
      <div class="workspace-actions mt-6">
        <v-btn type="submit" color="primary">{{
          context.contentConfig.texts.saveChanges
        }}</v-btn
        ><v-btn
          color="error"
          variant="tonal"
          :to="context.contentConfig.texts.ecommerceProductlist"
          >{{ context.contentConfig.texts.cancel }}</v-btn
        >
      </div></v-form
    ></WorkspacePage
  >
</template>
