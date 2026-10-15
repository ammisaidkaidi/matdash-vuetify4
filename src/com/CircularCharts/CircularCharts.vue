<script setup lang="ts">
import ApexChart from "vue3-apexcharts";
import WorkspacePage from "../ui/WorkspacePage.vue";
import TableCard from "../ui/TableCard.vue";
import type { CircularChartsContext } from "./types";

defineProps<{ context: CircularChartsContext }>();
</script>

<template>
  <WorkspacePage
    :title="
      context.radial
        ? context.contentConfig.texts.radialbarRadarChart
        : context.contentConfig.texts.doughnutChart
    "
    data-batch="5"
    ><div class="example-grid">
      <TableCard v-for="(c, i) in context.charts" :key="c.type" :title="c.title"
        ><div class="b5-circular-chart">
          <ApexChart
            :type="c.type"
            :options="context.configs[i]"
            :series="c.series"
            :height="350"
            width="100%"
          />
        </div>
        <div class="b5-chart-buttons">
          <v-btn
            variant="text"
            color="primary"
            size="small"
            :aria-expanded="!!context.show[c.type]"
            @click="context.show[c.type] = !context.show[c.type]"
            >{{
              context.show[c.type]
                ? context.contentConfig.texts.hideData
                : context.contentConfig.texts.viewData
            }}</v-btn
          ><v-btn
            variant="tonal"
            color="primary"
            size="small"
            @click="context.download(c)"
            >{{ context.contentConfig.texts.downloadCSV }}</v-btn
          >
        </div>
        <v-table v-if="context.show[c.type]" class="mt-4"
          ><thead>
            <tr>
              <th>{{ context.contentConfig.texts.label }}</th>
              <th>{{ context.contentConfig.texts.value }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(label, j) in c.labels" :key="label">
              <td>{{ label }}</td>
              <td>{{ context.values(c)[j] }}</td>
            </tr>
          </tbody></v-table
        ></TableCard
      >
    </div></WorkspacePage
  >
</template>
