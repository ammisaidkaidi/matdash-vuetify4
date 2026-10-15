/**
 * External controller contract for Dialogs.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface DialogsContext {
  active: any;
  choice: string;
  readonly close: (...args: any[]) => any;
  readonly demos: any[];
  form: any;
  nested: boolean;
  readonly profile: Record<string, any>;
  readonly required: any;
  readonly save: (...args: any[]) => any;
  readonly settings: Record<string, any>;
  readonly validEmail: any;
  readonly contentConfig: {
    readonly texts: {
      readonly dialog: string;
      readonly persistent: string;
      readonly fullScreen: string;
      readonly none: string;
      readonly scrollable: string;
      readonly transition: string;
      readonly dialogBottomTransition: string;
      readonly dialogTransition: string;
      readonly settings: string;
      readonly form: string;
      readonly userProfile: string;
      readonly selectACountry: string;
      readonly nestedDialog: string;
      readonly dialog1: string;
      readonly dialog2: string;
      readonly closeDialog: string;
      readonly b5DialogBody: string;
      readonly fullName: string;
      readonly email: string;
      readonly notificationsPreferences: string;
      readonly enableNotifications: string;
      readonly soundEffects: string;
      readonly theseSettingsAreDemonstrationValuesOnly: string;
      readonly thisDialogStaysOpenWhenYouClickOutsideOrPressEscapeChoo: string;
      readonly aDialogFocusesAttentionOnADecisionOrASmallPieceOfInform: string;
      readonly openDialog2: string;
      readonly disagree: string;
      readonly cancel: string;
      readonly agree: string;
      readonly save: string;
      readonly select: string;
      readonly done: string;
      readonly dialog22: string;
      readonly thisNestedDialogAppearsAboveDialog1: string;
      readonly closeDialog2: string;
    };
    readonly values: {
      readonly items1: any[];
    };
  };
}
