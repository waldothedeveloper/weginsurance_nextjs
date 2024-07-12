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

  type Directory = Record<string, DirectoryEntry[]>;
}
