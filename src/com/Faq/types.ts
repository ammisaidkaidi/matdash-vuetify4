/**
 * External controller contract for Faq.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface FaqContext {
  readonly avatar: (...args: any[]) => any;
  readonly faq: any;
  readonly contentConfig: {
    readonly texts: {
      readonly fAQ: string;
      readonly frequentlyAskedQuestions: string;
      readonly getToKnowMoreAboutReadyToUseAdminDashboardTemplates: string;
      readonly sampleTeamMember: string;
      readonly stillHaveQuestions: string;
      readonly canTFindTheAnswerYouReLookingForPleaseChatToOurFriendly: string;
      readonly appsChats: string;
      readonly chatWithUs: string;
    };
    readonly values: {
      readonly items1: any[];
    };
  };
}
