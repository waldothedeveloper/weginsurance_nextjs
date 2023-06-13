import { FakeUser, RealUser } from "@/interfaces/index";
import { selectedUserAtom, userPhoneAtom } from "@/lib/state/atoms";
import { useAtomValue, useSetAtom } from "jotai";

import {
  UserIcon,
} from "@heroicons/react/24/outline";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { normalizeString } from "@/utils/normalizeString";

// 
// eslint-disable-next-line no-unused-vars
export const UserList = ({ user, getMessages }: { user: RealUser | FakeUser | null, getMessages: (userId: string) => Promise<void> }) => {
  console.log('user: ', user);
  const selectedUser = useAtomValue(selectedUserAtom);
  console.log('selectedUser: ', selectedUser);
  const setUserPhone = useSetAtom(userPhoneAtom);
  const setSelectedUser = useSetAtom(selectedUserAtom);
  return (
    <>
      <li
        className={
          selectedUser?.id === user?.id
            ? "my-3 flex items-center space-x-3 rounded-2xl bg-slate-100 px-6 py-6 outline-none focus-within:ring-2 focus-within:ring-inset focus:ring-red-50"
            : "my-3 flex items-center space-x-3 rounded-2xl px-6 py-6 outline-none focus-within:ring-2 focus-within:ring-inset hover:bg-slate-50 focus:outline-none"
        }
      >
        <div className="flex-shrink-0">
          <UserIcon
            className={
              selectedUser?.id === user?.id
                ? "h-12 w-12 rounded-xl bg-slate-200 p-2 font-light text-slate-400"
                : "h-12 w-12 rounded-xl bg-slate-50 p-2 font-light text-slate-400"
            }
          />
        </div>
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={() => {
              try {
                setUserPhone(user?.phone || "");
                setSelectedUser(user);
                getMessages(user?.id || "")
              } catch (error) {
                return error;
              }
            }}
            className="flex w-full flex-col items-start space-y-1 focus:outline-none"
          >
            <div className="flex w-full justify-between">
              <p
                className={
                  selectedUser?.id === user?.id
                    ? "whitespace-normal text-sm font-medium text-slate-900"
                    : "whitespace-normal text-sm font-medium text-slate-600"
                }
              >
                {normalizeString(user?.fullname || "")}
              </p>
              <div
                className={
                  selectedUser?.id === user?.id
                    ? "relative inline-flex items-center rounded-full border border-blue-600 px-2 py-0.5 text-sm"
                    : "relative inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-sm"
                }
              >
                <span className="absolute flex flex-shrink-0 items-center justify-center">
                  <span
                    className="h-1 w-1 rounded-full"
                    aria-hidden="true"
                  />
                </span>
                <span
                  className={
                    selectedUser?.id === user?.id
                      ? "text-xs font-medium text-blue-600"
                      : "text-xs text-slate-400"
                  }
                >
                  {user?.insuranceCompany}
                </span>
              </div>
            </div>

            <p
              className={
                selectedUser?.id === user?.id
                  ? "truncate text-xs text-slate-600"
                  : "truncate text-xs text-slate-400"
              }
            >
              {formatPhoneNumberToNationalUSAformat(user?.phone)}
            </p>
          </button>
        </div>
      </li>
    </>
  )
}