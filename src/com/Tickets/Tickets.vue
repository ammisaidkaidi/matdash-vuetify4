<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { TicketsContext } from "./types";

defineProps<{ context: TicketsContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.ticketsApp"
    ><v-card class="workspace-card"
      ><div class="ticket-metrics">
        <button
          v-for="s in context.contentConfig.values.items1"
          :key="s"
          :class="[
            context.contentConfig.texts.ticketMetric,
            context.contentConfig.texts.metric + context.colors[s],
            {
              chosen: context.status === s,
            },
          ]"
          @click="context.status = s"
        >
          <strong>{{
            s === context.contentConfig.texts.all
              ? context.demo.tickets.length
              : context.demo.tickets.filter((t) => t.status === s).length
          }}</strong
          ><span
            >{{
              s === context.contentConfig.texts.all
                ? context.contentConfig.texts.total
                : s
            }}{{ context.contentConfig.texts.tickets }}</span
          >
        </button>
      </div>
      <div class="workspace-toolbar">
        <v-btn color="primary" @click="context.edit()">{{
          context.contentConfig.texts.createTicket
        }}</v-btn
        ><v-spacer /><v-text-field
          v-model="context.search"
          :label="context.contentConfig.texts.searchTickets"
          density="compact"
          clearable
        />
      </div>
      <v-data-table
        :headers="context.headers"
        :items="context.filtered"
        :search="context.search"
        :items-per-page="10"
        class="workspace-table"
        ><template #item.title="{ item }"
          ><button class="text-button ticket-title" @click="context.edit(item)">
            <strong>{{ item.title }}</strong
            ><span>{{ item.description }}</span>
          </button></template
        ><template #item.assigned="{ item }"
          ><div class="person-cell">
            <v-avatar size="32"
              ><img
                :src="context.avatar((item.id % 6) + 2)"
                :alt="item.assigned" /></v-avatar
            >{{ item.assigned }}
          </div></template
        ><template #item.status="{ item }"
          ><v-chip
            :color="context.colors[item.status]"
            size="small"
            rounded="sm"
            >{{ item.status }}</v-chip
          ></template
        ><template #item.actions="{ item }"
          ><v-btn
            icon
            size="30"
            color="error"
            variant="tonal"
            :aria-label="context.contentConfig.texts.deleteTicket + item.id"
            @click="context.remove(item)"
            ><Icon
              name="trash"
              :size="15" /></v-btn></template></v-data-table></v-card
    ><component
      :is="context.RecordDialog"
      v-model="context.editor"
      :title="
        context.record.id
          ? context.contentConfig.texts.editTicket
          : context.contentConfig.texts.createTicket
      "
      :record="context.record"
      :fields="context.fields"
      @save="context.save"
  /></WorkspacePage>
</template>
