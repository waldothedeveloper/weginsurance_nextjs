export type FakeUser = {
  id: string;
  gender: string;
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
};

export type Messages = {
  accoundSid: string;
  apiVersion: string;
  body: string;
  dateCreated: string;
  dateSent: string;
  dateUpdated: string;
  direction: string;
  errorCode: string;
  errorMessage: string;
  from: string;
  messagingServiceSid: string;
  numMedia: string;
  numSegments: string;
  price: string;
  priceUnit: string;
  sid: string;
  status: string;
  subresourceUris: {
    media: string;
    feedback: string;
  };
  to: string;
  uri: string;
};

export type ConversationProps = {
  messages: {
    [key: string]: Messages[];
  };
};

export type RealUser = {
  active_user: boolean;
  email: string;
  firstname: string;
  fullname: string;
  gender: string;
  id: string;
  insurance_company: string;
  lastname: string;
  notes: string;
  phone: string;
  second_lastname: string;
  second_name: string;
};

export type State = {
  statusColor: string;
  bgColor: string;
  textColor: string;
};

export type SingleMessageState = {
  [key: string]: State;
};
