import type { Component } from "vue";

/**
 * External controller contract for Contacts.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ContactsContext {
  readonly RecordDialog: Component;
  readonly colors: Record<string, any>;
  readonly demo: any;
  readonly edit: (...args: any[]) => any;
  editor: boolean;
  readonly fields: any[];
  readonly headers: any[];
  readonly props: any;
  record: Record<string, any>;
  readonly remove: (...args: any[]) => any;
  readonly save: (...args: any[]) => any;
  search: string;
  readonly contentConfig: {
    readonly texts: {
      readonly searchContacts: string;
      readonly addContact: string;
      readonly text1: string;
      readonly edit: string;
      readonly delete: string;
      readonly editContact: string;
    };
    readonly values: {};
  };
}
