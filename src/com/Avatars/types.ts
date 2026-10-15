/**
 * External controller contract for Avatars.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface AvatarsContext {
  readonly avatar: (...args: any[]) => any;
  readonly colors: any[];
  readonly contentConfig: {
    readonly texts: {
      readonly avatar: string;
      readonly imageAvatars: string;
      readonly samplePerson: string;
      readonly letterAvatars: string;
      readonly aBCDE: string;
      readonly iconAvatars: string;
      readonly variant: string;
      readonly sizes: string;
      readonly pixelAvatar: string;
    };
    readonly values: {
      readonly items1: any[];
      readonly items2: any[];
      readonly items3: any[];
    };
  };
}
