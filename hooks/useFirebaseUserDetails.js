import { useCallback, useEffect, useState } from "react";

import { deleteUser } from "@/lib/deleteUser";

//
export const useFirebaseUserDetails = (navigation) => {
  const [userDetails, setUserDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => setOpenModal(true), []);
  const handleCloseModal = useCallback(() => setOpenModal(false), []);

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

  const handleDeleteUser = () => {
    const { id } = userDetails;
    if (id) {
      deleteUser(id)
        .then(() => {
          setOpenModal(false);
          setUserDetails(null);
        })
        .catch((err) => {
          // console.log(`Could not delete user`, err)
          return err;
        });
    } else {
      throw new Error(`The id destructuring is undefined`, id);
    }
  };

  return {
    userDetails,
    handleUserDetails,
    handleDeleteUser,
    openModal,
    handleOpenModal,
    handleCloseModal,
  };
};
