import { createUser } from "@/lib/createUser";
import { fetcherPost } from "@/utils/fetcherPost";
import { normalizeFirebaseUser } from "@/lib/normalizeFirebaseUser";
import { novuSubscriberId } from "@/utils/novuSubscriberId";
import { useForm } from "react-hook-form";
import { useState } from "react";
//
export const useNewUserForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // handle form submit
  const onSubmit = (formInputs) => {
    const normalizedUser = normalizeFirebaseUser(formInputs);
    setIsSubmitting(true);

    createUser(normalizedUser)
      .then(() => {
        setIsSubmitting(false);

        // notify of user created ok!
        fetcherPost(
          `/api/notifications/notification`,
          `El usuario ${normalizedUser?.fullname} ha sido creado exitosamente.`,
          novuSubscriberId,
          `success-notification`
        )
          .then((data) => {
            reset();
            return data;
          })
          .catch((fetcherPostError) => {
            return fetcherPostError;
          });
      })
      .catch((error) => {
        setIsSubmitting(false);

        // notify of error creating a user!
        fetcherPost(
          `/api/notifications/notification`,
          `Ha ocurrido un error al crear al usuario ${normalizedUser?.fullname}. Intentelo nuevamente. Si el error persiste, contacte al soporte.`,
          novuSubscriberId,
          `error-notification`
        )
          .then((fetcherPostData) => {
            reset();
            return fetcherPostData;
          })
          .catch((fetcherPostError) => {
            return fetcherPostError;
          });
        return error;
      });
  };

  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};
