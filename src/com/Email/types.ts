/**
 * External controller contract for Email.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface EmailContext {
  readonly avatar: (...args: any[]) => any;
  readonly compose: (...args: any[]) => any;
  composer: boolean;
  readonly demo: any;
  draft: Record<string, any>;
  filtered: any;
  folder: string;
  readonly folders: any[];
  form: any;
  readonly labelColors: Record<string, any>;
  mail: any;
  readonly open: (...args: any[]) => any;
  readonly remove: (...args: any[]) => any;
  readonly required: any;
  readonly savedMail: (...args: any[]) => any;
  search: string;
  readonly send: (...args: any[]) => any;
  readonly validEmail: any;
  readonly contentConfig: {
    readonly texts: {
      readonly emailApp: string;
      readonly compose: string;
      readonly text1: string;
      readonly sORTBY: string;
      readonly lABELS: string;
      readonly labelDotBg: string;
      readonly searchEmails: string;
      readonly emailPreview: string;
      readonly noMessagesInThisView: string;
      readonly warning: string;
      readonly toggleStarred: string;
      readonly primary: string;
      readonly toggleImportant: string;
      readonly deleteEmail: string;
      readonly reply: string;
      readonly forward: string;
      readonly noEmailSelected: string;
      readonly newMessage: string;
      readonly closeComposer: string;
      readonly to: string;
      readonly subject: string;
      readonly message: string;
      readonly localDemonstrationOnlyMessagesAreNotDelivered: string;
      readonly draft: string;
      readonly saveDraft: string;
      readonly sendDemoMessage: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
