import type { Component } from "vue";

/**
 * External controller contract for Tickets.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface TicketsContext {
  readonly RecordDialog: Component;
  readonly avatar: (...args: any[]) => any;
  readonly colors: Record<string, any>;
  readonly demo: any;
  readonly edit: (...args: any[]) => any;
  editor: boolean;
  readonly fields: any[];
  filtered: any;
  readonly headers: any[];
  record: Record<string, any>;
  readonly remove: (...args: any[]) => any;
  readonly save: (...args: any[]) => any;
  search: string;
  status: string;
  readonly contentConfig: {
    readonly texts: {
      readonly ticketsApp: string;
      readonly ticketMetric: string;
      readonly metric: string;
      readonly all: string;
      readonly total: string;
      readonly tickets: string;
      readonly createTicket: string;
      readonly searchTickets: string;
      readonly deleteTicket: string;
      readonly editTicket: string;
    };
    readonly values: {
      readonly items1: any[];
    };
  };
}
