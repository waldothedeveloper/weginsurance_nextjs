import { z } from "zod";

export const registrationSchema = z.object({
  accepts_insurance: z.enum(["Si", "No"], {
    required_error: "La cobertura medica es mandatoria.",
  }),
  firstname: z.string().trim().min(1, {
    message: "Primer nombre es mandatorio.",
  }),
  second_name: z
    .union([z.string().length(0), z.string().trim().max(80)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  lastname: z.string().trim().min(1, {
    message: "Apellidos es mandatorio.",
  }),
  second_lastname: z
    .union([z.string().length(0), z.string().trim().max(80)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  civil_status: z
    .enum(["Soltero", "Casado", "Divorciado", "Viudo(a)", "Separado(a)", ""])
    .optional(),
  genre: z.enum(["Masculino", "Femenino"], {
    required_error: "Genero es mandatorio.",
  }),
  email: z
    .union([z.string().email(), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  // make your mind here are you gonna use a number, convert to a number or keep it as a string
  ssn: z
    .union([z.string().trim().min(9), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  birthdate: z
    .union([z.date(), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  phone: z.string().trim().min(10, {
    message: "El telefono es mandatorio y debe contener 10 digitos.",
  }),
  age: z
    .number()
    .min(0, {
      message: "La edad no puede ser negativa.",
    })
    .optional(),
  country: z
    .union([z.string().trim(), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  street_address: z
    .union([z.string().trim(), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  city: z
    .union([z.string().trim(), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  state: z
    .union([z.string().trim(), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  postal_code: z.string().trim().optional(),
  legal_status: z
    .enum([
      "Residente",
      "Ciudadano",
      "Permiso de Trabajo",
      "Huellas",
      "En Tramites",
      "Sin Estatus",
      "",
    ])
    .optional(),
  legal_status_notes: z.string().trim().optional(),
  bank_account: z.string().trim().optional(),
  routing_number: z.number().optional(),
  bank_account_number: z.number().optional(),
  bank_account_number_confirmation: z.number().optional(),
  payment_method: z.enum(["Credito", "Debito", ""]).optional(),
  card_number: z
    .union([
      z.number().min(12),
      z.number().transform((num) => (num === 0 ? 0 : false)),
    ])
    .optional(),
  card_holder_fullname: z.string().trim().optional(),
  card_expiration_date: z.string().optional(),
  card_cvv: z
    .union([
      z.number().min(3),
      z.number().transform((num) => (num === 0 ? 0 : false)),
    ])
    .optional(),
  work_type: z.enum(["W2", "1099", ""]).optional(),
  company_name: z.string().trim().optional(),
  wages: z.string().trim().optional(),
  prima: z.number().optional(),
  insurance_policy_number: z.number().optional(),
  policy_start_date: z
    .union([z.date(), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  notes: z.string().trim().optional(),
  insurance_plan_type: z
    .enum(["Bronze", "Silver", "Gold", "Platinum", ""])
    .optional(),
});
