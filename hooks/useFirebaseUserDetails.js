import { useCallback, useEffect, useState } from "react";

import { deleteUser } from "@/lib/deleteUser";
import { fetcherPost } from "@/utils/fetcherPost";
import { getFirebaseUser } from "@/lib/getFirebaseUser";
import { normalizeFirebaseUser } from "@/lib/normalizeFirebaseUser";
import { novuSubscriberId } from "@/utils/novuSubscriberId";
import { updateFirebaseUser } from "@/lib/updateFirebaseUser";
import { useForm } from "react-hook-form";

//
export const useFirebaseUserDetails = (navigation) => {
  const [userDetails, setUserDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenModal = useCallback(() => setOpenModal(true), []);
  const handleCloseModal = useCallback(() => setOpenModal(false), []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUserDetails = useCallback((user) => {
    setUserDetails(user);
  }, []);

  useEffect(() => {
    // If we are in the Messages section, there's no need to keep the current selected User
    const isDirectory =
      navigation.filter((elem) => elem.current)[0]?.href === `messages`;
    if (isDirectory) setUserDetails(null);
    // equally, if this get's unmounted, clean up the selected user
    return () => setUserDetails(null);
  }, [navigation]);

  useEffect(() => {
    if (userDetails) {
      reset({
        firstname: userDetails?.firstname,
        second_name: userDetails?.second_name,
        lastname: userDetails?.lastname,
        second_lastname: userDetails?.second_lastname,
        phone: userDetails?.phone,
        email: userDetails?.email,
        insurance_company: userDetails?.insurance_company,
        gender: userDetails?.gender,
        active_user: userDetails?.active_user === true ? "Si" : "No",
        notes: userDetails?.notes,
      });
    }
  }, [reset, userDetails]);

  const handleDeleteUser = () => {
    const { id } = userDetails;
    if (id) {
      setIsSubmitting(true);
      deleteUser(id)
        .then(() => {
          // notify of user deleted ok!
          fetcherPost(
            `/api/notifications/notification`,
            `El usuario ${userDetails?.fullname} ha sido eliminado exitosamente.`,
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

          //
          setOpenModal(false);
          setUserDetails(null);
          setIsSubmitting(false);
        })
        .catch((err) => {
          setIsSubmitting(false);
          // console.log(`Could not delete user`, err)
          // notify of not being able to delete the user
          fetcherPost(
            `/api/notifications/notification`,
            `Ha ocurrido un error trantando de eliminar al usuario ${userDetails?.fullname}`,
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
    } else {
      setIsSubmitting(false);
      throw new Error(`The id destructuring is undefined`, id);
    }
  };

  const handleUpdateUser = () => setUpdateUser(!updateUser);

  const submitUpdateUser = (user) => {
    const { id } = userDetails;

    const updatedUser = normalizeFirebaseUser(user);

    if (id && updatedUser) {
      setIsSubmitting(true);
      updateFirebaseUser(updatedUser, id)
        .then(() => {
          setIsSubmitting(false);

          getFirebaseUser(id)
            .then((u) => {
              if (u) {
                setUserDetails(u);
                // notify of user successfuly updated!
                fetcherPost(
                  `/api/notifications/notification`,
                  `El usuario ${userDetails?.fullname} ha sido actualizado correctamente.`,
                  novuSubscriberId,
                  `success-notification`
                )
                  .then((data) => {
                    // console.log("Notification user updated ok! : ", data);
                    reset();
                    return data;
                  })
                  .catch((err) => {
                    // console.log(`err`, err);
                    return err;
                  });
              }
              setUpdateUser(false);

              return true;
            })
            .catch((err) => {
              setIsSubmitting(false);
              return err;
              // console.log("Error trying to get a single user: ", err);
            });
          return true;
        })
        .catch((err) => {
          setIsSubmitting(false);
          // console.log(`Could not update the user`, err);
          return err;
        });
    }
  };

  return {
    submitUpdateUser,
    register,
    errors,
    handleSubmit,
    updateUser,
    userDetails,
    handleUserDetails,
    handleUpdateUser,
    handleDeleteUser,
    openModal,
    handleOpenModal,
    handleCloseModal,
    isSubmitting,
  };
};
