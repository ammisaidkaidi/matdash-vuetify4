<script setup lang="ts">
import Icon from "../ui/Icon.vue";
import type { DashboardContext } from "./types";

defineProps<{ context: DashboardContext }>();
</script>

<template>
  <div class="dashboard-grid">
    <section
      class="overview-stack"
      :aria-label="context.contentConfig.texts.accountOverview"
    >
      <v-card class="welcome-card" color="primary">
        <div class="welcome-content">
          <div class="welcome-title">
            <v-avatar size="48" rounded="lg" color="white"
              ><Icon name="trending" :size="25" class="welcome-icon"
            /></v-avatar>
            <h1>
              {{ context.contentConfig.texts.welcome
              }}<br class="welcome-break" />{{
                context.contentConfig.texts.backDavid
              }}
            </h1>
          </div>
          <div class="welcome-stats">
            <div>
              <p>{{ context.contentConfig.texts.budget }}</p>
              <strong>{{ context.contentConfig.texts.text1 }}</strong>
            </div>
            <div>
              <p>{{ context.contentConfig.texts.expense }}</p>
              <strong>{{ context.contentConfig.texts.text2 }}</strong>
            </div>
          </div>
        </div>
        <img
          :src="context.contentConfig.texts.assetsWelcomeBgBCkZs0OnPng"
          class="welcome-image"
          :alt="context.contentConfig.texts.anArrowHittingAPurpleTarget"
        />
      </v-card>
      <div class="stats-grid">
        <v-card color="lightsecondary" class="stat-card"
          ><div class="stat-copy">
            <p>{{ context.contentConfig.texts.customers }}</p>
            <div class="stat-value">
              <h2>{{ context.contentConfig.texts.text3 }}</h2>
              <span>{{ context.contentConfig.texts.text4 }}</span>
            </div>
          </div>
          <component :is="context.DashboardChart" kind="customers" :height="70"
        /></v-card>
        <v-card color="lighterror" class="stat-card"
          ><div class="stat-copy">
            <p>{{ context.contentConfig.texts.projects }}</p>
            <div class="stat-value">
              <h2>{{ context.contentConfig.texts.text5 }}</h2>
              <span>{{ context.contentConfig.texts.text6 }}</span>
            </div>
          </div>
          <div class="project-spark">
            <component
              :is="context.DashboardChart"
              kind="projects"
              :height="55"
            /></div
        ></v-card>
      </div>
    </section>
    <v-card id="revenue" class="revenue-card panel">
      <div class="card-heading">
        <v-avatar size="48" rounded="lg" color="lightprimary"
          ><Icon name="layers" :size="25" class="text-primary"
        /></v-avatar>
        <div>
          <h2>{{ context.contentConfig.texts.revenueForecast }}</h2>
          <p class="subtitle">
            {{ context.contentConfig.texts.overviewOfProfit }}
          </p>
        </div>
      </div>
      <div class="revenue-chart">
        <component :is="context.DashboardChart" kind="revenue" :height="315" />
      </div>
    </v-card>
    <v-card id="performance" class="performance-card panel">
      <h2>{{ context.contentConfig.texts.yourPerformance }}</h2>
      <p class="subtitle">
        {{ context.contentConfig.texts.lastCheckOn25February }}
      </p>
      <div class="performance-content">
        <div class="order-list">
          <div
            v-for="order in context.orders"
            :key="order.title"
            class="order-item"
          >
            <v-avatar
              :color="context.contentConfig.texts.light + order.color"
              rounded="lg"
              size="45"
              ><Icon
                :name="order.icon"
                :class="context.contentConfig.texts.text + order.color"
                :size="25"
            /></v-avatar>
            <div>
              <h3>{{ order.title }}</h3>
              <p>{{ order.caption }}</p>
            </div>
          </div>
        </div>
        <div class="performance-gauge">
          <div class="gauge-chart">
            <component
              :is="context.DashboardChart"
              kind="performance"
              :height="210"
            />
          </div>
          <h3>{{ context.contentConfig.texts.text7 }}</h3>
          <p>
            {{
              context.contentConfig.texts
                .learnInsightsHowToManageAllAspectsOfYourStartup
            }}
          </p>
        </div>
      </div>
    </v-card>
    <div class="insights-grid">
      <v-card id="customers" class="customers-card panel"
        ><div class="d-flex justify-space-between align-center">
          <h2>{{ context.contentConfig.texts.customers }}</h2>
          <span class="text-success growth">{{
            context.contentConfig.texts.text8
          }}</span>
        </div>
        <p class="subtitle">{{ context.contentConfig.texts.last7Days }}</p>
        <div class="customer-chart">
          <component
            :is="context.DashboardChart"
            kind="customerTrend"
            :height="105"
          />
        </div>
        <div class="customer-legend">
          <div>
            <span
              ><i class="dot purple"></i
              >{{ context.contentConfig.texts.april07April14 }}</span
            ><span>{{ context.contentConfig.texts.text9 }}</span>
          </div>
          <div>
            <span
              ><i class="dot pale"></i
              >{{ context.contentConfig.texts.lastWeek }}</span
            ><span>{{ context.contentConfig.texts.text10 }}</span>
          </div>
        </div></v-card
      >
      <v-card id="sales" class="sales-card panel"
        ><h2>{{ context.contentConfig.texts.salesOverview }}</h2>
        <p class="subtitle">{{ context.contentConfig.texts.last7Days }}</p>
        <div class="sales-graphic">
          <span class="radial-label zero">{{
            context.contentConfig.texts.text11
          }}</span
          ><span class="radial-label quarter">{{
            context.contentConfig.texts.text12
          }}</span
          ><span class="radial-label half">{{
            context.contentConfig.texts.text13
          }}</span
          ><span class="radial-label threequarters">{{
            context.contentConfig.texts.text14
          }}</span
          ><component
            :is="context.DashboardChart"
            kind="sales"
            :height="220"
          /></div
      ></v-card>
    </div>
    <div class="bottom-grid">
      <v-card id="products" class="products-card panel"
        ><div class="product-header">
          <h2>{{ context.contentConfig.texts.revenueByProduct }}</h2>
          <v-select
            v-model="context.period"
            :items="context.periods"
            :aria-label="context.contentConfig.texts.revenuePeriod"
            class="period-select"
          />
        </div>
        <v-tabs
          v-model="context.tab"
          class="product-tabs"
          hide-slider
          height="46"
          color="primary"
          ><v-tab
            v-for="item in context.tabs"
            :key="item.name"
            :value="item.name"
            :class="{
              'active-tab': context.tab === item.name,
            }"
            ><Icon :name="item.icon" :size="16" /><span>{{
              item.name
            }}</span></v-tab
          ></v-tabs
        >
        <v-table class="product-table"
          ><thead>
            <tr>
              <th>{{ context.contentConfig.texts.assigned }}</th>
              <th>{{ context.contentConfig.texts.progress }}</th>
              <th>{{ context.contentConfig.texts.priority }}</th>
              <th>{{ context.contentConfig.texts.budget }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in context.products"
              :key="product.name"
              tabindex="0"
              role="button"
              :aria-label="context.contentConfig.texts.view + product.name"
              @click="context.selected = product"
              @keydown.enter="context.selected = product"
              @keydown.space.prevent="context.selected = product"
            >
              <td>
                <div class="product-info">
                  <v-avatar size="48" rounded="lg"
                    ><img
                      :src="
                        context.contentConfig.texts.assetsProduct +
                        product.image +
                        context.contentConfig.texts.jpg
                      "
                      :alt="product.name"
                      width="48"
                      height="48"
                  /></v-avatar>
                  <div>
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.person }}</p>
                  </div>
                </div>
              </td>
              <td class="muted">
                {{ product.progress }}{{ context.contentConfig.texts.text15 }}
              </td>
              <td>
                <v-chip
                  :color="product.color"
                  size="small"
                  rounded="sm"
                  variant="tonal"
                  >{{ product.priority }}</v-chip
                >
              </td>
              <td>{{ context.budget(product.budget) }}</td>
            </tr>
          </tbody></v-table
        >
        <div v-if="context.products.length &lt; 4" class="table-summary">
          {{ context.products.length }}{{ context.contentConfig.texts.projects2
          }}{{ context.period }}
        </div>
      </v-card>
      <v-card
        id="settlements"
        class="settlements-card panel"
        color="lightprimary"
        ><div class="card-heading">
          <v-avatar color="white" size="48" rounded="lg"
            ><Icon name="package" :size="25" class="text-primary"
          /></v-avatar>
          <div>
            <p>{{ context.contentConfig.texts.totalSettlements }}</p>
            <h2>{{ context.contentConfig.texts.text16 }}</h2>
          </div>
        </div>
        <div class="settlements-chart">
          <component
            :is="context.DashboardChart"
            kind="settlements"
            :height="315"
          />
        </div>
        <div class="settlement-totals">
          <div>
            <p>{{ context.contentConfig.texts.totalBalance }}</p>
            <h3>{{ context.contentConfig.texts.text16 }}</h3>
          </div>
          <div>
            <p>{{ context.contentConfig.texts.withdrawals }}</p>
            <h3>{{ context.contentConfig.texts.text17 }}</h3>
          </div>
        </div></v-card
      >
    </div>
  </div>
  <v-dialog
    :model-value="!!context.selected"
    @update:model-value="context.selected = null"
    ><v-card v-if="context.selected" class="pa-7" rounded="xl"
      ><div class="d-flex justify-space-between align-center mb-6">
        <h2>{{ context.contentConfig.texts.projectOverview }}</h2>
        <v-btn
          icon
          size="small"
          variant="text"
          :aria-label="context.contentConfig.texts.closeProject"
          @click="context.selected = null"
          ><Icon name="close"
        /></v-btn>
      </div>
      <div class="product-info mb-6">
        <v-avatar size="64" rounded="lg"
          ><img
            :src="
              context.contentConfig.texts.assetsProduct +
              context.selected.image +
              context.contentConfig.texts.jpg
            "
            width="64"
            :alt="context.selected.name"
        /></v-avatar>
        <div>
          <h2>{{ context.selected.name }}</h2>
          <p class="muted">
            {{ context.contentConfig.texts.managedBy
            }}{{ context.selected.person }}
          </p>
        </div>
      </div>
      <div class="d-flex justify-space-between mb-3">
        <span>{{ context.contentConfig.texts.projectProgress }}</span
        ><strong
          >{{ context.selected.progress
          }}{{ context.contentConfig.texts.text15 }}</strong
        >
      </div>
      <v-progress-linear
        :model-value="context.selected.progress"
        height="9"
        rounded
        color="primary"
      /><v-divider class="my-6" />
      <div class="d-flex justify-space-between">
        <div>
          <p class="muted mb-2">
            {{ context.contentConfig.texts.budget2 }}{{ context.period }}
          </p>
          <h2>
            {{ context.contentConfig.texts.text18
            }}{{ context.selected.budget.toLocaleString() }}
          </h2>
        </div>
        <div>
          <p class="muted mb-2">{{ context.contentConfig.texts.priority }}</p>
          <v-chip :color="context.selected.color">{{
            context.selected.priority
          }}</v-chip>
        </div>
      </div>
      <p class="mt-6 text-caption muted">
        {{
          context.contentConfig.texts.sampleProjectDataForThisDashboardPreview
        }}
      </p>
      <v-btn
        block
        color="primary"
        class="mt-5"
        @click="context.selected = null"
        >{{ context.contentConfig.texts.done }}</v-btn
      ></v-card
    ></v-dialog
  >
</template>
