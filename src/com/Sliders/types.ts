/**
 * External controller contract for Sliders.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface SlidersContext {
  readonly fruitTicks: Record<string, any>;
  readonly mdiVolumeHigh: any;
  readonly mdiVolumeLow: any;
  readonly model: Record<string, any>;
  readonly contentConfig: {
    readonly texts: {
      readonly slider: string;
      readonly default: string;
      readonly defaultSlider: string;
      readonly icon: string;
      readonly volumeSlider: string;
      readonly disabled: string;
      readonly disabledSlider: string;
      readonly steps: string;
      readonly steppedSlider: string;
      readonly ticks: string;
      readonly ticksSlider: string;
      readonly tickSize: string;
      readonly largeTicksSlider: string;
      readonly custom: string;
      readonly customSlider: string;
      readonly secondary: string;
      readonly primary: string;
      readonly fruitSlider: string;
      readonly moodSlider: string;
      readonly text1: string;
      readonly text2: string;
      readonly text3: string;
      readonly rangeSlider: string;
      readonly vertical: string;
      readonly verticalSlider: string;
    };
    readonly values: {};
  };
}
