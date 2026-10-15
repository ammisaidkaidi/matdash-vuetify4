/**
 * External controller contract for Auth.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface AuthContext {
  readonly asset: (...args: any[]) => any;
  boxed: any;
  error: string;
  form: any;
  readonly loginPath: any;
  mode: any;
  readonly notify: (...args: any[]) => any;
  readonly passwordRule: (...args: any[]) => any;
  remember: boolean;
  readonly required: any;
  reveal: boolean;
  slide: number;
  readonly slides: any[];
  readonly submit: (...args: any[]) => any;
  success: boolean;
  suffix: any;
  title: any;
  readonly validEmail: any;
  readonly values: Record<string, any>;
  readonly contentConfig: {
    readonly texts: {
      readonly b5AuthPage: string;
      readonly b5AuthBoxed: string;
      readonly b5AuthSide: string;
      readonly frontPageHomepage: string;
      readonly matDashHomepage: string;
      readonly assetsLogoDq6uoDMSvg: string;
      readonly matDash: string;
      readonly forgot: string;
      readonly enterTheEmailAddressAssociatedWithYourAccountToPreviewP: string;
      readonly yourAdminDashboard: string;
      readonly facebook: string;
      readonly google: string;
      readonly authenticationIsNotConnectedInThisDemo: string;
      readonly info: string;
      readonly b5Provider: string;
      readonly g: string;
      readonly f: string;
      readonly signInWith: string;
      readonly text1: string;
      readonly orSign: string;
      readonly login: string;
      readonly in: string;
      readonly up: string;
      readonly withEmail: string;
      readonly orSignInWith: string;
      readonly demoForm: string;
      readonly register: string;
      readonly name: string;
      readonly username: string;
      readonly emailAddress: string;
      readonly text: string;
      readonly email: string;
      readonly password: string;
      readonly authForgotPassword: string;
      readonly forgotPassword: string;
      readonly password2: string;
      readonly hidePassword: string;
      readonly showPassword: string;
      readonly eyeoff: string;
      readonly eye: string;
      readonly keepMeLoggedIn: string;
      readonly rememberThisDevice: string;
      readonly emailFormatValidatedNoResetEmailWasSentAndNoPasswordWas: string;
      readonly registrationValidatedLocallyNoAccountWasCreatedThePassw: string;
      readonly text2: string;
      readonly primary: string;
      readonly signIn: string;
      readonly signUp: string;
      readonly forgotPassword2: string;
      readonly backToLogin: string;
      readonly donTHaveAnAccountYet: string;
      readonly alreadyHaveAnAccount: string;
      readonly authRegister: string;
      readonly signUpNow: string;
      readonly createAnAccount: string;
      readonly signInNow: string;
      readonly signIn2: string;
      readonly localDemoOnly: string;
      readonly username2: string;
      readonly demoMatdashLocal: string;
      readonly password3: string;
      readonly demo123: string;
      readonly onlyTheDemoSessionFlagCanBeRememberedCredentialsAreNeve: string;
      readonly useSampleInformationNoAccountEmailOrPasswordServiceIsCo: string;
      readonly learnMore: string;
      readonly featureSlide: string;
      readonly welcomeTo: string;
      readonly matDashHelpsDevelopersToBuildOrganizedAndWellCodedDashb: string;
    };
    readonly values: {};
  };
}
