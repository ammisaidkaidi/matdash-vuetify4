import type { Component } from "vue";

/**
 * External controller contract for CardWidgets.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface CardWidgetsContext {
  readonly Activities: Component;
  readonly addToCart: (...args: any[]) => any;
  readonly articles: any;
  readonly asset: (...args: any[]) => any;
  readonly avatar: (...args: any[]) => any;
  chat: any;
  readonly demo: any;
  detail: any;
  readonly gateways: any[];
  readonly gift: (...args: any[]) => any;
  readonly money: (...args: any[]) => any;
  readonly notify: (...args: any[]) => any;
  readonly pageDemos: any;
  readonly people: any[];
  sound: any;
  readonly toggleFollow: (...args: any[]) => any;
  readonly contentConfig: {
    readonly texts: {
      readonly cardsWidgets: string;
      readonly appsBlog: string;
      readonly text1: string;
      readonly text2: string;
      readonly ecommerceProductDetail: string;
      readonly add: string;
      readonly toCart: string;
      readonly addedToYourLocalCart: string;
      readonly illustrativeMusicCardFor: string;
      readonly noAudioFileIsBundled: string;
      readonly trackDetails: string;
      readonly blogImg: string;
      readonly text3: string;
      readonly artwork: string;
      readonly elSalvador: string;
      readonly bulgaria: string;
      readonly nepal: string;
      readonly followed: string;
      readonly follow: string;
      readonly text4: string;
      readonly friendAdded: string;
      readonly addFriend: string;
      readonly localRequestRemoved: string;
      readonly remove: string;
      readonly technologyDirector: string;
      readonly telecomAnalyst: string;
      readonly environmentalSpecialist: string;
      readonly pagesSocialMediaContacts: string;
      readonly viewContacts: string;
      readonly settings: string;
      readonly sound: string;
      readonly soundVolume: string;
      readonly text5: string;
      readonly chat: string;
      readonly turnOnChatDuringCallDemoPreference: string;
      readonly cancel: string;
      readonly widgetSettingsSavedLocally: string;
      readonly save: string;
      readonly s: string;
      readonly sampleGiftFor: string;
      readonly giftToFriend5000: string;
      readonly paymentGateways: string;
      readonly platformForIncome: string;
      readonly sampleTransactions: string;
      readonly text6: string;
      readonly text7: string;
      readonly viewAllTransactions: string;
      readonly upcomingActivity: string;
      readonly inNewYear: string;
      readonly appsCalendar: string;
      readonly pending: string;
      readonly done: string;
      readonly workingOn: string;
      readonly mins: string;
      readonly close: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
    };
  };
}
