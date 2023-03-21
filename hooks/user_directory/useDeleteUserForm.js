import { useCallback, useState } from "react";

import { deleteUser } from "@/lib/user_directory/deleteUser";
import { failureNotification } from "@/components/notifications/failureNotification";
import { successNotification } from "@/components/notifications/successNotification";

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
          successNotification(
            `El usuario ${userToDelete?.fullname} ha sido eliminado exitosamente.`
          );

          handleDeleteCloseModal();
          setIsSubmittingUserDelete(false);
          return id;
        })
        .catch((error) => {
          setIsSubmittingUserDelete(false);

          // notify of not being able to delete the user
          failureNotification(
            `Ha ocurrido un error trantando de eliminar al usuario ${userToDelete?.fullname}`
          );

          throw new Error(`Error deleting user`, error);
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
