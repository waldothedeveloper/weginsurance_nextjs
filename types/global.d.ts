export {};

declare global {
  // DirectoryEntry is simply each user  in the user's directory.
  interface DirectoryEntry {
    id: string;
    ssn?: string;
    birthdate?: string;
    avatar?: string;
    activeUser: boolean;
    email: string;
    firstTimeVisit: boolean;
    firstname: string;
    fullname: string;
    gender: string;
    lastname: string;
    notes: string;
    has_policy: boolean;
    policy_start_date: string;
    policy_number: string;
    policy_amount: string;
    insuranceCompany: string;
    policy_plan: string;
    pdfData?: {
      agent: string;
      expirationDate: string;
      language: string;
      signerBirthdate: string;
      signerEid: string;
    };
    legal_status?: string;
    legal_status_notes?: string;
    phone: string;
    secondLastname: string;
    secondName: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipcode: string;
    };
    bank_information?: {
      bank_name: string;
      bank_account_type: string;
      routing_number: string;
      account_number: string;
    };
    credit_debit_card_information?: {
      card_number: string;
      card_holder_fullname: string;
      card_expiration_date: string;
      card_cvv: string;
      card_type: string;
      card_zipcode?: string;
    };
    employment_type: string;
    company_name: string;
    annual_income: string;
  }

  interface UserPolicyInputs {
    accepts_insurance: "Si" | "No";
    firstname: string;
    second_name: string | undefined;
    lastname: string;
    second_lastname: string | undefined;
    civil_status:
      | "Soltero"
      | "Casado"
      | "Divorciado"
      | "Viudo(a)"
      | "Separado(a)";
    genre: "Masculino" | "Femenino";
    gender?: "Masculino" | "Femenino";
    email: string | undefined;
    ssn: string | undefined;
    birthdate: string | undefined;
    phone: string | undefined;
    age: number | undefined;
    country: string | undefined;
    street_address: string | undefined;
    city: string | undefined;
    state: string | undefined;
    postal_code: string | undefined;
    legal_status?:
      | "Residente"
      | "Ciudadano"
      | "Permiso de Trabajo"
      | "Huellas"
      | "En Tramites"
      | "Sin Estatus";
    legal_status_notes: string | undefined;
    bank_account: string | undefined;
    routing_number: string | undefined;
    bank_account_number: string | undefined;
    bank_account_number_confirmation: string | undefined;
    payment_method?: "Credito" | "Debito";
    card_number: string | undefined;
    card_holder_fullname: string | undefined;
    card_expiration_date: string | undefined;
    card_cvv: string | undefined;
    work_type: "W2" | "1099" | "SSA-1099" | "1099-R";
    company_name: string | undefined;
    wages: string | undefined;
    prima: string | undefined;
    insurance_policy_number: string | undefined;
    policy_start_date: string | undefined;
    notes: string | undefined;
    insurance_plan_type: "Bronze" | "Silver" | "Gold" | "Platinum";
    insurance_company: string | undefined;
  }
  // this type would hold the directory of users
  type Directory = Record<string, DirectoryEntry[]>;

  interface CreateNewUserPolicyMultiStepForm {
    id: number;
    tag: string;
    status: string;
    icon?: React.ReactNode;
    title: string;
    description: string;
    data: Partial<UserPolicyInputs>;
  }

  interface CreateNewUserPolicyContextType {
    steps: CreateNewUserPolicyMultiStepForm[];
    openMoreDependantsDialog?: boolean;
    setOpenMoreDependantsDialog: React.Dispatch<React.SetStateAction<boolean>>;
    dispatchSteps: React.Dispatch<{
      type: string;
      data: Partial<UserPolicyInputs>;
      stepNumber: number;
    }>;
    currStep;
    formReadyToSubmit: boolean;
    submittingForm: boolean;
    setSubmittingForm: React.Dispatch<React.SetStateAction<boolean>>;
    success: boolean;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    isPending: boolean;
    submissionError: boolean;
    submissionErrorMessage: string;
    setSubmissionError: React.Dispatch<React.SetStateAction<boolean>>;
  }
}

// we're gonna start auditing who's saving the data and when
type ClerkUser = {
  clerkID: string;
  firstName: string;
  lastName: string;
};

// clients
type User = {
  personal_info: {
    firstname: string;
    secondName: string;
    lastname: string;
    secondLastname: string;
    email: string;
    phone: string;
    birthdate: string;
    age: number;
    notes: string;
    gender: "Masculino" | "Femenino";
    avatar: string; // URL to the avatar image
  };
  legal_info: {
    legalStatus:
      | "Residente"
      | "Ciudadano"
      | "Permiso de Trabajo"
      | "Huellas"
      | "En Tramites"
      | "Sin Estatus"
      | ""
      | undefined;
    legalStatusNotes: string;
  };
  address: {
    streetAddress: string;
    city: string;
    state: string;
    postalCode: string;
  };

  employment_info: {
    employerName: string;
    //TODO:  this should be stored as cents
    income: string;
    employment_type: "W2" | "1099" | "SSA-1099" | "1099-R" | "";
  };
  insurance_info: {
    policyNumber: string;
    policyStartDate: string;
    //TODO:  we should later on have a type for insurance companies or something
    insuranceCompany: string;
    planType: "Bronze" | "Silver" | "Gold" | "Platinum" | "";
    // this should be stored as cents
    policyAmount: string;
    accepts_insurance: "Si" | "No";
  };
};

// this will be the new schema to save users and for anything in the application that refers to a user
export type UserSchema = {
  // THIS WILL BE THE SMS CONVERSATIONS EACH USER HAS WITH THE INSURANCE COMPANY
  conversations?: string[];
  activeRecord: boolean;
  created: Date;
  updated: Date | null;
  createdBy: ClerkUser | null;
  updatedBy: ClerkUser | null;
  // how many times this record has been updated
  updates: number;
  user: User;
  spouse: User | null;
  dependants: User[] | null;
};

export type Message = {
  body: string;
  from: string;
  to: string;
  direction: "inbound" | "outbound-api" | "outbound-reply";
  numMedia: number;
  uri: string;
  status: "queued" | "sending" | "sent" | "failed" | "delivered";
  sid: string;
  dateCreated: string;
  dateSent: string | null;
};
