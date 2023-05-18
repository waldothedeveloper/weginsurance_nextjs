import { useCallback, useState } from "react";

import { RealUser } from "@/interfaces/index";
import { Table } from "@tanstack/react-table";
import { deleteMultipleUsers } from "@/lib/user_directory/deleteMultipleUsers";
import { deleteUser } from "@/lib/user_directory/deleteUser";
import { failureNotification } from "@/components/notifications/failureNotification";
import { successNotification } from "@/components/notifications/successNotification";
import { useFirebaseUsers } from "@/hooks/user_directory/useFirebaseUsers";

//
export const useDeleteUserForm = () => {
  const { firebaseUsers } = useFirebaseUsers();
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<RealUser | null>(null);
  const [isSubmittingUserDelete, setIsSubmittingUserDelete] = useState(false);
  const [openDeleteMultipleUsers, setOpenDeleteMultipleUsers] = useState(false);
  const [multipleUsersToDelete, setMultipleUsersToDelete] = useState<
    string[] | null
  >(null);

  // open modal for deleting users
  const handleDeleteModal = useCallback((currUser: RealUser) => {
    setUserToDelete(currUser);
    setOpenDeleteUserModal(true);
  }, []);

  const handleDeleteCloseModal = useCallback(() => {
    setOpenDeleteUserModal(false);
  }, []);

  const handleOpenDeleteMultipleUsersModal = useCallback(
    (rowSelection: { [key: number]: boolean }) => {
      setOpenDeleteMultipleUsers(true);
      const usersToDelete = [];

      if (Object.keys(rowSelection).length > 0) {
        for (const key in rowSelection) {
          usersToDelete.push(firebaseUsers[key]);
        }
      }

      setMultipleUsersToDelete(usersToDelete.map((user) => user.id));
    },
    [firebaseUsers]
  );

  const handleCloseDeleteMultipleUsers = useCallback(() => {
    setMultipleUsersToDelete(null);
    setOpenDeleteMultipleUsers(false);
    setIsSubmittingUserDelete(false);
  }, []);

  const handleDeleteMultipleUsers = async (table: Table<RealUser>) => {
    if (multipleUsersToDelete && multipleUsersToDelete.length > 0) {
      setIsSubmittingUserDelete(true);
      try {
        await deleteMultipleUsers(multipleUsersToDelete)
          .then(() => {
            table.resetRowSelection(true);
            handleCloseDeleteMultipleUsers();
            successNotification(
              `Los usuarios seleccionados han sido eliminados exitosamente.`
            );
          })
          .catch((error) => {
            handleCloseDeleteMultipleUsers();
            failureNotification(
              `Ha ocurrido un error trantando de eliminar a los usuarios seleccionados, ${error}`
            );
          });
      } catch (error) {
        failureNotification(
          `Ha ocurrido un error trantando de eliminar a los usuarios seleccionados, ${error}`
        );
      }
    }
  };

  const handleDeleteUser = () => {
    if (userToDelete && "id" in userToDelete) {
      const { id } = userToDelete;

      if (typeof id === "string") {
        setIsSubmittingUserDelete(true);

        try {
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
              handleDeleteCloseModal();
              setIsSubmittingUserDelete(false);
              // notify of not being able to delete the user
              failureNotification(
                `Ha ocurrido un error trantando de eliminar al usuario ${userToDelete?.fullname}. Error: ${error}`
              );
            });
        } catch (error) {
          // notify of not being able to delete the user
          failureNotification(
            `Ha ocurrido un error trantando de eliminar al usuario ${userToDelete?.fullname}`
          );
        }
      }
      setIsSubmittingUserDelete(false);
    }
  };

  return {
    openDeleteUserModal,
    handleOpenDeleteMultipleUsersModal,
    userToDelete,
    handleDeleteUser,
    handleDeleteModal,
    handleDeleteCloseModal,
    isSubmittingUserDelete,
    openDeleteMultipleUsers,
    handleCloseDeleteMultipleUsers,
    handleDeleteMultipleUsers,
  };
};
