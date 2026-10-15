/**
 * External controller contract for Validation.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ValidationContext {
  age: any;
  ageForm: any;
  checkError: boolean;
  checks: any[];
  drink: any;
  readonly leave: Record<string, any>;
  leaveForm: any;
  readonly login: Record<string, any>;
  loginForm: any;
  readonly passwordRule: (...args: any[]) => any;
  radioError: boolean;
  readonly required: any;
  readonly signup: Record<string, any>;
  signupForm: any;
  readonly submit: (...args: any[]) => any;
  readonly submitChoices: (...args: any[]) => any;
  readonly validEmail: any;
  readonly contentConfig: {
    readonly texts: {
      readonly formValidation: string;
      readonly signUpValidation: string;
      readonly assetsLogoDq6uoDMSvg: string;
      readonly matDash: string;
      readonly name: string;
      readonly email: string;
      readonly password: string;
      readonly confirmPassword: string;
      readonly passwordsDoNotMatch: string;
      readonly rememberThisDevice: string;
      readonly authForgotPassword: string;
      readonly forgotPassword: string;
      readonly submit: string;
      readonly loginValidation: string;
      readonly select: string;
      readonly ageValidation: string;
      readonly age: string;
      readonly onLeave: string;
      readonly onLeaveValidation: string;
      readonly checkboxes: string;
      readonly checkboxValidation: string;
      readonly text1: string;
      readonly none: string;
      readonly youHaveToChooseAtLeastOneDrink: string;
      readonly radio: string;
      readonly radioValidation: string;
      readonly youHaveToChooseOneDrink: string;
      readonly text2: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
      readonly items3: any[];
    };
  };
}
