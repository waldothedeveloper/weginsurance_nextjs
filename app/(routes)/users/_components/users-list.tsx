"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import UserSkeleton from "./user-skeleton";
import { createAvatar } from "@dicebear/core";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { getUsersSnapshot } from "@/_lib/firebase/firestore";
import { lorelei } from "@dicebear/collection";

type DirectoryEntry = {
  id: string;
  activeUser: boolean;
  email: string;
  firstTimeVisit: boolean;
  firstname: string;
  fullname: string;
  gender: string;
  insuranceCompany: string;
  lastname: string;
  notes: string;
  pdfData?: {
    agent: string;
    expirationDate: string;
    language: string;
    signerBirthdate: string;
    signerEid: string;
  };
  phone: string;
  secondLastname: string;
  secondName: string;
};

type Variant =
  | "variant01"
  | "variant02"
  | "variant03"
  | "variant04"
  | "variant08"
  | "variant09"
  | "variant25"
  | "variant27"
  | "variant28"
  | "variant47"
  | "variant10"
  | "variant13"
  | "variant14"
  | "variant15"
  | "variant16"
  | "variant17"
  | "variant18"
  | "variant19"
  | "variant21"
  | "variant23"
  | "variant24"
  | "variant26"
  | "variant29"
  | "variant30"
  | "variant31"
  | "variant32"
  | "variant33"
  | "variant35"
  | "variant38"
  | "variant40"
  | "variant41"
  | "variant42"
  | "variant45"
  | "variant46"
  | "variant48";

type Directory = Record<string, DirectoryEntry[]>;

function transformData(data: any[]): Directory {
  const directory: Directory = {};

  data.forEach((item) => {
    const firstLetter = item.firstname.charAt(0).toUpperCase();
    if (!directory[firstLetter]) {
      directory[firstLetter] = [];
    }

    directory[firstLetter].push({
      ...item,
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

const femenine: Variant[] = [
  "variant10",
  "variant13",
  "variant14",
  "variant15",
  "variant16",
  "variant17",
  "variant18",
  "variant19",
  "variant21",
  "variant23",
  "variant24",
  "variant26",
  "variant29",
  "variant30",
  "variant31",
  "variant32",
  "variant33",
  "variant35",
  "variant38",
  "variant40",
  "variant41",
  "variant42",
  "variant45",
  "variant46",
  "variant48",
];

const masculine: Variant[] = [
  "variant01",
  "variant02",
  "variant03",
  "variant04",
  "variant08",
  "variant09",
  "variant25",
  "variant27",
  "variant28",
  "variant47",
];
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function UsersList() {
  const [users, setUsers] = useState<Directory | null>(null);

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
      {users ?
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
                    <li key={person.id} className="flex gap-x-4 px-3 py-5">
                      <div className="h-12 w-12 relative">
                        <Image
                          fill
                          alt={person.fullname}
                          src={createAvatar(lorelei, {
                            hair:
                              person.gender === "Femenino"
                                ? femenine
                                : masculine,
                            seed: person.id,
                            beardProbability:
                              person.gender === "Masculino"
                                ? getRandomInt(50, 100)
                                : 0,
                            earringsProbability:
                              person.gender === "Femenino"
                                ? getRandomInt(50, 100)
                                : 0,
                          }).toDataUri()}
                          className="flex-none rounded-full bg-gray-50"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {person.fullname}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {formatPhoneNumberToNationalUSAformat(person.phone)}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )) : <UserSkeleton />}
    </nav>
  );
}
