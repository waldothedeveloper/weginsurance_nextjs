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
    .max(121, {
      message: "La edad no puede ser mayor a 120 años.",
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
  routing_number: z
    .union([
      z
        .string()
        .trim()
        .length(9)
        .regex(
          /^\d+$/,
          "El número de ruta del banco debe contener solo dígitos"
        ),
      z.string().trim().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  bank_account_number: z
    .union([
      z
        .string()
        .trim()
        .regex(/^\d+$/, "El número de cuenta debe contener solo dígitos"),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  bank_account_number_confirmation: z
    .union([
      z
        .string()
        .trim()
        .regex(/^\d+$/, "El número de cuenta debe contener solo dígitos"),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  payment_method: z.enum(["Credito", "Debito", ""]).optional(),
  card_number: z
    .union([
      z
        .string()
        .trim()
        .regex(/^\d{13,19}$/, "Número de tarjeta inválido"),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  card_holder_fullname: z.string().trim().optional(),
  card_expiration_date: z
    .union([
      z
        .string()
        .trim()
        .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Formato debe ser MM/YY"),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  card_cvv: z
    .union([
      z
        .string()
        .trim()
        .regex(/^\d{3,4}$/, "CVV debe tener 3 o 4 dígitos"),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  work_type: z.enum(["W2", "1099", ""]).optional(),
  company_name: z.string().trim().optional(),
  wages: z.string().trim().optional(),
  prima: z
    .union([z.string().trim().length(10), z.string().length(0)])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  insurance_policy_number: z
    .union([
      z
        .string()
        .trim()
        .regex(/^\d+$/, "El número de póliza debe contener solo dígitos"),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  policy_start_date: z
    .union([
      z.date({
        required_error: "La fecha de inicio es requerida",
        invalid_type_error: "Formato de fecha inválido",
      }),
      z.string().length(0),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  notes: z.string().trim().optional(),
  insurance_plan_type: z
    .enum(["Bronze", "Silver", "Gold", "Platinum", ""])
    .optional(),
});
