<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import type { ChartWidgetsContext } from "./types";

defineProps<{ context: ChartWidgetsContext }>();
</script>

<template>
  <WorkspacePage
    :title="context.contentConfig.texts.chartsWidgets"
    data-batch="3"
    ><div class="b3-four">
      <v-card
        v-for="[title, value, type, color] in context.contentConfig.values
          .items1"
        :key="title"
        class="workspace-card"
        ><h2>{{ value }}</h2>
        <p class="muted">
          {{ title }}
          <span class="text-success text-caption">{{
            context.contentConfig.texts.text1
          }}</span>
        </p>
        <component
          :is="context.MiniChart"
          :type="type"
          :colors="[color]"
          :height="90"
          spark
      /></v-card>
    </div>
    <v-card class="workspace-card my-6"
      ><div class="d-flex justify-space-between">
        <h2>{{ context.contentConfig.texts.currentValue }}</h2>
        <v-btn-toggle
          v-model="context.trade"
          mandatory
          density="compact"
          color="primary"
          ><v-btn :value="context.contentConfig.texts.buy">{{
            context.contentConfig.texts.buy
          }}</v-btn
          ><v-btn :value="context.contentConfig.texts.sell">{{
            context.contentConfig.texts.sell
          }}</v-btn></v-btn-toggle
        >
      </div>
      <div class="b3-three">
        <div>
          <component
            :is="context.MiniChart"
            type="bar"
            :series="context.income"
            :height="210"
            spark
          />
          <p>{{ context.contentConfig.texts.income }}</p>
          <h2>
            {{
              context.trade === context.contentConfig.texts.buy
                ? context.contentConfig.texts.text2
                : context.contentConfig.texts.text3
            }}
          </h2>
          <span class="text-success">{{
            context.contentConfig.texts.text4
          }}</span>
        </div>
        <div>
          <component
            :is="context.MiniChart"
            type="bar"
            :height="210"
            :colors="context.contentConfig.values.colors2"
            spark
          />
          <p>{{ context.contentConfig.texts.expense }}</p>
          <h2>{{ context.contentConfig.texts.text5 }}</h2>
          <span class="text-success">{{
            context.contentConfig.texts.text6
          }}</span>
        </div>
        <div>
          <component
            :is="context.MiniChart"
            type="donut"
            :height="210"
            :series="context.contentConfig.values.series3"
            spark
          />
          <p>{{ context.contentConfig.texts.currentYear }}</p>
          <h2>{{ context.contentConfig.texts.text7 }}</h2>
          <span class="text-success">{{
            context.contentConfig.texts.text8
          }}</span>
        </div>
      </div>
      <p class="text-caption muted mt-4">
        {{
          context.contentConfig.texts
            .buySellChangesTheSampleChartNotAFinancialOrder
        }}
      </p></v-card
    >
    <div class="b3-three">
      <div class="example-stack">
        <v-card class="workspace-card"
          ><h2>{{ context.contentConfig.texts.yearlyBreakup }}</h2>
          <h3 class="mt-4">{{ context.contentConfig.texts.text9 }}</h3>
          <component
            :is="context.MiniChart"
            type="donut"
            :height="180"
            :series="context.contentConfig.values.series4"
            :labels="context.contentConfig.values.labels5"
          />
          <p class="text-success">
            {{ context.contentConfig.texts.text10
            }}<span class="muted">{{
              context.contentConfig.texts.lastYear
            }}</span>
          </p></v-card
        ><v-card class="workspace-card"
          ><h2>{{ context.contentConfig.texts.monthlyEarnings }}</h2>
          <h3 class="my-4">
            {{ context.contentConfig.texts.text11
            }}<span class="text-success text-caption">{{
              context.contentConfig.texts.text12
            }}</span>
          </h3>
          <component :is="context.MiniChart" spark :height="130" /></v-card
        ><v-card class="workspace-card"
          ><h2>{{ context.contentConfig.texts.mostVisited }}</h2>
          <v-select
            v-model="context.month"
            :items="context.contentConfig.values.items6"
            :aria-label="context.contentConfig.texts.visitsMonth"
            density="compact"
            class="my-4" /><component
            :is="context.MiniChart"
            type="bar"
            :series="[
              {
                name: context.contentConfig.texts.sanFrancisco,
                data:
                  context.month === context.contentConfig.texts.march2023
                    ? [40, 55, 42, 66, 51, 47]
                    : [52, 38, 68, 47, 75, 61],
              },
              {
                name: context.contentConfig.texts.diego,
                data: [28, 40, 22, 40, 26, 35],
              },
            ]"
            :height="230"
            :labels="context.contentConfig.values.labels7"
        /></v-card>
      </div>
      <div class="example-stack">
        <v-card class="workspace-card"
          ><h2>{{ context.contentConfig.texts.yearlySales }}</h2>
          <p class="muted">{{ context.contentConfig.texts.totalSales }}</p>
          <component :is="context.MiniChart" type="bar" :height="320" />
          <div class="b3-financial-totals">
            <div>
              <span>{{ context.contentConfig.texts.salary }}</span
              ><strong>{{ context.contentConfig.texts.text9 }}</strong>
            </div>
            <div>
              <span>{{ context.contentConfig.texts.expense }}</span
              ><strong>{{ context.contentConfig.texts.text13 }}</strong>
            </div>
          </div></v-card
        ><v-card class="workspace-card"
          ><h2>{{ context.contentConfig.texts.pageImpressions }}</h2>
          <h3 class="mt-4">{{ context.contentConfig.texts.text14 }}</h3>
          <component
            :is="context.MiniChart"
            type="bar"
            spark
            :height="130"
            :colors="context.contentConfig.values.colors8"
          />
          <p class="muted">
            {{ context.contentConfig.texts.changeYesterday
            }}<span class="text-success">{{
              context.contentConfig.texts.text12
            }}</span>
          </p></v-card
        >
        <div class="b3-two">
          <v-card class="workspace-card"
            ><h3>{{ context.contentConfig.texts.customers }}</h3>
            <p>{{ context.contentConfig.texts.text15 }}</p>
            <component
              :is="context.MiniChart"
              spark
              :height="90"
              :colors="context.contentConfig.values.colors9" /></v-card
          ><v-card class="workspace-card"
            ><h3>{{ context.contentConfig.texts.projects }}</h3>
            <p>{{ context.contentConfig.texts.text16 }}</p>
            <component :is="context.MiniChart" type="bar" spark :height="90"
          /></v-card>
        </div>
      </div>
      <div class="example-stack">
        <v-card class="workspace-card"
          ><h2>{{ context.contentConfig.texts.revenueUpdates }}</h2>
          <p class="muted">
            {{ context.contentConfig.texts.overviewOfProfit }}
          </p>
          <component
            :is="context.MiniChart"
            type="bar"
            :height="330"
            :series="context.contentConfig.values.series10"
            :labels="context.contentConfig.values.labels11" /></v-card
        ><v-card class="workspace-card"
          ><h2>{{ context.contentConfig.texts.salesOverview }}</h2>
          <p class="muted">{{ context.contentConfig.texts.everyMonth }}</p>
          <component
            :is="context.MiniChart"
            type="donut"
            :height="300"
            :series="context.contentConfig.values.series12"
            :labels="context.contentConfig.values.labels13"
          />
          <h3 class="text-center">{{ context.contentConfig.texts.text17 }}</h3>
          <div class="b3-financial-totals mt-5">
            <div>
              <span>{{ context.contentConfig.texts.profit }}</span
              ><strong>{{ context.contentConfig.texts.text18 }}</strong>
            </div>
            <div>
              <span>{{ context.contentConfig.texts.expense }}</span
              ><strong>{{ context.contentConfig.texts.text18 }}</strong>
            </div>
          </div></v-card
        >
      </div>
    </div></WorkspacePage
  >
</template>
