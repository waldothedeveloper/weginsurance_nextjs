// import { getFirebaseUser } from "@/lib/getFirebaseUser";
import { useCallback, useEffect, useState } from "react";

import { fetcherPost } from "@/utils/fetcherPost";
import { normalizeFirebaseUser } from "@/lib/normalizeFirebaseUser";
import { novuSubscriberId } from "@/utils/novuSubscriberId";
import { updateFirebaseUser } from "@/lib/updateFirebaseUser";
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
          fetcherPost(
            `/api/notifications/notification`,
            `El usuario ${updatedUser?.fullname} ha sido actualizado correctamente.`,
            novuSubscriberId,
            `success-notification`
          )
            .then((data) => {
              reset();
              return data;
            })
            .catch((err) => {
              return err;
            });
          return true;
        })
        .catch((err) => {
          setIsSubmitting(false);
          // notify of not being able to update the user
          fetcherPost(
            `/api/notifications/notification`,
            `Ha ocurrido un error trantando de actualizar al usuario ${updatedUser?.fullname}`,
            novuSubscriberId,
            `error-notification`
          )
            .then((data) => {
              reset();
              return data;
            })
            .catch((fetcherPostError) => {
              return fetcherPostError;
            });
          return err;
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