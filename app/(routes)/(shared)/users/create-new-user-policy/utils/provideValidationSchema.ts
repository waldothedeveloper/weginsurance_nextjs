import { principalClientSchema } from "../schemas/principalClientSchema";
import { significantPartnerSchema } from "../schemas/significantPartnerSchema";

export const provideValidationSchema = (
  currentStep: CreateNewUserPolicyMultiStepForm | undefined
) => {
  return currentStep?.id === 0
    ? principalClientSchema
    : significantPartnerSchema;
};
