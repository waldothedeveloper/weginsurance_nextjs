import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { Spinning } from "@/components/spinning";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useFirebaseAuthAndGetUsers } from "@/hooks/useFirebaseAuthAndGetUsers";

export const UsersList = () => {
  const { firebaseUsers, firebaseError } = useFirebaseAuthAndGetUsers();

  if (firebaseError) {
    return (
      <div>
        ERROR of the application {JSON.stringify(firebaseError, null, 2)}
      </div>
    );
  }
  if (firebaseUsers.length === 0) {
    return <Spinning />;
  }

  return (
    <>
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900">Directorio</h2>
        <p className="mt-1 text-sm text-gray-600">
          Directorio de búsqueda de 3.018 empleados
        </p>
        <form className="mt-6 flex space-x-4" action="#">
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
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                placeholder="Search"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>
      {/* Directory list */}
      <nav className="min-h-0 flex-1 overflow-y-auto" aria-label="Directory">
        <ul className="relative z-0 divide-y divide-gray-200">
          {firebaseUsers.map((person) => (
            <li key={person?.uniqueId}>
              <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500 hover:bg-gray-50">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <a href="#" className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {person?.fullname
                        .split(" ")
                        .map((name) => {
                          const tempName = name.toLowerCase();
                          return capitalizeFirstLetter(tempName);
                        })
                        .join(" ")}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {formatPhoneNumber(person?.phone)}
                    </p>
                    <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                      <span className="absolute flex flex-shrink-0 items-center justify-center">
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-xs text-gray-500">
                        {person?.company}
                      </span>
                    </div>{" "}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
