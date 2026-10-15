/**
 * External controller contract for FileInputs.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface FileInputsContext {
  readonly avatarRules: any[];
  readonly files: Record<string, any>;
  readonly mdiCamera: any;
  selectedCount: any;
  readonly contentConfig: {
    readonly texts: {
      readonly fileInputs: string;
      readonly accept: string;
      readonly fileInput: string;
      readonly chips: string;
      readonly fileInputWChips: string;
      readonly counter: string;
      readonly fileInputWithCounter: string;
      readonly density: string;
      readonly compactFileInput: string;
      readonly multiple: string;
      readonly multipleFiles: string;
      readonly prependIcon: string;
      readonly fileWithCameraIcon: string;
      readonly validation: string;
      readonly avatar: string;
      readonly complexSelectionSlots: string;
      readonly customSelectionFiles: string;
      readonly text1: string;
      readonly files: string;
      readonly filesSelectedFilesRemainInMemoryAndAreNotUploaded: string;
      readonly clearAllFiles: string;
    };
    readonly values: {};
  };
}
