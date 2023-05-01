export interface FakeUser {
  id: string;
  gender: "masculino" | "femenino";
  active_user: boolean;
  firstname: string;
  second_name: string;
  lastname: string;
  second_lastname: string;
  fullname: string;
  email: string;
  notes: string;
  phone: string;
  avatar: string;
  insurance_company: string;
}

export interface RealUser {
  active_user: boolean;
  email: string;
  firstname: string;
  fullname: string;
  gender: "masculino" | "femenino";
  id: string;
  insurance_company: string;
  lastname: string;
  notes: string;
  phone: string;
  second_lastname: string;
  second_name: string;
  conversations?: VirtualizedConversationType;
}

export interface Message {
  status: string;
  body: string;
  dateCreated: string;
  from: string;
  to: string;
  direction: "inbound" | "outbound-api";
  sid?: string;
  numMedia: string;
  mediaUrl?: UploadedFile[];
  accoundSid?: string;
  apiVersion?: string;
  dateSent?: string;
  dateUpdated?: string;
  errorCode?: string;
  errorMessage?: string;
  messagingServiceSid?: string;
  numSegments?: string;
  price?: string;
  priceUnit?: string;
  subresourceUris?: {
    media: string;
    feedback: string;
  };
  uri?: string;
  accountSid?: string;
}

export interface Day {
  type: "day";
  id: string;
  date: string;
}

export type VirtualizedConversationType = (Day | Message)[];

export interface RestAPIMessage {
  body: string;
  num_segments: string;
  direction: "inbound" | "outbound-api";
  from: string;
  date_updated: string;
  price: string;
  error_message: string | null;
  uri: string;
  account_sid: string;
  num_media: string;
  to: string;
  date_created: string;
  status: string;
  sid: string;
  date_sent: string;
  messaging_service_sid: string | null;
  error_code: number | string | null;
  price_unit: string;
  api_version: string;
  subresource_uris: {
    media: string | string[];
    feedback: string;
  };
}

export interface ConversationInterface {
  [key: string]: Message[];
}

export interface InboundMessage {
  ToCountry: string;
  ToState: string;
  SmsMessageSid: string;
  NumMedia: string;
  ToCity: string;
  FromZip: string;
  SmsSid: string;
  FromState: string;
  SmsStatus: string;
  FromCity: string;
  Body: string;
  FromCountry: string;
  To: string;
  MessagingServiceSid: string;
  ToZip: string;
  NumSegments: string;
  MessageSid: string;
  AccountSid: string;
  From: string;
  ApiVersion: string;
}

export interface IncomingMessage extends InboundMessage {
  user: RealUser;
  message: InboundMessage;
}

export interface IdentifiedUser extends InboundMessage {
  user: RealUser;
  message: InboundMessage;
}

export type ImageType = {
  "image/*": [".jpeg", ".png", ".jpg", ".gif", ".svg", ".webp"];
};

export type DocumentType = {
  "application/pdf": [".pdf"];
  "text/plain": [".txt"];
  "application/msword": [".doc", ".docx"];
  "application/vnd.ms-powerpoint": [".ppt", ".pptx"];
  "application/rtf": [".rtf"];
};

export type FileLike = File & { preview?: string; id: string };
export type ImagesArray = FileLike[];
export type UploadedFile = FileLike & {
  url: string;
};
