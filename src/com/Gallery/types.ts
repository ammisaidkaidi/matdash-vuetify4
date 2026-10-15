import type { Component } from "vue";

/**
 * External controller contract for Gallery.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface GalleryContext {
  readonly GalleryGrid: Component;
  readonly ProfileHeader: Component;
  profile: any;
  readonly contentConfig: {
    readonly texts: {
      readonly gallery: string;
      readonly galleryLightbox: string;
    };
    readonly values: {};
  };
}
