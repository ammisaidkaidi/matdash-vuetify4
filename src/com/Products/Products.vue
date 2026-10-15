<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { ProductsContext } from "./types";

defineProps<{ context: ProductsContext }>();
</script>

<template>
  <WorkspacePage
    :title="
      context.list
        ? context.contentConfig.texts.productList
        : context.contentConfig.texts.shop
    "
    ><v-card v-if="context.list" class="workspace-card"
      ><div class="workspace-toolbar">
        <v-text-field
          v-model="context.search"
          :label="context.contentConfig.texts.search"
          density="compact"
        /><v-spacer /><v-btn
          color="primary"
          :to="context.contentConfig.texts.ecommerceAddProduct"
          >{{ context.contentConfig.texts.addNewItem }}</v-btn
        >
      </div>
      <v-data-table
        :headers="context.headers"
        :items="context.filtered"
        :items-per-page="5"
        class="workspace-table"
        ><template #item.name="{ item }"
          ><router-link
            class="person-cell"
            :to="context.contentConfig.texts.ecommerceProductDetail + item.id"
            ><v-avatar rounded="lg" size="50"
              ><img :src="item.image" :alt="item.name"
            /></v-avatar>
            <div>
              <strong>{{ item.name }}</strong
              ><span>{{ item.category }}</span>
            </div></router-link
          ></template
        ><template #item.date="{ item }">{{
          item.date || context.contentConfig.texts.oct142026
        }}</template
        ><template #item.stock="{ item }"
          ><v-chip
            :color="
              item.stock > 0
                ? context.contentConfig.texts.success
                : context.contentConfig.texts.error
            "
            size="small"
            >{{
              item.stock > 0
                ? context.contentConfig.texts.inStock
                : context.contentConfig.texts.outOfStock
            }}</v-chip
          ></template
        ><template #item.price="{ item }">{{
          context.money(item.price)
        }}</template
        ><template #item.actions="{ item }"
          ><div class="row-actions">
            <v-btn
              icon
              variant="text"
              size="30"
              color="primary"
              :to="context.contentConfig.texts.ecommerceEditProductId + item.id"
              :aria-label="context.contentConfig.texts.edit + item.name"
              ><Icon name="edit" :size="17" /></v-btn
            ><v-btn
              icon
              variant="text"
              size="30"
              color="error"
              :aria-label="context.contentConfig.texts.delete + item.name"
              @click="context.remove(item)"
              ><Icon name="trash" :size="17"
            /></v-btn></div></template></v-data-table
    ></v-card>
    <v-card v-else class="shop-layout"
      ><aside class="shop-filters">
        <h3>{{ context.contentConfig.texts.filterByCategory }}</h3>
        <v-checkbox
          :model-value="!context.categories.length"
          :label="context.contentConfig.texts.all"
          hide-details
          density="compact"
          color="primary"
          @update:model-value="context.categories = []"
        /><v-checkbox
          v-for="name in context.contentConfig.values.items1"
          :key="name"
          v-model="context.categories"
          :label="name"
          :value="name"
          hide-details
          density="compact"
          color="primary"
        />
        <h3>{{ context.contentConfig.texts.byGender }}</h3>
        <v-checkbox
          v-for="name in context.contentConfig.values.items2"
          :key="name"
          v-model="context.gender"
          :label="name"
          :value="name"
          hide-details
          density="compact"
          color="primary"
        />
        <h3>{{ context.contentConfig.texts.byPricing }}</h3>
        <v-radio-group v-model="context.price" hide-details
          ><v-radio
            v-for="p in context.priceOptions"
            :key="p"
            :label="p"
            :value="p"
            color="primary"
            density="compact"
        /></v-radio-group>
        <h3>{{ context.contentConfig.texts.byRating }}</h3>
        <v-rating
          v-model="context.rating"
          clearable
          color="warning"
          active-color="warning"
          density="compact"
          size="24"
        /><v-btn
          color="primary"
          variant="tonal"
          block
          class="mt-6"
          @click="context.reset"
          >{{ context.contentConfig.texts.resetFilters }}</v-btn
        >
      </aside>
      <section class="shop-content">
        <div class="workspace-toolbar">
          <h2>{{ context.contentConfig.texts.products }}</h2>
          <v-spacer /><v-text-field
            v-model="context.search"
            :placeholder="context.contentConfig.texts.searchProduct"
            :aria-label="context.contentConfig.texts.searchProduct"
            density="compact"
            ><template #prepend-inner
              ><Icon name="search" :size="17" /></template
          ></v-text-field>
        </div>
        <div class="shop-sort">
          <span class="muted text-caption"
            >{{ context.filtered.length
            }}{{ context.contentConfig.texts.products2 }}</span
          ><v-select
            v-model="context.sort"
            :items="context.contentConfig.values.items3"
            :aria-label="context.contentConfig.texts.sortProducts"
          />
        </div>
        <div class="product-grid">
          <component
            :is="context.ProductCard"
            v-for="p in context.filtered"
            :key="p.id"
            :product="p"
          />
        </div>
        <div v-if="!context.filtered.length" class="workspace-empty">
          <Icon name="search" :size="36" />
          <h3>{{ context.contentConfig.texts.noProductsMatchYourFilters }}</h3>
          <v-btn color="primary" variant="tonal" @click="context.reset">{{
            context.contentConfig.texts.resetFilters
          }}</v-btn>
        </div>
      </section></v-card
    ></WorkspacePage
  >
</template>
