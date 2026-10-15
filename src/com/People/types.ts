import type { Component } from "vue";

/**
 * External controller contract for People.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface PeopleContext {
  readonly ProfileHeader: Component;
  isFollowers: any;
  isSocial: any;
  readonly notify: (...args: any[]) => any;
  readonly pageDemos: any;
  people: any;
  query: string;
  selected: any;
  title: any;
  readonly toggleFollow: (...args: any[]) => any;
  readonly contentConfig: {
    readonly texts: {
      readonly search: string;
      readonly b3PeopleGrid: string;
      readonly b3Person: string;
      readonly view: string;
      readonly flat: string;
      readonly outlined: string;
      readonly unfollow: string;
      readonly follow: string;
      readonly followed: string;
      readonly follow2: string;
      readonly connect: string;
      readonly error: string;
      readonly primary: string;
      readonly text1: string;
      readonly noMatchingPeople: string;
      readonly sampleCommunityProfileConnectionsAndMessagesInThisRecre: string;
      readonly close: string;
      readonly demoConnectionRequestNotedLocallyNoNotificationWasSent: string;
      readonly appsChats: string;
      readonly openDemoChats: string;
    };
    readonly values: {
      readonly items1: any[];
    };
  };
}
