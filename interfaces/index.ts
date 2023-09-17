import firestore from "firebase/firestore";

export interface FakeUser {
  id: string;
  gender: "masculino" | "femenino" | "male" | "female";
  activeUser: boolean;
  firstname: string;
  secondName: string;
  lastname: string;
  secondLastname: string;
  fullname: string;
  email: string;
  notes: string;
  phone: string;
  avatar: string;
  insuranceCompany: string;
  lastVisitedTimestamp?: string;
  firstTimeVisit: boolean;
  pdfData?: {
    language: "es" | "en";
    agent: "female" | "male";
    date: string;
  };
}

export interface RealUser {
  activeUser: boolean | "Si" | "No";
  email: string;
  firstname: string;
  fullname: string;
  gender: "masculino" | "femenino";
  id: string;
  insuranceCompany: string;
  lastname: string;
  notes: string;
  phone: string;
  secondLastname: string;
  secondName: string;
  conversations?: VirtualizedConversationType;
  lastVisitedTimestamp?: string;
  firstTimeVisit: boolean;
  pdfData?: {
    language: "es" | "en";
    agent: "female" | "male";
    date: string;
  };
}

export type pdfDataTypes = {
  language: "Español" | "Ingles";
  agent: "William Gola" | "Lorena Zozaya";
  date: string;
};

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

type document = {
  url: string;
  type: string;
  name: string;
};

export interface Message {
  userId?: string | null | undefined;
  body: string;
  dateCreated: string;
  from: string;
  to: string;
  direction: "inbound" | "outbound-api";
  sid: string;
  delivery?: QueuePayload;
  mediaUrl?: string[];
  documentUrl?: (document | undefined)[] | [];
}

export interface Day {
  type: "day";
  id: string;
  dateCreated: string;
}

export interface TwilioAPIMessage {
  mediaUrl?: string[];
  documentUrl?: (document | undefined)[] | [];
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
  "application/vnd.ms-excel": [".xls", ".xlsx"];
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
    ".doc",
  ];
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
    ".xls",
  ];
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    ".pptx",
    ".ppt",
  ];
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

export type PdfData = {
  language: "en" | "es";
  agent: "male" | "female";
  date: string;
};

export interface SignaturePayload {
  expirationDate: string;
  signerFirstName: string;
  signerLastName: string;
  agentFirstName: string;
  agentLastName: string;
  agentEmail: string;
  agentInsuranceNumber: string;
  agentPhoneNumber: string;
  signerPhoneNumber: string;
  signerEmail: string;
  signatureDate: string;
}

// this means that the keys will change depending on the pdf template, wither english or spanish
export type languageDependentPayload = {
  [key: string]:
    | string
    | { firstName: string; lastName: string }
    | { num: string; region: string; baseRegion: string };
};

export type PDFTemplate = {
  isDraft: boolean;
  isTest: boolean;
  files: [
    {
      id: string;
      castEid: string;
    },
  ];
  data: {
    payloads: {
      [key: string]: {
        title: string;
        fontSize: number;
        textColor: string;
        data: languageDependentPayload;
      };
    };
  };
  signaturePageOptions?: {
    // String overrides for the UI
    [key: string]: any;
  };
  signers: [
    {
      id: string;
      name: string;
      email: string;
      signerType: string;
      fields: [
        {
          fileId: string;
          fieldId: string;
        },
      ];
    },
  ];
};

export type RequestData = {
  phone: string;
  email: string;
  firstname: string;
  lastname: string;
  pdfData: PdfData;
};

export type iframeEvent = {
  action: string;
  documentGroupEid: string;
  documentGroupStatus: string;
  etchPackedEid: string;
  s: string;
  signerEid: string;
  signerStatus: string;
  token: string;
};

export type InternationalizationPDFTemplate = {
  title: string;
  description: string;
  signatureLabel: string;
  initialLabel: string;
  acceptTitle: string;
  acceptDescription: string;
  acceptButtonText: string;
  drawSignatureTitle: string;
  drawSignatureDescription: string;
  drawSignatureButtonText: string;
  drawInitialsTitle: string;
  drawInitialsDescription: string;
  drawInitialsButtonText: string;
  signTitle: string;
  signDescription: string;
  signDescriptionCompleted: string;
  signConsentText: string;
  signButtonText: string;
  completedButtonText: string;
  error: string;
  style: {
    primaryColor: string;
    successColor: string;
    infoColor: string;
    linkColor: string;
  };
};
