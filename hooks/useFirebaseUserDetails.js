import { useCallback, useEffect, useState } from "react";

import { deleteUser } from "@/lib/deleteUser";
import { fetcherPost } from "@/utils/fetcherPost";
import { getFirebaseUser } from "@/lib/getFirebaseUser";
import { normalizeFirebaseUser } from "@/lib/normalizeFirebaseUser";
import { novuSubscriberId } from "@/utils/novuSubscriberId";
import { updateFirebaseUser } from "@/lib/updateFirebaseUser";
import { useForm } from "react-hook-form";

//
export const useFirebaseUserDetails = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openUpdateUserModal, setOpenUpdateUserModal] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // open modal for deleting users
  const handleDeleteModal = useCallback((currUser) => {
    setSelectedUser(currUser);
    setOpenDeleteUserModal(true);
  }, []);

  // open modal for updating users
  const handleUpdateModal = useCallback((currUser) => {
    setOpenUpdateUserModal(true);
    setSelectedUser(currUser);
  }, []);

  // when you are closing the modal make sure that updating or deleting booleans will be false
  const handleCloseModal = useCallback(() => {
    setOpenDeleteUserModal(false);
    setOpenUpdateUserModal(false);
    setSelectedUser(null);
  }, []);

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

  const handleDeleteUser = () => {
    const { id } = selectedUser;
    if (id) {
      setIsSubmitting(true);
      deleteUser(id)
        .then(() => {
          // notify of user deleted ok!
          fetcherPost(
            `/api/notifications/notification`,
            `El usuario ${selectedUser?.fullname} ha sido eliminado exitosamente.`,
            novuSubscriberId,
            `success-notification`
          )
            .then((data) => {
              // console.log("Notification user deleted sent! : ", data);
              reset();
              return data;
            })
            .catch((err) => {
              // console.log(`err`, err);
              return err;
            });

          handleCloseModal();
          setIsSubmitting(false);
        })
        .catch((error) => {
          setIsSubmitting(false);

          // notify of not being able to delete the user
          fetcherPost(
            `/api/notifications/notification`,
            `Ha ocurrido un error trantando de eliminar al usuario ${selectedUser?.fullname}`,
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
          return error;
        });
    } else {
      setIsSubmitting(false);
      throw new Error(`The id destructuring is undefined`, id);
    }
  };

  const submitUpdateUser = (user) => {
    const { id } = selectedUser;

    const updatedUser = normalizeFirebaseUser(user);

    if (id && updatedUser) {
      setIsSubmitting(true);
      updateFirebaseUser(updatedUser, id)
        .then(() => {
          handleCloseModal();
          setIsSubmitting(false);

          // notify of user successfuly updated!
          fetcherPost(
            `/api/notifications/notification`,
            `El usuario ha sido actualizado correctamente.`,
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
            `Ha ocurrido un error trantando de actualizar al usuario ${selectedUser?.fullname}`,
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
    openUpdateUserModal,
    submitUpdateUser,
    register,
    errors,
    handleSubmit,
    selectedUser,
    handleUpdateModal,
    handleDeleteUser,
    openDeleteUserModal,
    handleDeleteModal,
    handleCloseModal,
    isSubmitting,
  };
};
