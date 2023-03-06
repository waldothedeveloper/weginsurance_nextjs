import { createUser } from "@/lib/createUser";
import { normalizeFirebaseUser } from "@/lib/normalizeFirebaseUser";
import { useForm } from "react-hook-form";
//
export const useNewUserForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle form submit
  const onSubmit = (data) => {
    const normalizedUser = normalizeFirebaseUser(data);

    createUser(normalizedUser)
      .then(() => reset())
      .catch((err) => {
        console.log(`Error trying to CREATE the new user`, err);
        return err;
      });
  };

  return { register, handleSubmit, errors, onSubmit };
};
