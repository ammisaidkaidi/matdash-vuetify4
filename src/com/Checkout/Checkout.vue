<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { CheckoutContext } from "./types";

defineProps<{ context: CheckoutContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.checkout"
    ><v-card class="workspace-card"
      ><div class="checkout-steps">
        <button
          v-for="(title, i) in context.contentConfig.values.items1"
          :key="title"
          :class="{
            active: context.step === i + 1,
          }"
          :disabled="i + 1 > context.step"
          @click="context.step = i + 1"
        >
          <v-avatar
            size="36"
            :color="
              context.step === i + 1
                ? context.contentConfig.texts.primary
                : context.contentConfig.texts.rail
            "
            ><Icon
              :name="
                [
                  context.contentConfig.texts.basket,
                  context.contentConfig.texts.invoice,
                  context.contentConfig.texts.creditcard,
                ][i]
              "
              :size="20" /></v-avatar
          ><span
            ><strong>{{ title }}</strong
            ><small>{{
              [
                context.contentConfig.texts.productSummary,
                context.contentConfig.texts.billingInformation,
                context.contentConfig.texts.demoPaymentMethod,
              ][i]
            }}</small></span
          >
        </button>
      </div>
      <div v-if="context.order" class="workspace-empty">
        <v-avatar size="80" color="success" variant="tonal"
          ><Icon name="checks" :size="42"
        /></v-avatar>
        <h2>
          {{ context.contentConfig.texts.demoOrder }}{{ context.order.id
          }}{{ context.contentConfig.texts.created }}
        </h2>
        <p class="muted">
          {{ context.money(context.order.total)
          }}{{
            context.contentConfig.texts.savedLocallyNothingWasChargedOrSent
          }}
        </p>
        <v-btn
          color="primary"
          :to="context.contentConfig.texts.ecommerceProducts"
          >{{ context.contentConfig.texts.continueShopping }}</v-btn
        >
      </div>
      <div
        v-else-if="!context.cartLines.length"
        class="workspace-empty checkout-empty"
      >
        <img
          :src="context.asset(context.contentConfig.texts.emptyShoppingCart)"
          :alt="context.contentConfig.texts.emptyShoppingCart2"
        />
        <h2>{{ context.contentConfig.texts.cartIsEmpty }}</h2>
        <v-btn
          color="primary"
          :to="context.contentConfig.texts.ecommerceProducts"
          >{{ context.contentConfig.texts.goBackToShopping }}</v-btn
        >
      </div>
      <template v-else
        ><div v-if="context.step === 1" class="checkout-layout">
          <section>
            <div
              v-for="line in context.cartLines"
              :key="line.productId"
              class="cart-line"
            >
              <img :src="line.product.image" :alt="line.product.name" />
              <div>
                <router-link
                  :to="
                    context.contentConfig.texts.ecommerceProductDetail +
                    line.productId
                  "
                  ><h3>{{ line.product.name }}</h3></router-link
                >
                <p class="muted">{{ context.money(line.product.price) }}</p>
                <div class="quantity-control mt-2">
                  <v-btn
                    size="26"
                    variant="text"
                    :disabled="line.quantity &lt;= 1"
                    :aria-label="
                      context.contentConfig.texts.decreaseCartQuantity
                    "
                    @click="
                      context.demo.cart.find(
                        (l) => l.productId === line.productId,
                      ).quantity--
                    "
                    >{{ context.contentConfig.texts.text1 }}</v-btn
                  ><span>{{ line.quantity }}</span
                  ><v-btn
                    size="26"
                    variant="text"
                    :aria-label="
                      context.contentConfig.texts.increaseCartQuantity
                    "
                    @click="
                      context.demo.cart.find(
                        (l) => l.productId === line.productId,
                      ).quantity++
                    "
                    >{{ context.contentConfig.texts.text2 }}</v-btn
                  >
                </div>
              </div>
              <v-spacer /><strong>{{
                context.money(line.product.price * line.quantity)
              }}</strong
              ><v-btn
                icon
                size="30"
                color="error"
                variant="text"
                :aria-label="
                  context.contentConfig.texts.remove + line.product.name
                "
                @click="
                  context.demo.cart = context.demo.cart.filter(
                    (l) => l.productId !== line.productId,
                  )
                "
                ><Icon name="trash" :size="18"
              /></v-btn>
            </div>
          </section>
          <v-card variant="outlined" class="order-summary"
            ><h2>{{ context.contentConfig.texts.orderSummary }}</h2>
            <p>
              <span>{{ context.contentConfig.texts.subtotal }}</span
              ><strong>{{ context.money(context.cartTotal) }}</strong>
            </p>
            <p>
              <span>{{ context.contentConfig.texts.shipping }}</span
              ><span class="text-success">{{
                context.contentConfig.texts.free
              }}</span>
            </p>
            <v-divider class="my-4" />
            <p>
              <strong>{{ context.contentConfig.texts.total }}</strong
              ><strong>{{ context.money(context.cartTotal) }}</strong>
            </p>
            <v-btn color="primary" block class="mt-6" @click="context.next">{{
              context.contentConfig.texts.continueToBilling
            }}</v-btn></v-card
          >
        </div>
        <v-form
          v-else-if="context.step === 2"
          :ref="(element) => (context.form = element)"
          @submit.prevent="context.next"
          class="billing-form"
          ><h2 class="mb-6">
            {{ context.contentConfig.texts.billingInformation }}
          </h2>
          <div class="account-fields">
            <v-text-field
              v-for="key in context.contentConfig.values.items2"
              :key="key"
              v-model="context.billing[key]"
              :label="key.charAt(0).toUpperCase() + key.slice(1)"
              :rules="
                key === context.contentConfig.texts.email
                  ? [context.required, context.validEmail]
                  : [context.required]
              "
              hide-details="auto"
            /><v-select
              v-model="context.billing.country"
              :label="context.contentConfig.texts.country"
              :items="context.contentConfig.values.items3"
            />
          </div>
          <div class="workspace-actions mt-6">
            <v-btn variant="text" @click="context.step--">{{
              context.contentConfig.texts.back
            }}</v-btn
            ><v-btn color="primary" type="submit">{{
              context.contentConfig.texts.continueToPayment
            }}</v-btn>
          </div></v-form
        >
        <div v-else class="billing-form">
          <h2>{{ context.contentConfig.texts.payment }}</h2>
          <v-alert type="info" variant="tonal" class="my-6">{{
            context.contentConfig.texts
              .thisIsALocalCheckoutPreviewNoPaymentDetailsAreCollected
          }}</v-alert
          ><v-radio-group v-model="context.method"
            ><v-radio
              :label="context.contentConfig.texts.invoiceOnDelivery"
              :value="context.contentConfig.texts.invoiceOnDelivery"
              color="primary" /><v-radio
              :label="context.contentConfig.texts.demoCardEndingIn2102"
              :value="context.contentConfig.texts.demoCardEndingIn2102"
              color="primary"
          /></v-radio-group>
          <div class="order-summary">
            <h3>
              {{ context.contentConfig.texts.deliverTo
              }}{{ context.billing.name }}
            </h3>
            <p>
              {{ context.billing.address }}{{ context.contentConfig.texts.text3
              }}{{ context.billing.city }}{{ context.contentConfig.texts.text3
              }}{{ context.billing.country }}
            </p>
            <p>
              <strong>{{ context.contentConfig.texts.orderTotal }}</strong
              ><strong>{{ context.money(context.cartTotal) }}</strong>
            </p>
          </div>
          <div class="workspace-actions mt-6">
            <v-btn variant="text" @click="context.step--">{{
              context.contentConfig.texts.back
            }}</v-btn
            ><v-btn color="primary" @click="context.place">{{
              context.contentConfig.texts.placeDemoOrder
            }}</v-btn>
          </div>
        </div></template
      ><v-btn
        v-if="!context.order"
        variant="tonal"
        color="primary"
        :to="context.contentConfig.texts.ecommerceProducts"
        class="mt-6"
        >{{ context.contentConfig.texts.continueShopping }}</v-btn
      ></v-card
    ></WorkspacePage
  >
</template>
