import { useState } from "react";

//
export const useFirebaseUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);

  const handleUserDetails = (user) => {
    setUserDetails(user);
  };

  return { userDetails, handleUserDetails };
};
