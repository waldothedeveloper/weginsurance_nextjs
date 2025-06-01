import { CreateNewUserPolicyProvider } from "./hooks/useCreateUserPolicy";
import { FormWrapper } from "./_components/form-wrapper";

//
export default function CreateNewUserPolicy() {
  return (
    <CreateNewUserPolicyProvider>
      <FormWrapper />
    </CreateNewUserPolicyProvider>
  );
}
