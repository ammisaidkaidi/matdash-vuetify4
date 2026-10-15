<script setup lang="ts">
import Icon from "../ui/Icon.vue";
import type { DashboardsContext } from "./types";

defineProps<{ context: DashboardsContext }>();
</script>

<template>
  <section class="b3-dashboard" data-page-ready="true" data-batch="3">
    <h1 class="b3-sr-only">
      {{
        context.third
          ? context.contentConfig.texts.dashboard3
          : context.contentConfig.texts.dashboard2
      }}
    </h1>
    <div v-if="context.third" class="b3-stat-strip">
      <v-card
        v-for="[title, value, icon, color] in context.stats"
        :key="title"
        class="b3-stat-tile"
        ><v-avatar :color="color" variant="tonal" rounded="lg"
          ><Icon :name="icon"
        /></v-avatar>
        <p>{{ title }}</p>
        <h2>{{ value }}</h2>
        <v-btn
          variant="text"
          size="small"
          @click="
            context.selected = {
              title,
              value,
            }
          "
          >{{ context.contentConfig.texts.viewDetails }}</v-btn
        ></v-card
      >
    </div>
    <div v-else class="b3-dash-welcome">
      <v-card class="b3-welcome-banner" color="primary"
        ><img
          :src="context.asset(context.contentConfig.texts.welcomeBg2)"
          :alt="context.contentConfig.texts.text1"
        /><v-chip variant="tonal" size="small">{{
          context.contentConfig.texts.thisMonth15Profit
        }}</v-chip>
        <h1>{{ context.contentConfig.texts.heyDavidMcMichael }}</h1>
        <p>
          {{ context.contentConfig.texts.aeneanVelLiberoIdMetusSollicitudin }}
        </p></v-card
      ><v-card color="lighterror" class="pa-6"
        ><p>{{ context.contentConfig.texts.subscriptions }}</p>
        <h2 class="mt-2">
          {{ context.contentConfig.texts.text2
          }}<small>{{ context.contentConfig.texts.text3 }}</small>
        </h2>
        <component
          :is="context.MiniChart"
          type="bar"
          spark
          :height="85"
          :colors="context.contentConfig.values.colors1" /></v-card
      ><v-card color="lightsecondary" class="pa-6"
        ><p>{{ context.contentConfig.texts.users }}</p>
        <h2 class="mt-2">
          {{ context.contentConfig.texts.text4
          }}<small>{{ context.contentConfig.texts.text5 }}</small>
        </h2>
        <component
          :is="context.MiniChart"
          spark
          :height="85"
          :colors="context.contentConfig.values.colors2"
      /></v-card>
    </div>
    <div class="b3-dash-main">
      <v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.revenueForecast }}</h2>
        <p class="muted text-caption mt-1">
          {{ context.contentConfig.texts.overviewOfProfit }}
        </p>
        <component
          :is="context.MiniChart"
          type="bar"
          :series="context.forecast"
          :labels="context.contentConfig.values.labels3"
          :colors="context.contentConfig.values.colors4"
          :height="300"
        />
        <div class="b3-financial-totals">
          <div
            v-for="[name, value] in context.contentConfig.values.items5"
            :key="name"
          >
            <span class="muted">{{ name }}</span
            ><strong>{{ value }}</strong>
          </div>
        </div></v-card
      ><v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.annualProfit }}</h2>
        <div class="d-flex justify-space-between mt-5">
          <span>{{ context.contentConfig.texts.conversionRate }}</span
          ><strong>{{ context.contentConfig.texts.text6 }}</strong>
        </div>
        <component :is="context.MiniChart" spark :height="110" />
        <div
          v-for="[name, detail, value, change] in context.contentConfig.values
            .items6"
          :key="value"
          class="b3-profit-row"
        >
          <div>
            <small class="muted"
              >{{ name }}{{ context.contentConfig.texts.text7
              }}{{ detail }}</small
            >
            <h3>{{ value }}</h3>
          </div>
          <span
            :class="
              change.startsWith(context.contentConfig.texts.text8)
                ? context.contentConfig.texts.textSuccess
                : context.contentConfig.texts.textError
            "
            >{{ change }}</span
          >
        </div></v-card
      >
    </div>
    <div v-if="context.third" class="b3-three">
      <v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.yourPerformance }}</h2>
        <p class="muted text-caption">
          {{ context.contentConfig.texts.lastCheckOn25February }}
        </p>
        <div class="b3-performance">
          <div>
            <p>{{ context.contentConfig.texts.text9 }}</p>
            <small>{{ context.contentConfig.texts.processing }}</small>
            <p>{{ context.contentConfig.texts.text10 }}</p>
            <small>{{ context.contentConfig.texts.onHold }}</small>
            <p>{{ context.contentConfig.texts.text11 }}</p>
            <small>{{ context.contentConfig.texts.delivered }}</small>
          </div>
          <component
            :is="context.MiniChart"
            type="donut"
            :height="190"
            spark
            :series="context.contentConfig.values.series7"
            :labels="context.contentConfig.values.labels8"
          /></div></v-card
      ><v-card class="workspace-card"
        ><h2>
          {{ context.contentConfig.texts.customers
          }}<span class="text-success text-caption">{{
            context.contentConfig.texts.text12
          }}</span>
        </h2>
        <p class="muted text-caption">
          {{ context.contentConfig.texts.last7Days }}
        </p>
        <component :is="context.MiniChart" :height="155" spark />
        <div class="b3-financial-totals">
          <div>
            <span>{{ context.contentConfig.texts.april07April14 }}</span
            ><strong>{{ context.contentConfig.texts.text13 }}</strong>
          </div>
          <div>
            <span>{{ context.contentConfig.texts.lastWeek }}</span
            ><strong>{{ context.contentConfig.texts.text14 }}</strong>
          </div>
        </div></v-card
      ><v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.salesOverview }}</h2>
        <p class="muted text-caption">
          {{ context.contentConfig.texts.last7Days }}
        </p>
        <component
          :is="context.MiniChart"
          type="donut"
          :height="220"
          :labels="context.contentConfig.values.labels9"
      /></v-card>
    </div>
    <div v-else class="b3-dash-main">
      <div class="b3-two">
        <v-card class="workspace-card"
          ><v-avatar color="secondary" variant="tonal" rounded="lg"
            ><Icon name="profile"
          /></v-avatar>
          <h3 class="my-4">{{ context.contentConfig.texts.newCustomers }}</h3>
          <div class="d-flex justify-space-between mb-3">
            <span>{{ context.contentConfig.texts.newGoals }}</span
            ><strong>{{ context.contentConfig.texts.text15 }}</strong>
          </div>
          <v-progress-linear
            :model-value="83"
            color="secondary"
            rounded
            height="6" /></v-card
        ><v-card class="workspace-card"
          ><h3>{{ context.contentConfig.texts.totalIncome }}</h3>
          <h2 class="mt-4">
            {{ context.contentConfig.texts.text16
            }}<small class="text-success">{{
              context.contentConfig.texts.text17
            }}</small>
          </h2>
          <component
            :is="context.MiniChart"
            spark
            :height="80"
            :colors="context.contentConfig.values.colors10"
        /></v-card>
      </div>
      <v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.weeklySchedules }}</h2>
        <div
          v-for="(day, i) in context.contentConfig.values.items11"
          :key="day"
          class="b3-schedule"
        >
          <span>{{ day }}</span
          ><router-link
            :to="context.contentConfig.texts.appsCalendar"
            :style="{
              marginLeft: i * 12 + context.contentConfig.texts.text18,
              background: [
                context.contentConfig.texts.text19,
                context.contentConfig.texts.text20,
                context.contentConfig.texts.ff6692,
              ][i],
            }"
            >{{ context.contentConfig.texts.meetingWithSunil }}</router-link
          >
        </div>
        <v-btn
          :to="context.contentConfig.texts.appsCalendar"
          variant="text"
          size="small"
          >{{ context.contentConfig.texts.openCalendar }}</v-btn
        ></v-card
      >
    </div>
    <div class="b3-dash-main">
      <component :is="context.ProductRevenue" /><v-card
        v-if="context.third"
        color="lightprimary"
        class="workspace-card"
        ><h2>{{ context.contentConfig.texts.totalSettlements }}</h2>
        <h3>{{ context.contentConfig.texts.text21 }}</h3>
        <component :is="context.MiniChart" spark :height="210" />
        <div class="b3-financial-totals">
          <div>
            <span>{{ context.contentConfig.texts.totalBalance }}</span
            ><strong>{{ context.contentConfig.texts.text21 }}</strong>
          </div>
          <div>
            <span>{{ context.contentConfig.texts.withdrawals }}</span
            ><strong>{{ context.contentConfig.texts.text22 }}</strong>
          </div>
        </div></v-card
      ><v-card v-else class="workspace-card"
        ><h2>{{ context.contentConfig.texts.salesFromLocations }}</h2>
        <p class="muted text-caption">
          {{ context.contentConfig.texts.regionalDistribution }}
        </p>
        <div class="b3-location-visual"><Icon name="globe" :size="125" /></div>
        <div
          v-for="[place, n, color] in context.contentConfig.values.items12"
          :key="place"
          class="b3-location-row"
        >
          <span>{{ place }}</span
          ><v-progress-linear
            :model-value="n * 2"
            :color="color"
            height="5"
            rounded
          /><span>{{ n }}{{ context.contentConfig.texts.text18 }}</span>
        </div></v-card
      >
    </div>
    <component :is="context.Calendar" v-if="context.third" embedded />
    <div v-else class="b3-three">
      <v-card class="workspace-card"
        ><h2>{{ context.contentConfig.texts.weeklyStats }}</h2>
        <p class="muted text-caption">
          {{ context.contentConfig.texts.overviewOfProfit }}
        </p>
        <component :is="context.MiniChart" type="bar" :height="210" />
        <div class="b3-financial-totals">
          <div>
            <span>{{ context.contentConfig.texts.sales }}</span
            ><strong>{{ context.contentConfig.texts.text23 }}</strong>
          </div>
          <div>
            <span>{{ context.contentConfig.texts.expenses }}</span
            ><strong>{{ context.contentConfig.texts.text24 }}</strong>
          </div>
        </div></v-card
      ><component :is="context.Activities" /><v-card class="b3-story-card"
        ><img
          :src="context.asset(context.contentConfig.texts.blogImg4)"
          :alt="context.contentConfig.texts.abstractDesignInspiration"
        />
        <div class="pa-6">
          <h3>
            {{ context.contentConfig.texts.figmaTipsAndTricksWithStephan }}
          </h3>
          <p class="muted my-3">
            {{
              context.contentConfig.texts
                .exploreAFreshPerspectiveOnDesignAndTheDetailsThatMakeAD
            }}
          </p>
          <div class="b3-avatar-stack">
            <v-avatar
              v-for="n in context.contentConfig.values.items13"
              :key="n"
              size="30"
              ><img
                :src="context.avatar(n)"
                :alt="context.contentConfig.texts.sampleReader" /></v-avatar
            ><span>{{ context.contentConfig.texts.text25 }}</span>
          </div>
          <v-btn
            :to="context.contentConfig.texts.appsBlogPosts"
            variant="text"
            color="primary"
            class="mt-3"
            >{{ context.contentConfig.texts.readArticles }}</v-btn
          >
        </div></v-card
      >
    </div>
    <p class="workspace-note">
      {{
        context.contentConfig.texts
          .interactiveSampleAnalyticsNoLiveFinancialServices
      }}
    </p>
    <v-dialog
      :model-value="!!context.selected"
      @update:model-value="context.selected = null"
      ><v-card v-if="context.selected" class="dialog-body"
        ><h2>{{ context.selected.title }}</h2>
        <h3 class="my-4">{{ context.selected.value }}</h3>
        <p>
          {{
            context.contentConfig.texts
              .illustrativeDashboardMetricExploreTheRelatedLocalRecord
          }}
        </p>
        <div class="dialog-actions">
          <v-btn @click="context.selected = null">{{
            context.contentConfig.texts.close
          }}</v-btn
          ><v-btn
            color="primary"
            :to="context.contentConfig.texts.appsInvoice"
            >{{ context.contentConfig.texts.viewInvoices }}</v-btn
          >
        </div></v-card
      ></v-dialog
    >
  </section>
</template>
