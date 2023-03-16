import { useCallback, useState } from "react";

import { deleteUser } from "@/lib/deleteUser";
import { fetcherPost } from "@/utils/fetcherPost";
import { novuSubscriberId } from "@/utils/novuSubscriberId";

//
export const useDeleteUserForm = () => {
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isSubmittingUserDelete, setIsSubmittingUserDelete] = useState(false);

  // open modal for deleting users
  const handleDeleteModal = useCallback((currUser) => {
    setUserToDelete(currUser);
    setOpenDeleteUserModal(true);
  }, []);

  const handleDeleteCloseModal = useCallback(() => {
    setOpenDeleteUserModal(false);
  }, []);

  const handleDeleteUser = () => {
    const { id } = userToDelete;
    if (id) {
      setIsSubmittingUserDelete(true);
      deleteUser(id)
        .then(() => {
          // notify of user deleted ok!
          fetcherPost(
            `/api/notifications/notification`,
            `El usuario ${userToDelete?.fullname} ha sido eliminado exitosamente.`,
            novuSubscriberId,
            `success-notification`
          ).catch((err) => {
            return err;
          });

          handleDeleteCloseModal();
          setIsSubmittingUserDelete(false);
        })
        .catch((error) => {
          setIsSubmittingUserDelete(false);

          // notify of not being able to delete the user
          fetcherPost(
            `/api/notifications/notification`,
            `Ha ocurrido un error trantando de eliminar al usuario ${userToDelete?.fullname}`,
            novuSubscriberId,
            `error-notification`
          ).catch((fetcherPostError) => {
            return fetcherPostError;
          });
          return error;
        });
    } else {
      setIsSubmittingUserDelete(false);
      throw new Error(`The id destructuring is undefined`, id);
    }
  };

  return {
    openDeleteUserModal,
    userToDelete,
    handleDeleteUser,
    handleDeleteModal,
    handleDeleteCloseModal,
    isSubmittingUserDelete,
  };
};
