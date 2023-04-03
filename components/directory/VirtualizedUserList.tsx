import { FakeUser, RealUser } from "@/interfaces/index";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { forwardRef, useEffect } from "react";

import { Spinning } from "@/components/Spinning";
import { Virtuoso } from "react-virtuoso";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { normalizeString } from "@/utils/normalizeString";
import { selectedUserAtom } from "@/lib/state/atoms";
import { useAtomValue } from "jotai";
import { useFakeUserList } from "@/hooks/test/useFakeUserList";
import { useFirebaseUsers } from "@/hooks/user_directory/useFirebaseUsers";
import { useSetAtom } from "jotai";
import { userPhoneAtom } from "@/lib/state/atoms";

//
const Footer = () => (
  <div className="flex justify-center px-6 py-5 text-xs text-gray-400">
    Ha llegado al final de la lista.
  </div>
);

// eslint-disable-next-line react/display-name
const List = forwardRef((props, ref) => {
  return (
    <ul {...props} ref={ref} className="z-0 w-full divide-y divide-gray-300" />
  );
});

export const VirtualizedUserList = () => {
  const setUserPhone = useSetAtom(userPhoneAtom);
  const setSelectedUser = useSetAtom(selectedUserAtom);
  const selectedUser = useAtomValue<RealUser | null>(selectedUserAtom);

  useEffect(() => {
    return () => {
      setSelectedUser(null);
      setUserPhone("");
    };
  }, [setSelectedUser, setUserPhone]);

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
      <div className="bg-gray-100 px-6 pt-6 pb-6">
        <h2 className="text-lg font-medium text-gray-900">Directorio</h2>
        <p className="mt-1 text-sm text-gray-600">
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
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      {/* Directory list */}
      <nav
        className="max-h-[80vh] flex-1 overflow-y-auto bg-gray-100"
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
                    ? "flex items-center space-x-3 bg-blue-600 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500"
                    : "flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 hover:bg-white"
                }
              >
                <div className="flex-shrink-0">
                  <div
                    className={
                      selectedUser?.fullname === user.fullname
                        ? "h-10 w-10 rounded-full bg-blue-50"
                        : "h-10 w-10 rounded-full bg-gray-400"
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
                        // console.log(
                        //   "error on VirtualizedList onCLick: ",
                        //   error
                        // );
                        return error;
                      }
                    }}
                    className="flex w-full flex-col items-start space-y-1 focus:outline-none"
                  >
                    <div className="flex w-full justify-between">
                      <p
                        className={
                          selectedUser?.fullname === user.fullname
                            ? "whitespace-normal text-sm font-medium text-white"
                            : "whitespace-normal text-sm font-medium text-gray-900"
                        }
                      >
                        {normalizeString(user?.fullname)}
                      </p>
                      <div className="relative inline-flex items-center rounded-full border border-white px-2 py-0.5 text-sm">
                        <span className="absolute flex flex-shrink-0 items-center justify-center">
                          <span
                            className="h-1 w-1 rounded-full"
                            aria-hidden="true"
                          />
                        </span>
                        <span
                          className={
                            selectedUser?.fullname === user.fullname
                              ? "text-xs text-white"
                              : "text-xs text-gray-500"
                          }
                        >
                          {user?.insurance_company}
                        </span>
                      </div>
                    </div>

                    <p
                      className={
                        selectedUser?.fullname === user.fullname
                          ? "truncate text-sm text-white"
                          : "truncate text-sm text-gray-500"
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
