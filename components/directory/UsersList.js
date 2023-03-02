import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import PropTypes from "prop-types";
import { Spinning } from "@/components/spinning";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

export const UsersList = ({
  firebaseError,
  firebaseUsers,
  handleUserDetails,
}) => {
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
          Directorio de búsqueda de {firebaseUsers.length + 1} usuarios
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
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm"
                placeholder="Search"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
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
              <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500 hover:bg-gray-50">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-300" />
                </div>
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() => handleUserDetails(person)}
                    className="focus:outline-none w-full flex flex-col items-start space-y-1"
                  >
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <div className="flex">
                      <p className="text-sm font-medium text-gray-900">
                        {person?.fullname
                          .split(" ")
                          .map((name) => {
                            const tempName = name.toLowerCase();
                            return capitalizeFirstLetter(tempName);
                          })
                          .join(" ")}
                      </p>
                      <div className="ml-2 relative inline-flex items-center rounded-full border border-gray-300 px-2 py-0.5 text-sm">
                        <span className="absolute flex flex-shrink-0 items-center justify-center">
                          <span
                            className="h-1 w-1 rounded-full"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-xs text-gray-500">
                          {person?.company}
                        </span>
                      </div>
                    </div>

                    <p className="truncate text-sm text-gray-500">
                      {formatPhoneNumber(person?.phone)}
                    </p>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

UsersList.propTypes = {
  firebaseUsers: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool.isRequired,
      color: PropTypes.string,
      company: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      fullname: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      notes: PropTypes.string,
      phone: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      second_lastname: PropTypes.string,
      second_name: PropTypes.string,
      secondary_phone: PropTypes.string,
      third_phone: PropTypes.string,
      uniqueId: PropTypes.string,
    })
  ).isRequired,
  firebaseError: PropTypes.string,
  handleUserDetails: PropTypes.func.isRequired,
};
