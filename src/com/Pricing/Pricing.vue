<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { PricingContext } from "./types";

defineProps<{ context: PricingContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.pricing" data-batch="3"
    ><div class="b3-centered-heading">
      <h2>
        {{ context.contentConfig.texts.flexiblePlansTailoredToFitYour }}<br />{{
          context.contentConfig.texts.communitySUniqueNeeds
        }}
      </h2>
      <div class="b3-billing">
        <span>{{ context.contentConfig.texts.monthly }}</span
        ><v-switch
          v-model="context.yearly"
          :aria-label="context.contentConfig.texts.yearlyBilling"
          color="primary"
          hide-details
          inset
        /><span>{{ context.contentConfig.texts.yearly }}</span>
      </div>
      <p v-if="context.yearly" class="text-primary">
        {{
          context.contentConfig.texts.annualSamplePricingIncludesTwoMonthsFree
        }}
      </p>
    </div>
    <div class="b3-pricing-grid">
      <v-card v-for="p in context.plans" :key="p.name" class="b3-price-card"
        ><div class="d-flex justify-space-between">
          <strong>{{ p.name.toUpperCase() }}</strong
          ><v-chip
            v-if="p.name === context.contentConfig.texts.bronze"
            color="warning"
            size="small"
            >{{ context.contentConfig.texts.pOPULAR }}</v-chip
          >
        </div>
        <img
          :src="
            context.asset(
              p.name.toLowerCase() + context.contentConfig.texts.text1,
            )
          "
          :alt="p.name + context.contentConfig.texts.medal"
        />
        <h2>
          {{
            p.price
              ? context.contentConfig.texts.text2 +
                (context.yearly ? p.price * 10 : p.price).toFixed(2)
              : context.contentConfig.texts.free
          }}<small v-if="p.price"
            >{{ context.contentConfig.texts.text3
            }}{{
              context.yearly
                ? context.contentConfig.texts.yr
                : context.contentConfig.texts.mo
            }}</small
          >
        </h2>
        <ul>
          <li
            v-for="(label, i) in [
              p.members + context.contentConfig.texts.members,
              p.name === context.contentConfig.texts.silver
                ? context.contentConfig.texts.singleDevice
                : context.contentConfig.texts.multipleDevice,
              p.storage + context.contentConfig.texts.gBStorage,
              context.contentConfig.texts.monthlyBackups,
              context.contentConfig.texts.permissionsWorkflows,
            ]"
            :key="label"
            :class="{
              muted: i >= p.features,
            }"
          >
            <Icon
              :name="i &lt; p.features ? context.contentConfig.texts.check : context.contentConfig.texts.close"
              :size="17"
              :class="i &lt; p.features ? context.contentConfig.texts.textPrimary : context.contentConfig.texts.text4"
            />{{ label }}
          </li>
        </ul>
        <v-btn color="primary" block @click="context.choose(p)"
          >{{ context.contentConfig.texts.choose }}{{ p.name }}</v-btn
        >
        <p
          v-if="context.pageDemos.plan === p.name"
          class="text-caption text-primary mt-3"
        >
          {{ context.contentConfig.texts.currentLocalPreference
          }}{{ context.pageDemos.billing }}
        </p></v-card
      >
    </div></WorkspacePage
  >
</template>
