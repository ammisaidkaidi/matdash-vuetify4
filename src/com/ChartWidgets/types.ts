import type { Component } from "vue";

/**
 * External controller contract for ChartWidgets.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ChartWidgetsContext {
  readonly MiniChart: Component;
  income: any[];
  month: string;
  trade: string;
  readonly contentConfig: {
    readonly texts: {
      readonly chartsWidgets: string;
      readonly text1: string;
      readonly currentValue: string;
      readonly buy: string;
      readonly sell: string;
      readonly income: string;
      readonly text2: string;
      readonly text3: string;
      readonly text4: string;
      readonly expense: string;
      readonly text5: string;
      readonly text6: string;
      readonly currentYear: string;
      readonly text7: string;
      readonly text8: string;
      readonly buySellChangesTheSampleChartNotAFinancialOrder: string;
      readonly yearlyBreakup: string;
      readonly text9: string;
      readonly text10: string;
      readonly lastYear: string;
      readonly monthlyEarnings: string;
      readonly text11: string;
      readonly text12: string;
      readonly mostVisited: string;
      readonly visitsMonth: string;
      readonly sanFrancisco: string;
      readonly march2023: string;
      readonly diego: string;
      readonly yearlySales: string;
      readonly totalSales: string;
      readonly salary: string;
      readonly text13: string;
      readonly pageImpressions: string;
      readonly text14: string;
      readonly changeYesterday: string;
      readonly customers: string;
      readonly text15: string;
      readonly projects: string;
      readonly text16: string;
      readonly revenueUpdates: string;
      readonly overviewOfProfit: string;
      readonly salesOverview: string;
      readonly everyMonth: string;
      readonly text17: string;
      readonly profit: string;
      readonly text18: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly colors2: any[];
      readonly series3: any[];
      readonly series4: any[];
      readonly labels5: any[];
      readonly items6: any[];
      readonly labels7: any[];
      readonly colors8: any[];
      readonly colors9: any[];
      readonly series10: any[];
      readonly labels11: any[];
      readonly series12: any[];
      readonly labels13: any[];
    };
  };
}
