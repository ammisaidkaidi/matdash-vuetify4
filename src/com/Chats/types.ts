/**
 * External controller contract for Chats.
 * The reusable view owns no seed records, store, router, or persistence logic.
 * Mutable state is supplied through controller-backed accessors; callbacks handle actions.
 * Broad data shapes are intentionally configurable; tighten them for a specific application.
 */
export interface ChatsContext {
  readonly asset: (...args: any[]) => any;
  attachment: any;
  readonly avatar: (...args: any[]) => any;
  filtered: any;
  info: boolean;
  messages: any;
  person: any;
  search: string;
  selected: any;
  readonly send: (...args: any[]) => any;
  text: string;
  readonly upload: (...args: any[]) => any;
  readonly contentConfig: {
    readonly texts: {
      readonly chatApp: string;
      readonly chatLayout: string;
      readonly davidMcMichael: string;
      readonly designer: string;
      readonly searchContact: string;
      readonly recentChats: string;
      readonly chatContact: string;
      readonly startAConversation: string;
      readonly online: string;
      readonly offline: string;
      readonly sampleStatus: string;
      readonly toggleConversationDetails: string;
      readonly chatMessage: string;
      readonly you: string;
      readonly text1: string;
      readonly sharedLocalAttachment: string;
      readonly typeAMessage: string;
      readonly attachImage: string;
      readonly sendMessage: string;
      readonly media: string;
      readonly blogImg1: string;
      readonly sampleConversationMedia: string;
      readonly conversationDetails: string;
      readonly messagesAndUploadedImagesStayInThisBrowserTheyAreNotDel: string;
      readonly localConversation: string;
    };
    readonly values: {};
  };
}
