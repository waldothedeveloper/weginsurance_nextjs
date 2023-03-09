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
  const onSubmit = (data) => {
    const normalizedUser = normalizeFirebaseUser(data);
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
          .catch((err) => {
            // console.log(`err`, err);
            return err;
          });
      })
      .catch((err) => {
        setIsSubmitting(false);

        // notify of error creating a user!
        fetcherPost(
          `/api/notifications/notification`,
          `Ha ocurrido un error al crear al usuario ${normalizedUser?.fullname}. Intentelo nuevamente. Si el error persiste, contacte al soporte.`,
          novuSubscriberId,
          `error-notification`
        )
          .then((data) => {
            reset();
            return data;
          })
          .catch((err) => {
            // console.log(`err`, err);
            return err;
          });
        return err;
      });
  };

  return { register, handleSubmit, errors, onSubmit, isSubmitting };
};
