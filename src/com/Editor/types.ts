/**
 * External controller contract for Editor.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface EditorContext {
  readonly download: (...args: any[]) => any;
  editor: any;
  imageInput: any;
  readonly reset: (...args: any[]) => any;
  readonly run: (...args: any[]) => any;
  readonly tools: any[];
  readonly upload: (...args: any[]) => any;
  wordCount: any;
  readonly contentConfig: {
    readonly texts: {
      readonly editor: string;
      readonly textFormatting: string;
      readonly primary: string;
      readonly insertImage: string;
      readonly insertLocalImageUpTo2MB: string;
      readonly undo: string;
      readonly redo: string;
      readonly editorImageFile: string;
      readonly wordsUnsavedLocalContent: string;
      readonly resetSample: string;
      readonly downloadHTML: string;
    };
    readonly values: {};
  };
}
