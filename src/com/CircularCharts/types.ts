/**
 * External controller contract for CircularCharts.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface CircularChartsContext {
  charts: any;
  configs: any;
  readonly download: (...args: any[]) => any;
  radial: any;
  show: Record<string, any>;
  readonly values: (...args: any[]) => any;
  readonly contentConfig: {
    readonly texts: {
      readonly radialbarRadarChart: string;
      readonly doughnutChart: string;
      readonly hideData: string;
      readonly viewData: string;
      readonly downloadCSV: string;
      readonly label: string;
      readonly value: string;
    };
    readonly values: {};
  };
}
