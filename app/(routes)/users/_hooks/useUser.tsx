'use client'

import {
  ReactNode,
  createContext,
  useMemo,
  useState
} from "react";

export const UserContext = createContext<{
  selectedUser: DirectoryEntry | null;
  setSelectedUser: (value: DirectoryEntry) => void;
}>({
  selectedUser: null,
  setSelectedUser: () => { },
});


export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<DirectoryEntry | null>(null);
  const value = useMemo(
    () => ({ selectedUser, setSelectedUser }),
    [selectedUser]
  );

  return <UserContext.Provider value={value}>{useMemo(() => {
    return children
  }, [])}</UserContext.Provider>;
};


