/**
 * External controller contract for Lists.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ListsContext {
  bluetooth: boolean;
  folder: string;
  readonly items: any[];
  nested: any[];
  rounded: any[];
  scrollItem: string;
  selected: any[];
  wifi: boolean;
  readonly contentConfig: {
    readonly texts: {
      readonly lists: string;
      readonly simpleList: string;
      readonly selected: string;
      readonly nestedList: string;
      readonly nestedListItems: string;
      readonly sentMail: string;
      readonly drafts: string;
      readonly inbox: string;
      readonly starred: string;
      readonly important: string;
      readonly folderList: string;
      readonly disabledList: string;
      readonly switchList: string;
      readonly wiFi: string;
      readonly bluetooth: string;
      readonly roundedList: string;
      readonly customAlignedList: string;
      readonly textError: string;
      readonly textSuccess: string;
      readonly scrollableList: string;
      readonly item: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
