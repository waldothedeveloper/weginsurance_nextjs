import { useCallback, useEffect, useState } from "react";

import { failureNotification } from "@/components/notifications/failureNotification";
import { normalizeFirebaseUser } from "@/lib/user_directory/normalizeFirebaseUser";
import { successNotification } from "@/components/notifications/successNotification";
import { updateFirebaseUser } from "@/lib/user_directory/updateFirebaseUser";
import { useForm } from "react-hook-form";

//
export const useUpdateUserForm = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);

  //
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedUser) {
      reset({
        firstname: selectedUser?.firstname,
        second_name: selectedUser?.second_name,
        lastname: selectedUser?.lastname,
        second_lastname: selectedUser?.second_lastname,
        phone: selectedUser?.phone,
        email: selectedUser?.email,
        insurance_company: selectedUser?.insurance_company,
        gender: selectedUser?.gender,
        active_user: selectedUser?.active_user === true ? "Si" : "No",
        notes: selectedUser?.notes,
      });
    }
  }, [reset, selectedUser]);

  // open modal for updating users
  const handleUpdateModal = useCallback((currUser) => {
    setOpenUpdateUserModal(true);
    setSelectedUser(currUser);
  }, []);
  //
  const submitUpdateUser = (user) => {
    //TODO:  I think you can take the id from the user prop being passed to this function...
    const { id } = selectedUser;

    const updatedUser = normalizeFirebaseUser(user);

    if (id && updatedUser) {
      setIsSubmitting(true);
      updateFirebaseUser(updatedUser, id)
        .then(() => {
          setOpenUpdateUserModal(false);
          setIsSubmitting(false);

          // notify of user successfuly updated!
          successNotification(
            `El usuario ${updatedUser?.fullname} ha sido actualizado correctamente.`
          );

          return updatedUser;
        })
        .catch((err) => {
          setIsSubmitting(false);
          // notify of not being able to update the user
          failureNotification(
            `Ha ocurrido un error trantando de actualizar al usuario ${updatedUser?.fullname}`
          );

          throw new Error(`Error updating user`, err);
        });
    }
  };

  return {
    registerUpdateUserForm: register,
    handleUpdateUserForm: handleSubmit,
    errorsUpdateUserForm: errors,
    submitUpdateUser,
    handleUpdateModal,
    isSubmittingUpdateUserForm: isSubmitting,
    openUpdateUserModal,
    setOpenUpdateUserModal,
  };
};
