'use client'

import { femenine, masculine } from "@/appUtils/avatars-config";
import { useContext, useEffect, useState } from "react";

import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { UserContext } from "../_hooks/useUser";
import { createAvatar } from "@dicebear/core";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { getUsersSnapshot } from "@/_lib/firebase/firestore";
import { lorelei } from "@dicebear/collection";

function transformData(data: any[]): Directory {
  const directory: Directory = {};

  data.forEach((item) => {
    const firstLetter = item.firstname.charAt(0).toUpperCase();
    if (!directory[firstLetter]) {
      directory[firstLetter] = [];
    }

    directory[firstLetter].push({
      ...item,
      avatar: createAvatar(lorelei, {
        seed: item.id,
        hair: item.gender === "Femenino" ? femenine : masculine,
        beardProbability: item.gender === "Masculino" ? 50 : 0,
        earringsProbability: item.gender === "Femenino" ? 50 : 0,
      }).toDataUri(),
    });
  });

  // Ensure all required keys are present even if empty
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
    if (!directory[letter]) {
      directory[letter] = [];
    }
  });
  return directory;
}

export const UsersList = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<Directory | null>(null);
  const { setSelectedUser } = useContext(UserContext);


  useEffect(() => {
    const unsubscribe = getUsersSnapshot((data) => {
      const directory = transformData(data);
      setUsers(directory);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <nav aria-label="Directory" className="h-full overflow-y-auto">
      {users ? (
        Object.keys(users)
          .sort()
          .map((letter) => (
            <div key={letter} className="relative">
              <div className="sticky top-0 z-10 border-y border-b-gray-200 border-t-gray-100 bg-gray-50 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900">
                <h3>{letter}</h3>
              </div>
              <ul role="list" className="divide-y divide-gray-100">
                {users &&
                  users[letter].map((person) => (
                    <li
                      key={person.id}
                      onClick={() => setSelectedUser(person)}
                      className="flex justify-between gap-x-4 px-3 py-5 items-center hover:bg-gray-50"
                    >
                      <div className="flex">
                        <div className="h-12 w-12 relative">
                          <Image
                            fill
                            alt={person.fullname}
                            src={
                              person?.avatar ||
                              createAvatar(lorelei, {
                                seed: person.id,
                                hair:
                                  person.gender === "Femenino"
                                    ? femenine
                                    : masculine,
                                beardProbability:
                                  person.gender === "Masculino" ? 50 : 0,
                                earringsProbability:
                                  person.gender === "Femenino" ? 50 : 0,
                              }).toDataUri()
                            }
                            className="flex-none rounded-full bg-blue-50 shadow-md shadow-blue-500/25"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="min-w-0 ml-3">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {person.fullname}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {formatPhoneNumberToNationalUSAformat(person.phone)}
                          </p>
                        </div>
                      </div>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-gray-400"
                      />
                    </li>
                  ))}
              </ul>
            </div>
          ))
      ) :
        children
      }
    </nav>
  );
};
