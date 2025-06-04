import { FakeUser, RealUser } from "@/interfaces/index";
import { selectedUserAtom, userPhoneAtom } from "@/lib/state/atoms";
import { Atom, useAtomValue, useSetAtom } from "jotai";

import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { normalizeString } from "@/utils/normalizeString";
import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useHits } from "react-instantsearch";

// eslint-disable-next-line no-unused-vars
export const CustomHits = ({
  isProcessingInfo,
}: {
  isProcessingInfo: boolean;
}) => {
  const { hits } = useHits();
  const setUserPhone = useSetAtom(userPhoneAtom);
  const setSelectedUser = useSetAtom(selectedUserAtom);
  const selectedUser =
    useAtomValue<Atom<RealUser | FakeUser | null>>(selectedUserAtom);

  return (
    <>
      <ul className="z-0 w-full px-4">
        {hits.map((hit) => (
          <li
            key={hit.objectID}
            className={
              selectedUser?.id === hit.objectID
                ? "my-3 flex items-center space-x-3 rounded-2xl bg-slate-100 px-6 py-6 outline-hidden focus-within:ring-2 focus-within:ring-inset focus:ring-red-50"
                : "my-3 flex items-center space-x-3 rounded-2xl px-6 py-6 outline-hidden focus-within:ring-2 focus-within:ring-inset hover:bg-slate-50 focus:outline-none"
            }
          >
            <div className="shrink-0">
              <UserIcon
                className={
                  selectedUser?.id === hit.objectID
                    ? "h-12 w-12 rounded-xl bg-slate-200 p-2 font-light text-slate-400"
                    : "h-12 w-12 rounded-xl bg-slate-50 p-2 font-light text-slate-400"
                }
              />
            </div>
            <div className="min-w-0 flex-1">
              <button
                disabled={isProcessingInfo}
                type="button"
                onClick={() => {
                  try {
                    setUserPhone(hit?.phone as string);
                    setSelectedUser({
                      phone: hit?.phone as string,
                      activeUser: hit?.activeUser as boolean,
                      secondLastname: hit?.secondLastname as string,
                      email: hit?.email as string,
                      notes: hit?.notes as string,
                      firstname: hit?.firstname as string,
                      secondName: hit?.secondName as string,
                      insuranceCompany: hit?.insuranceCompany as string,
                      gender: hit?.gender as "masculino" | "femenino",
                      firstTimeVisit: hit?.firstTimeVisit as boolean,
                      lastname: hit?.lastname as string,
                      fullname: hit?.fullname as string,
                      id: hit?.objectID as string,
                    } as RealUser);
                  } catch (error) {
                    return error;
                  }
                }}
                className="flex w-full flex-col items-start space-y-1 focus:outline-none"
              >
                <div className="flex w-full justify-between">
                  <p
                    className={
                      selectedUser?.id === hit.objectID
                        ? "whitsespace-normal text-sm font-medium text-slate-900"
                        : "whitsespace-normal text-sm font-medium text-slate-600"
                    }
                  >
                    {normalizeString(hit?.fullname as string)}
                  </p>
                  <div
                    className={
                      selectedUser?.id === hit.objectID
                        ? "relative inline-flex items-center rounded-full border border-blue-600 px-2 py-0.5 text-sm"
                        : "relative inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-sm"
                    }
                  >
                    <span className="absolute flex shrink-0 items-center justify-center">
                      <span
                        className="h-1 w-1 rounded-full"
                        aria-hidden="true"
                      />
                    </span>
                    <span
                      className={
                        selectedUser?.id === hit.objectID
                          ? "text-xs font-medium text-blue-600"
                          : "text-xs text-slate-400"
                      }
                    >
                      {hit?.insuranceCompany as React.ReactNode}
                    </span>
                  </div>
                </div>

                <p
                  className={
                    selectedUser?.id === hit.objectID
                      ? "truncate text-xs text-slate-600"
                      : "truncate text-xs text-slate-400"
                  }
                >
                  {formatPhoneNumberToNationalUSAformat(hit?.phone as string)}
                </p>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
