import type { Component } from "vue";

/**
 * External controller contract for Dashboard.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface DashboardContext {
  readonly DashboardChart: Component;
  readonly budget: (...args: any[]) => any;
  readonly orders: any[];
  period: string;
  readonly periods: any[];
  products: any;
  selected: any;
  tab: string;
  readonly tabs: any[];
  readonly contentConfig: {
    readonly texts: {
      readonly accountOverview: string;
      readonly welcome: string;
      readonly backDavid: string;
      readonly budget: string;
      readonly text1: string;
      readonly expense: string;
      readonly text2: string;
      readonly assetsWelcomeBgBCkZs0OnPng: string;
      readonly anArrowHittingAPurpleTarget: string;
      readonly customers: string;
      readonly text3: string;
      readonly text4: string;
      readonly projects: string;
      readonly text5: string;
      readonly text6: string;
      readonly revenueForecast: string;
      readonly overviewOfProfit: string;
      readonly yourPerformance: string;
      readonly lastCheckOn25February: string;
      readonly light: string;
      readonly text: string;
      readonly text7: string;
      readonly learnInsightsHowToManageAllAspectsOfYourStartup: string;
      readonly text8: string;
      readonly last7Days: string;
      readonly april07April14: string;
      readonly text9: string;
      readonly lastWeek: string;
      readonly text10: string;
      readonly salesOverview: string;
      readonly text11: string;
      readonly text12: string;
      readonly text13: string;
      readonly text14: string;
      readonly revenueByProduct: string;
      readonly revenuePeriod: string;
      readonly assigned: string;
      readonly progress: string;
      readonly priority: string;
      readonly view: string;
      readonly assetsProduct: string;
      readonly jpg: string;
      readonly text15: string;
      readonly projects2: string;
      readonly totalSettlements: string;
      readonly text16: string;
      readonly totalBalance: string;
      readonly withdrawals: string;
      readonly text17: string;
      readonly projectOverview: string;
      readonly closeProject: string;
      readonly managedBy: string;
      readonly projectProgress: string;
      readonly budget2: string;
      readonly text18: string;
      readonly sampleProjectDataForThisDashboardPreview: string;
      readonly done: string;
    };
    readonly values: {};
  };
}
