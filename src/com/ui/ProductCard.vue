<script setup>
import { money, addToCart } from "../../composables/useDemoStore";
import { notify } from "../../composables/useFeedback";
defineProps({ product: Object });
</script>
<template>
  <v-card class="shop-product" variant="outlined"
    ><router-link :to="'/ecommerce/product/detail/' + product.id"
      ><img
        :src="product.image"
        :alt="product.name"
        loading="lazy"
        class="product-cover" /></router-link
    ><v-btn
      icon
      color="primary"
      size="34"
      class="product-cart-button"
      :aria-label="'Add ' + product.name + ' to cart'"
      @click="
        addToCart(product.id);
        notify(product.name + ' added to your demo cart.');
      "
      ><Icon name="basket" :size="18"
    /></v-btn>
    <div class="product-card-body">
      <router-link :to="'/ecommerce/product/detail/' + product.id"
        ><h3>{{ product.name }}</h3></router-link
      >
      <div class="product-price-row">
        <strong>{{ money(product.price) }}</strong
        ><del>{{ money(product.oldPrice || product.price) }}</del
        ><v-rating
          :model-value="product.rating"
          readonly
          density="compact"
          size="12"
          color="warning"
          active-color="warning"
          half-increments
        />
      </div></div
  ></v-card>
</template>
