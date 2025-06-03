"use client";

import { useContext, useEffect, useState } from "react";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { UserContext } from "../../../../global-hooks/useUser";
import { UserSchema } from "types/global";
import { createAvatarImage } from "@/appUtils/create-avatar";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { getUsersSnapshot } from "@/_lib/firebase/firestore";

export const UsersList = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserSchema[]>([]);
  const { setSelectedUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = getUsersSnapshot((data) => setUsers(data));
    return () => void unsubscribe?.();
  }, []);

  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <nav aria-label="Directory" className="h-full overflow-y-auto">
      {users.length > 0 ? (
        ALPHABET.map((letter) => {
          const bucket = users
            .filter(
              (u) =>
                u.user.personal_info.firstname.charAt(0).toUpperCase() ===
                letter
            )
            .sort((a, b) =>
              a.user.personal_info.firstname.localeCompare(
                b.user.personal_info.firstname
              )
            );

          if (bucket.length === 0) return null;

          return (
            <div key={letter} className="relative">
              <div className="sticky top-0 z-10 border-y border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
                {letter}
              </div>
              <ul role="list" className="divide-y divide-gray-100">
                {bucket.map((person) => {
                  const full = [
                    person.user.personal_info.firstname,
                    person.user.personal_info.secondName,
                    person.user.personal_info.lastname,
                    person.user.personal_info.secondLastname,
                  ]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <li
                      key={person.created.toString()}
                      onClick={() => setSelectedUser(person)}
                      className="flex justify-between gap-x-4 px-3 py-5 items-center hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-x-3">
                        <div className="h-12 w-12 relative">
                          <Image
                            fill
                            alt={full}
                            src={
                              person.user.personal_info.avatar ||
                              createAvatarImage(person.user.personal_info)
                            }
                            className="rounded-full bg-blue-50 shadow-md shadow-blue-500/25"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900">
                            {full}
                          </p>
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {formatPhoneNumberToNationalUSAformat(
                              person.user.personal_info.phone
                            )}
                          </p>
                        </div>
                      </div>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-400"
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })
      ) : (
        <div className="p-4 text-center text-gray-500">{children}</div>
      )}
    </nav>
  );
};
