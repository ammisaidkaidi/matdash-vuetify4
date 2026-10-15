import type { Component } from "vue";

/**
 * External controller contract for Calendar.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface CalendarContext {
  readonly RecordDialog: Component;
  readonly WorkspacePage: any;
  datePick: any;
  days: any;
  readonly demo: any;
  readonly edit: (...args: any[]) => any;
  editor: boolean;
  readonly fields: any[];
  focus: any;
  heading: any;
  mode: string;
  readonly move: (...args: any[]) => any;
  readonly onDay: (...args: any[]) => any;
  readonly props: any;
  record: Record<string, any>;
  readonly remove: (...args: any[]) => any;
  readonly save: (...args: any[]) => any;
  readonly weekdays: any[];
  readonly contentConfig: {
    readonly texts: {
      readonly div: string;
      readonly calendar: string;
      readonly fullCalendar: string;
      readonly addEvent: string;
      readonly previousPeriod: string;
      readonly nextPeriod: string;
      readonly today: string;
      readonly calendarGrid: string;
      readonly day: string;
      readonly calendarCell: string;
      readonly addEventOn: string;
      readonly month: string;
      readonly text1: string;
      readonly text2: string;
      readonly calendarWithDate: string;
      readonly upcomingEvents: string;
      readonly text3: string;
      readonly deleteEvent: string;
      readonly editEvent: string;
    };
    readonly values: {
      readonly items1: any[];
    };
  };
}
