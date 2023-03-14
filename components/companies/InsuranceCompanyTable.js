import Image from "next/image";
import { Spinning } from "@/components/spinning";
import { useInsuranceCompany } from "@/hooks/insurance_company/useHandleInsuranceCompany";
//
export const InsuranceCompanyTable = () => {
  const { insuranceCompanies, insuranceCompanyError } = useInsuranceCompany();

  if (insuranceCompanyError) {
    return (
      <div>
        ERROR of the application{" "}
        {JSON.stringify(insuranceCompanyError, null, 2)}
      </div>
    );
  }
  if (!insuranceCompanies || insuranceCompanies?.length === 0) {
    return <Spinning message="Cargando Compañias de Seguros" />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Compañias de Seguros
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Edite, elimine o actualize informacion sobre las compañias de
            seguros aqui en esta tabla.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-cyan-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Añadir compañia
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="max-h-[70vh]">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="sticky top-0 z-50 bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Logo
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="h-96 divide-y divide-gray-200 overflow-y-auto bg-white">
                  {insuranceCompanies.map((company) => (
                    <tr key={company.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex items-center">
                          <div className="relative h-16 w-16 flex-shrink-0 rounded-full">
                            <Image
                              className="object-contain"
                              src={company?.logo_url}
                              alt="insurance company logo"
                              fill
                            />
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">
                          <div className="font-medium text-gray-900">
                            {company?.name}
                          </div>
                        </div>
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          href="#"
                          className="text-cyan-600 hover:text-cyan-900"
                        >
                          Editar
                          <span className="sr-only">, {company?.name}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
