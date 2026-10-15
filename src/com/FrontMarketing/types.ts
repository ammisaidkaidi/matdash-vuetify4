import type { Component } from "vue";

/**
 * External controller contract for FrontMarketing.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface FrontMarketingContext {
  readonly FrontLayout: Component;
  about: any;
  readonly asset: (...args: any[]) => any;
  readonly avatar: (...args: any[]) => any;
  feature: any;
  readonly frontFaq: any;
  plan: any;
  readonly pricing: any[];
  slide: number;
  tab: string;
  readonly team: any[];
  readonly testimonials: any[];
  readonly contentConfig: {
    readonly texts: {
      readonly b3MarketingHero: string;
      readonly dESIGNEDFORYOURNEXTBIGIDEA: string;
      readonly getToKnowMatDashDashboardTemplate: string;
      readonly aFeaturePackedDashboardBuiltForDevelopersNeeds: string;
      readonly sampleDeveloper: string;
      readonly text1: string;
      readonly developersAgenciesUsingOurTemplates: string;
      readonly authLogin: string;
      readonly logIn: string;
      readonly illustrativeReferenceFiguresNotMetricsForThisRecreation: string;
      readonly authRegister: string;
      readonly createAnAccount: string;
      readonly frontPageContactUs: string;
      readonly viewOpenPositions: string;
      readonly doYouNeedAHighlyCustomizableAndDeveloperFriendlyPremium: string;
      readonly mainBanner: string;
      readonly matDashDashboardPreviews: string;
      readonly over45000Clients: string;
      readonly andCounting: string;
      readonly buildWithReusableComponentsAndThoughtfulDetailsFocusOnT: string;
      readonly requestACallback: string;
      readonly clearGuidanceAndThoughtfulToolsForYourNextProject: string;
      readonly theHassleFreeSetupProcess: string;
      readonly lightprimary: string;
      readonly lighterror: string;
      readonly lightsecondary: string;
      readonly canvas: string;
      readonly thoughtfulComponentsToHelpYouBuildWithConfidence: string;
      readonly featureImage: string;
      readonly schedulingAndWorkflowPreview: string;
      readonly factorInOutsideColleagues: string;
      readonly roundRobinPooling: string;
      readonly frontPageAboutUs: string;
      readonly learnMore: string;
      readonly aUniqueStoryInEveryNumber: string;
      readonly statisticsShownAsReferenceTemplateSampleContent: string;
      readonly meetOurTeam: string;
      readonly ourRobustAnalyticsOfferRichInsightsIntoThe: string;
      readonly informationBuyersWantInformingWhereTeams: string;
      readonly leader: string;
      readonly text2: string;
      readonly saveValuableTimeAndEffortSpentSearchingForASolution: string;
      readonly contactUsNow: string;
      readonly wordsFromCustomers: string;
      readonly pellentesqueVariusSemperOdioNonPretium: string;
      readonly previousTestimonial: string;
      readonly nextTestimonial: string;
      readonly thisTemplateIsGreatUIRichAndUpToDateAlthoughItIsPrettyM: string;
      readonly cEOHeadOfCompInc: string;
      readonly sampleTestimonialReproducedFromTheReference: string;
      readonly of3: string;
      readonly primary: string;
      readonly secondary: string;
      readonly error: string;
      readonly success: string;
      readonly warning: string;
      readonly referenceFeatureLabelsSeeTheRouteDirectoryForThisRecrea: string;
      readonly fairPricingForEveryone: string;
      readonly chooseTheLayoutThatFitsYourProjectTheseAreIllustrativeT: string;
      readonly popular: string;
      readonly oneProject: string;
      readonly useForASingleEndProduct: string;
      readonly useForMultipleEndProducts: string;
      readonly text3: string;
      readonly oneTimePay: string;
      readonly fullSourceCode: string;
      readonly documentation: string;
      readonly useInSaaSApp: string;
      readonly oneYearTechnicalSupport: string;
      readonly purchaseNow: string;
      readonly demoPricingOnlyNoPurchasesVendorLicensesOrSupportContra: string;
      readonly frequentlyAskedQuestions: string;
      readonly stillHaveAQuestion: string;
      readonly contactUs: string;
      readonly or: string;
      readonly appsTickets: string;
      readonly openDemoTickets: string;
      readonly text4: string;
      readonly demoPreview: string;
      readonly noPurchaseWillBeMadeThisRecreationDoesNotSellCommercial: string;
      readonly gotIt: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
      readonly items3: any[];
      readonly items4: any[];
      readonly items5: any[];
      readonly items6: any[];
    };
  };
}
