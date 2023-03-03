import { deleteUser } from "@/lib/deleteUser";
import { useState } from "react";
//
export const useFirebaseUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleUserDetails = (user) => {
    setUserDetails(user);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteUser = () => {
    const { phone } = userDetails;
    // each user is saved on the db by it's phone number, so that's the user ID.
    if (phone) {
      deleteUser(phone)
        .then(() => {
          setOpenModal(false);
          setUserDetails(null);
        })
        .catch((err) => {
          // console.log(`Could not delete user`, err)
          return err;
        });
    } else {
      throw new Error(`The phone destructuring is undefined`, phone);
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
