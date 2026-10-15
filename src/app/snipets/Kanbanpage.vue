<script setup lang="ts">
import {
  shallowReactive as __viewReactive,
  unref as __viewUnref,
  isRef as __viewIsRef,
} from "vue";
import PresentationalView from "../../com/Kanban/Kanban.vue";
import type { KanbanContext } from "../../com/Kanban/types";
import { ref } from "vue";
import WorkspacePage from "../../com/ui/WorkspacePage.vue";
import RecordDialog from "../../com/ui/RecordDialog.vue";
import { demo, nextId } from "../../composables/useDemoStore";
import { confirmDemo, notify } from "../../composables/useFeedback";
const columns = ["Todo", "In Progress", "Pending", "Done"];
const editor = ref(false),
  record = ref({}),
  dragged = ref(null);
const fields = [
  {
    key: "title",
    label: "Task title",
    required: true,
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
  },
  {
    key: "column",
    label: "Column",
    items: columns,
    required: true,
  },
  {
    key: "tag",
    label: "Category",
    items: ["Design", "Development", "Mobile"],
    required: true,
  },
];
function edit(task, column = "Todo") {
  record.value = task
    ? {
        ...task,
      }
    : {
        title: "",
        description: "",
        column,
        tag: "Design",
        image: "",
        date: new Date().toISOString().slice(0, 10),
      };
  editor.value = true;
}
function save(task) {
  if (task.id)
    demo.tasks.splice(
      demo.tasks.findIndex((t) => t.id === task.id),
      1,
      task,
    );
  else
    demo.tasks.push({
      ...task,
      id: nextId(demo.tasks),
    });
  editor.value = false;
  notify("Task saved locally.");
}
function drop(column) {
  const task = demo.tasks.find((t) => t.id === dragged.value);
  if (task) task.column = column;
  dragged.value = null;
}
async function remove(task) {
  if (await confirmDemo("Delete this task?"))
    demo.tasks = demo.tasks.filter((t) => t.id !== task.id);
}

/** State, data sources, route decisions, content, and action callbacks stay here. */
const __viewContext: KanbanContext = __viewReactive({
  get RecordDialog() {
    return __viewUnref(RecordDialog);
  },
  get columns() {
    return __viewUnref(columns);
  },
  get demo() {
    return __viewUnref(demo);
  },
  get dragged() {
    return __viewUnref(dragged);
  },
  set dragged(value: any) {
    if (__viewIsRef(dragged)) (dragged as any).value = value;
  },
  get drop() {
    return __viewUnref(drop);
  },
  get edit() {
    return __viewUnref(edit);
  },
  get editor() {
    return __viewUnref(editor);
  },
  set editor(value: any) {
    if (__viewIsRef(editor)) (editor as any).value = value;
  },
  get fields() {
    return __viewUnref(fields);
  },
  get record() {
    return __viewUnref(record);
  },
  set record(value: any) {
    if (__viewIsRef(record)) (record as any).value = value;
  },
  get remove() {
    return __viewUnref(remove);
  },
  get save() {
    return __viewUnref(save);
  },
  contentConfig: {
    texts: {
      kanbanApplication: "Kanban Application",
      kanbanColumn: "kanban-column",
      column: "column-",
      addTaskTo: "Add task to ",
      taskActions: "Task actions ",
      editMoveTask: "Edit / move task",
      deleteTask: "Delete task",
      taskInspiration: "Task inspiration",
      design: "Design",
      success: "success",
      mobile: "Mobile",
      primary: "primary",
      warning: "warning",
      dropATaskHereOrAddOne: " Drop a task here or add one ",
      dragCardsBetweenColumnsOrUseEditMoveTaskOnMobile:
        " Drag cards between columns, or use Edit / move task on mobile. ",
      editTask: "Edit Task",
      addTask: "Add Task",
    },
    values: {},
  },
});
</script>

<template>
  <PresentationalView :context="__viewContext">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </PresentationalView>
</template>
