import { principalClientSchema } from "../principalClientSchema";
import { significantPartnerSchema } from "../significantPartnerSchema";

export const provideValidationSchema = (
  currentStep: CreateNewUserPolicyMultiStepForm | undefined
) => {
  return currentStep?.id === 0
    ? principalClientSchema
    : significantPartnerSchema;
};
