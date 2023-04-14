import { FakeUser, RealUser } from "@/interfaces/index";
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { forwardRef, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import { Spinning } from "@/components/Spinning";
import { Virtuoso } from "react-virtuoso";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { normalizeString } from "@/utils/normalizeString";
import { selectedUserAtom } from "@/lib/state/atoms";
import { useFakeUserList } from "@/hooks/test/useFakeUserList";
import { useFirebaseUsers } from "@/hooks/user_directory/useFirebaseUsers";
import { useRouter } from "next/router";
import { userPhoneAtom } from "@/lib/state/atoms";

//
const Footer = () => (
  <div className="flex justify-center px-6 py-5 text-xs text-slate-400">
    Ha llegado al final de la lista.
  </div>
);

// eslint-disable-next-line react/display-name
const List = forwardRef((props, ref) => {
  return <ul {...props} ref={ref} className="z-0 w-full px-6" />;
});

export const VirtualizedUserList = () => {
  const setUserPhone = useSetAtom(userPhoneAtom);
  const setSelectedUser = useSetAtom(selectedUserAtom);
  const selectedUser = useAtomValue(selectedUserAtom);
  const router = useRouter();

  useEffect(() => {
    if (selectedUser) {
      router.push(`/admin/messages?userId=${selectedUser?.id}`, undefined, {
        shallow: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  //! make sure to change this test = false when you're done testing
  const test = false;
  const { firebaseUsers, firebaseError } = useFirebaseUsers();
  const fakeUserList: FakeUser[] = useFakeUserList();

  if (firebaseError) {
    return (
      <div>
        ERROR of the application {JSON.stringify(firebaseError, null, 2)}
      </div>
    );
  }

  if (test ? fakeUserList?.length === 0 : firebaseUsers?.length === 0) {
    return <Spinning message="Cargando Usuarios" />;
  }

  return (
    <>
      <div className="px-6 pb-6 pt-6">
        <h2 className="text-lg font-medium text-slate-900">Directorio</h2>
        <p className="mt-1 text-sm text-slate-600">
          Directorio de búsqueda de{" "}
          {test ? fakeUserList?.length : firebaseUsers.length} usuarios
        </p>
        <form
          className="mt-6 flex space-x-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="min-w-0 flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-slate-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="block w-full rounded-md border-slate-300 bg-slate-50 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FunnelIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      {/* Directory list */}
      <nav
        className="bg-secondary max-h-[80vh] flex-1 overflow-y-auto"
        aria-label="Directory"
      >
        <Virtuoso
          components={{ List, Footer }}
          data={test ? fakeUserList : firebaseUsers}
          itemContent={(index, user: RealUser) => (
            <>
              <li
                className={
                  selectedUser?.fullname === user.fullname
                    ? "my-3 flex items-center space-x-3 rounded-2xl bg-slate-100 px-6 py-6 outline-none focus-within:ring-2 focus-within:ring-inset focus:ring-red-50"
                    : "my-3 flex items-center space-x-3 rounded-2xl px-6 py-6 outline-none focus-within:ring-2 focus-within:ring-inset hover:bg-slate-50 focus:outline-none"
                }
              >
                <div className="flex-shrink-0">
                  <UserIcon
                    className={
                      selectedUser?.fullname === user.fullname
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
                        setUserPhone(user?.phone);
                        setSelectedUser(user);
                      } catch (error) {
                        return error;
                      }
                    }}
                    className="flex w-full flex-col items-start space-y-1 focus:outline-none"
                  >
                    <div className="flex w-full justify-between">
                      <p
                        className={
                          selectedUser?.fullname === user.fullname
                            ? "whitespace-normal text-sm font-medium text-slate-900"
                            : "whitespace-normal text-sm font-medium text-slate-600"
                        }
                      >
                        {normalizeString(user?.fullname)}
                      </p>
                      <div
                        className={
                          selectedUser?.fullname === user.fullname
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
                            selectedUser?.fullname === user.fullname
                              ? "text-xs font-medium text-blue-600"
                              : "text-xs text-slate-400"
                          }
                        >
                          {user?.insurance_company}
                        </span>
                      </div>
                    </div>

                    <p
                      className={
                        selectedUser?.fullname === user.fullname
                          ? "truncate text-xs text-slate-600"
                          : "truncate text-xs text-slate-400"
                      }
                    >
                      {formatPhoneNumber(user?.phone)}
                    </p>
                  </button>
                </div>
              </li>
            </>
          )}
        />
      </nav>
    </>
  );
};
