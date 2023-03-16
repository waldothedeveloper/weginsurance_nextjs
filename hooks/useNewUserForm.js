import { useCallback, useState } from "react";

import { createFirebaseUser } from "@/lib/createFirebaseUser";
import { fetcherPost } from "@/utils/fetcherPost";
import { normalizeFirebaseUser } from "@/lib/normalizeFirebaseUser";
import { novuSubscriberId } from "@/utils/novuSubscriberId";
import { useForm } from "react-hook-form";

//
export const useNewUserForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateUserModal = useCallback(() => {
    setOpenCreateUserModal(true);
  }, []);

  const handleCloseCreateUserModal = useCallback(() => {
    setOpenCreateUserModal(false);
  }, []);

  // handle form submit
  const onSubmit = (formInputs) => {
    const normalizedUser = normalizeFirebaseUser(formInputs);
    setIsSubmitting(true);

    createFirebaseUser(normalizedUser)
      .then(() => {
        setIsSubmitting(false);
        setOpenCreateUserModal(false);
        reset();
        // notify of user created ok!
        fetcherPost(
          `/api/notifications/notification`,
          `El usuario ${normalizedUser?.fullname} ha sido creado exitosamente.`,
          novuSubscriberId,
          `success-notification`
        ).catch((fetcherPostError) => {
          return fetcherPostError;
        });
      })
      .catch((error) => {
        setIsSubmitting(false);
        setOpenCreateUserModal(false);
        reset();
        // notify of error creating a user!
        fetcherPost(
          `/api/notifications/notification`,
          `Ha ocurrido un error al crear al usuario ${normalizedUser?.fullname}. Intentelo nuevamente. Si el error persiste, contacte al soporte.`,
          novuSubscriberId,
          `error-notification`
        ).catch((fetcherPostError) => {
          return fetcherPostError;
        });
        return error;
      });
  };

  return {
    registerNewUserForm: register,
    handleSubmitNewUserForm: handleSubmit,
    errorsNewUserForm: errors,
    onSubmitNewUserForm: onSubmit,
    isSubmittingNewUserForm: isSubmitting,
    openCreateUserModal,
    handleCreateUserModal,
    handleCloseCreateUserModal,
  };
};
