"use client";

import { ReactNode, createContext, useMemo, useState } from "react";

import { useFirebaseToken } from "./useFirebaseToken";

export const UserContext = createContext<{
  selectedUser: DirectoryEntry | null;
  setSelectedUser: (value: DirectoryEntry) => void;
}>({
  selectedUser: null,
  setSelectedUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<DirectoryEntry | null>(null);
  const { firebaseTokenAuth, firebaseTokenError } = useFirebaseToken();

  const value = useMemo(
    () => ({
      selectedUser,
      setSelectedUser,
      firebaseTokenAuth,
      firebaseTokenError,
    }),
    [selectedUser]
  );

  return (
    <UserContext.Provider value={value}>
      {useMemo(() => {
        return children;
      }, [])}
    </UserContext.Provider>
  );
};
