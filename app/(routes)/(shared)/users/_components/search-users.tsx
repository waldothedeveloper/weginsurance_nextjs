import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import SearchOptions from "./search-options";

export const SearchUsers: React.FC = () => {
  return (
    <div className="px-6 pb-4 pt-6">
      <h2 className="text-lg font-medium text-gray-900">Directorio</h2>
      <p className="mt-1 text-sm text-gray-600">
        Buscar en el directorio de 3,018 clientes
      </p>
      <form action="#" className="mt-6 flex gap-x-4">
        <div className="min-w-0 flex-1">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </div>
            <input
              id="search"
              name="search"
              type="search"
              placeholder="Search"
              className="block w-full rounded-md border-0 py-1.5 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <SearchOptions />
      </form>
    </div>
  );
};
