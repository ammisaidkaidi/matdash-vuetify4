import type { Component } from "vue";

/**
 * External controller contract for Kanban.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface KanbanContext {
  readonly RecordDialog: Component;
  readonly columns: any[];
  readonly demo: any;
  dragged: any;
  readonly drop: (...args: any[]) => any;
  readonly edit: (...args: any[]) => any;
  editor: boolean;
  readonly fields: any[];
  record: Record<string, any>;
  readonly remove: (...args: any[]) => any;
  readonly save: (...args: any[]) => any;
  readonly contentConfig: {
    readonly texts: {
      readonly kanbanApplication: string;
      readonly kanbanColumn: string;
      readonly column: string;
      readonly addTaskTo: string;
      readonly taskActions: string;
      readonly editMoveTask: string;
      readonly deleteTask: string;
      readonly taskInspiration: string;
      readonly design: string;
      readonly success: string;
      readonly mobile: string;
      readonly primary: string;
      readonly warning: string;
      readonly dropATaskHereOrAddOne: string;
      readonly dragCardsBetweenColumnsOrUseEditMoveTaskOnMobile: string;
      readonly editTask: string;
      readonly addTask: string;
    };
    readonly values: {};
  };
}
