import { useEffect, useState } from "react";

import { RealUser } from "@/interfaces/index";

export const useGetUserFromSessionStorage = () => {
  const [user, setUser] = useState<RealUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user || typeof user === "undefined") {
      console.log("user not found on session Storage");
      //  handle error
      setError("user not found on session Storage");
    } else {
      try {
        const parsedUser = JSON.parse(user);
        const { data } = parsedUser;
        setUser(data);
      } catch (error) {
        console.log("error: ", error);
        throw new Error(error as unknown as string);
      }
    }
  }, []);

  return { user, error };
};
