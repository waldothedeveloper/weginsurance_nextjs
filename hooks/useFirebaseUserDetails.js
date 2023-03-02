import { deleteUser } from "@/lib/deleteUser";
import { useState } from "react";
//
export const useFirebaseUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleUserDetails = (user) => {
    setUserDetails(user);
  };

  const handleDeleteUser = (id) => {
    // each user is saved on the db by it's phone number, so that's the user ID.
    deleteUser(id)
      .then(() => setUserDetails(null))
      .catch((err) => console.log(`Could not delete user`, err));
  };

  return {
    userDetails,
    handleUserDetails,
    handleDeleteUser,
    openModal,
    setOpenModal,
  };
};
