<script setup lang="ts">
import WorkspacePage from "../ui/WorkspacePage.vue";
import Icon from "../ui/Icon.vue";
import type { KanbanContext } from "./types";

defineProps<{ context: KanbanContext }>();
</script>

<template>
  <WorkspacePage :title="context.contentConfig.texts.kanbanApplication"
    ><div class="kanban-board">
      <section
        v-for="(column, index) in context.columns"
        :key="column"
        :class="[
          context.contentConfig.texts.kanbanColumn,
          context.contentConfig.texts.column + index,
        ]"
        @dragover.prevent
        @drop.prevent="context.drop(column)"
      >
        <header>
          <h3>
            {{ column }}
            <small>{{
              context.demo.tasks.filter((t) => t.column === column).length
            }}</small>
          </h3>
          <v-btn
            icon
            size="28"
            variant="text"
            :aria-label="context.contentConfig.texts.addTaskTo + column"
            @click="context.edit(null, column)"
            ><Icon name="plus" :size="18"
          /></v-btn>
        </header>
        <v-card
          v-for="task in context.demo.tasks.filter((t) => t.column === column)"
          :key="task.id"
          class="task-card"
          draggable="true"
          @dragstart="context.dragged = task.id"
          @dragend="context.dragged = null"
          ><div class="task-head">
            <button class="text-button" @click="context.edit(task)">
              {{ task.title }}</button
            ><v-menu
              ><template #activator="{ props }"
                ><v-btn
                  v-bind="props"
                  icon
                  variant="text"
                  size="24"
                  :aria-label="
                    context.contentConfig.texts.taskActions + task.id
                  "
                  ><Icon name="more" :size="15" /></v-btn></template
              ><v-list density="compact"
                ><v-list-item
                  :title="context.contentConfig.texts.editMoveTask"
                  @click="context.edit(task)" /><v-list-item
                  :title="context.contentConfig.texts.deleteTask"
                  @click="context.remove(task)" /></v-list
            ></v-menu>
          </div>
          <img
            v-if="task.image"
            :src="task.image"
            :alt="context.contentConfig.texts.taskInspiration"
            class="task-image"
          />
          <p v-if="task.description" class="task-description">
            {{ task.description }}
          </p>
          <footer>
            <span><Icon name="calendar" :size="12" /> {{ task.date }}</span
            ><v-chip
              :color="
                task.tag === context.contentConfig.texts.design
                  ? context.contentConfig.texts.success
                  : task.tag === context.contentConfig.texts.mobile
                    ? context.contentConfig.texts.primary
                    : context.contentConfig.texts.warning
              "
              size="x-small"
              rounded="sm"
              >{{ task.tag }}</v-chip
            >
          </footer></v-card
        ><button
          v-if="!context.demo.tasks.some((t) => t.column === column)"
          class="kanban-empty"
          @click="context.edit(null, column)"
        >
          {{ context.contentConfig.texts.dropATaskHereOrAddOne }}
        </button>
      </section>
    </div>
    <p class="text-caption muted mt-4">
      {{
        context.contentConfig.texts
          .dragCardsBetweenColumnsOrUseEditMoveTaskOnMobile
      }}
    </p>
    <component
      :is="context.RecordDialog"
      v-model="context.editor"
      :title="
        context.record.id
          ? context.contentConfig.texts.editTask
          : context.contentConfig.texts.addTask
      "
      :record="context.record"
      :fields="context.fields"
      @save="context.save"
  /></WorkspacePage>
</template>
