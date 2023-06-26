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
  delivery?: {
    startTime: FirebaseFirestore.Timestamp;
    endTime?: FirebaseFirestore.Timestamp;
    leaseExpireTime?: FirebaseFirestore.Timestamp;
    state: "PENDING" | "PROCESSING" | "SUCCESS" | "ERROR";
    errorCode?: number;
    errorMessage?: string;
    info?: {
      messageSid: string;
      status?: MessageStatus;
      dateCreated?: FirebaseFirestore.Timestamp;
      dateSent?: FirebaseFirestore.Timestamp;
      dateUpdated?: FirebaseFirestore.Timestamp;
      messagingServiceSid?: string;
      numMedia?: string;
      numSegments?: string;
    };
  };
  to: string;
  from: string;
  body: string;
  mediaUrl?: string[];
  sid: string;
  userId: string;
};

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
  MediaUrl0?: string;
}

export type document = {
  url: string;
  type: string;
  name: string;
};
