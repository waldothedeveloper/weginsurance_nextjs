"use client";

import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { UserContext } from "../../../../global-hooks/useUser";
import { UserSchema } from "types/global";
import { createAvatarImage } from "@/appUtils/create-avatar";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { getUsersSnapshot } from "@/_lib/firebase/firestore";

// TODO: We will use Tanstack Virtual later probably combined with Tanstack Query for better performance with large datasets

export const UsersList = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserSchema[]>([]);
  const { setSelectedUser, selectedUser } = useContext(UserContext);

  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = getUsersSnapshot((data) => setUsers(data));
    return () => void unsubscribe?.();
  }, []);

  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleUserSelectionAndNavigation = (user: UserSchema) => {
    setSelectedUser(user);
    if (pathname?.includes("/chat")) {
      router.push(
        `/chat/conversation?userId=${encodeURIComponent(user.fireUID)}`
      );
    }
  };

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
              <div className="sticky top-0 z-10 border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
                {letter}
              </div>
              <ul role="list" className="relative z-0 divide-y divide-gray-200">
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
                      onClick={() => handleUserSelectionAndNavigation(person)}
                    >
                      <div
                        tabIndex={0}
                        className={`relative flex items-center space-x-3 px-6 py-5 hover:bg-blue-50 ${
                          selectedUser?.fireUID === person.fireUID
                            ? "bg-blue-100 ring-2 ring-blue-500 ring-inset"
                            : ""
                        }`}
                      >
                        <div className="shrink-0">
                          <Image
                            alt={full}
                            src={
                              person.user.personal_info.avatar ||
                              createAvatarImage(person.user.personal_info)
                            }
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          {/* Extend touch target to entire panel */}
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          <p className="text-sm font-medium text-gray-900">
                            {full}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {formatPhoneNumberToNationalUSAformat(
                              person.user.personal_info.phone
                            )}
                          </p>
                        </div>
                        <ChevronRightIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-gray-400"
                        />
                      </div>
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
