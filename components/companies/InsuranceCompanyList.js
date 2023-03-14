import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import PropTypes from "prop-types";
import { Spinning } from "@/components/spinning";

//
export const InsuranceCompanyList = ({
  insuranceCompanies,
  handleInsuranceCompanyDetails,
}) => {
  if (!insuranceCompanies) {
    return <Spinning />;
  }

  return (
    <>
      <div className="px-6 pt-6 pb-4">
        <h2 className="text-lg font-medium text-gray-900">Directorio</h2>
        <p className="mt-1 text-sm text-gray-600">
          Directorio de búsqueda de {insuranceCompanies?.length + 1} compañias
          de seguros
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
          {insuranceCompanies.map((company) => (
            <li key={company?.id}>
              <div className="relative flex items-center space-x-3 px-6 py-5 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-500 hover:bg-gray-50">
                <div className="flex-shrink-0">
                  {company?.logo_url ? (
                    <div className="relative bg-gray-100 rounded-full p-0.5">
                      <div className="relative h-14 w-14 rounded-full bg-white p-5">
                        <Image
                          className="object-contain p-0.5"
                          src={company?.logo_url}
                          alt="insurance company logo"
                          fill
                          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative bg-gray-100 rounded-full p-0.5">
                      <div className="relative h-14 w-14 rounded-full bg-white p-5">
                        <div className="object-contain p-0.5" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => handleInsuranceCompanyDetails(company)}
                    className="focus:outline-none w-full flex flex-col items-start space-y-1"
                  >
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    <div className="flex">
                      <p className="text-sm font-medium text-gray-900">
                        {company?.name}
                      </p>
                    </div>
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

InsuranceCompanyList.propTypes = {
  handleInsuranceCompanyDetails: PropTypes.func.isRequired,
};
