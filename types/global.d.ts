export {};

declare global {
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
      city: string;
      state: string;
      street: string;
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
    accepts_insurance: "Si" | "No" | "Selecione una opcion";
    firstname: string;
    second_name: string;
    lastname: string;
    second_lastname: string;
    civil_status:
      | "Soltero"
      | "Casado"
      | "Divorciado"
      | "Viudo(a)"
      | "Separado(a)";
    genre: "Masculino" | "Femenino";
    email: string;
    ssn: string;
    birthdate: string;
    phone: string;
    age: number;
    country: string;
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    legal_status?:
      | "Residente"
      | "Ciudadano"
      | "Permiso de Trabajo"
      | "Huellas"
      | "En Tramites"
      | "Sin Estatus";
    legal_status_notes: string;
    bank_account: string;
    routing_number: string;
    bank_account_number: string;
    bank_account_number_confirmation: string;
    payment_method?: "Credito" | "Debito";
    card_number: string;
    card_holder_fullname: string;
    card_expiration_date: string;
    card_cvv: string;
    work_type: "W2" | "1099";
    company_name: string;
    wages: string;
    prima: string;
    insurance_policy_number: string;
    policy_start_date: string;
    notes: string;
    insurance_plan_type: "Bronze" | "Silver" | "Gold" | "Platinum";
    insurance_company: string;
  }

  type Directory = Record<string, DirectoryEntry[]>;

  interface CreateNewUserPolicyMultiStepForm {
    id: number;
    tag: string;
    status: string;
    icon: React.ReactNode;
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

// TODO: handleSubmit, register, control, validationSchema and currStep are right now as any, they should be typed
