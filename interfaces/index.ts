import firestore from "firebase/firestore";

export interface FakeUser {
  id: string;
  gender: "masculino" | "femenino" | "male" | "female";
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
  active_user: boolean | "Si" | "No";
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

export type MessageStatus =
  | "accepted"
  | "queued"
  | "sending"
  | "sent"
  | "failed"
  | "delivered"
  | "undelivered"
  | "receiving"
  | "received"
  | "read";

export type QueuePayload = {
  startTime: firestore.Timestamp;
  endTime?: firestore.Timestamp;
  leaseExpireTime?: firestore.Timestamp;
  state: "PENDING" | "PROCESSING" | "SUCCESS" | "ERROR";
  errorCode?: number;
  errorMessage?: string;
  info?: {
    messageSid: string;
    status?: MessageStatus;
    dateCreated?: firestore.Timestamp;
    dateSent?: firestore.Timestamp;
    dateUpdated?: firestore.Timestamp;
    messagingServiceSid?: string;
    numMedia?: string;
    numSegments?: string;
  };
};

export interface Message {
  userId: string | null;
  body: string;
  dateCreated: string;
  from: string;
  to: string;
  direction: "inbound" | "outbound-api";
  sid: string;
  delivery?: QueuePayload;
  mediaUrl?: string[];
}

export interface Day {
  type: "day";
  id: string;
  dateCreated: string;
}

export interface TwilioAPIMessage {
  body: string;
  numSegments: string;
  direction: "inbound" | "outbound-api";
  from: string;
  to: string;
  dateUpdated: string | Date;
  price: string;
  errorMessage: string | null;
  uri: string;
  accountSid: string;
  numMedia: string;
  status: MessageStatus;
  messagingServiceSid: string;
  sid: string;
  dateSent: string | Date;
  dateCreated: string;
  errorCode: string | null;
  priceUnit: string;
  apiVersion: string;
  subresourceUris: {
    media: string;
    feedback: string;
  };
}

export type VirtualizedConversationType = (Day | Message)[];

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

export type FileLike = File & { preview?: string; id: string; url: string };
export type ImagesArray = File &
  {
    url: string;
    id: string;
    size: string;
    name: string;
    type: string;
  }[];
export type UploadedFile = File & {
  url: string;
  id: string;
};

export type InsuranceCompany = {
  notes: string;
  name: string;
  logo_url?: string;
  id?: string;
  fileName?: string;
};

export type Gender = {
  value: "" | "Masculino" | "Femenino";
  id: number;
};

export type ActiveUser = {
  value: "" | "Si" | "No";
  id: number;
};
