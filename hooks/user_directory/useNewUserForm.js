import { useCallback, useState } from "react";

import { createFirebaseUser } from "@/lib/user_directory/createFirebaseUser";
import { failureNotification } from "@/components/notifications/failureNotification";
import { normalizeFirebaseUser } from "@/lib/user_directory/normalizeFirebaseUser";
import { successNotification } from "@/components/notifications/successNotification";
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
        successNotification(
          `El usuario ${normalizedUser?.fullname} ha sido creado exitosamente.`
        );
        return normalizedUser;
      })
      .catch((error) => {
        setIsSubmitting(false);
        setOpenCreateUserModal(false);
        reset();
        // notify of error creating a user!
        failureNotification(
          `Ha ocurrido un error al crear al usuario ${normalizedUser?.fullname}. Intentelo nuevamente. Si el error persiste, contacte al soporte.`
        );

        throw new Error(`Error creating user`, error);
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
