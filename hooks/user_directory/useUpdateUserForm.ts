import { useCallback, useEffect, useState } from "react";

import { RealUser } from "@/interfaces/index";
import { failureNotification } from "@/components/notifications/failureNotification";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { normalizeFirebaseUser } from "@/lib/user_directory/normalizeFirebaseUser";
import { successNotification } from "@/components/notifications/successNotification";
import { updateFirebaseUser } from "@/lib/user_directory/updateFirebaseUser";
import { useForm } from "react-hook-form";

//
export const useUpdateUserForm = () => {
  const [selectedUser, setSelectedUser] = useState<RealUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);

  //
  const {
    setValue,
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
        phone: formatPhoneNumberToNationalUSAformat(selectedUser?.phone),
        email: selectedUser?.email,
        insurance_company: selectedUser?.insurance_company,
        gender: selectedUser?.gender,
        active_user: selectedUser?.active_user === true ? "Si" : "No",
        notes: selectedUser?.notes,
      });
    }

    return () => reset();
  }, [reset, selectedUser]);

  // open modal for updating users
  const handleUpdateModal = useCallback((currUser: RealUser) => {
    setOpenUpdateUserModal(true);
    setSelectedUser(currUser);
  }, []);

  const handleCloseUpdateModal = () => {
    setSelectedUser(null);
    setOpenUpdateUserModal(false);
  };
  //
  const submitUpdateUser = async (user: RealUser) => {
    //TODO:  I think you can take the id from the user prop being passed to this function...
    const { id } = selectedUser;

    const updatedUser = normalizeFirebaseUser(user);

    if (id && updatedUser) {
      setIsSubmitting(true);
      await updateFirebaseUser(updatedUser, id)
        .then(() => {
          setOpenUpdateUserModal(false);
          setIsSubmitting(false);
          successNotification(
            `El usuario ${updatedUser?.fullname} ha sido actualizado correctamente.`
          );

          return updatedUser;
        })
        .catch((err) => {
          setIsSubmitting(false);
          failureNotification(
            `Ha ocurrido un error trantando de actualizar al usuario ${updatedUser?.fullname}`
          );

          return err;
        });
    }
  };

  return {
    setValueUpdateUserForm: setValue,
    registerUpdateUserForm: register,
    handleUpdateUserForm: handleSubmit,
    errorsUpdateUserForm: errors,
    submitUpdateUser,
    handleUpdateModal,
    isSubmittingUpdateUserForm: isSubmitting,
    openUpdateUserModal,
    handleCloseUpdateModal,
  };
};