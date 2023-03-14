import { Spinning } from "@/components/spinning";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useFirebaseUsers } from "@/hooks/useFirebaseUsers";

//
export const UsersTable = () => {
  const { firebaseUsers, firebaseError } = useFirebaseUsers();

  if (firebaseError) {
    return (
      <div>
        ERROR of the application {JSON.stringify(firebaseError, null, 2)}
      </div>
    );
  }
  if (firebaseUsers?.length === 0) {
    return <Spinning message="Cargando Usuarios" />;
  }
  return (
    <div className="px-4 sm:px-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Usuarios
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Aqui puede crear, eliminar, o actualizar usuarios de la compañia.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-cyan-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            Crear usuario
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mb-2 overflow-x-auto sm:-mx-6">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="max-h-[70vh]">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="sticky top-0 z-50 bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Nombre y Apellidos
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                    >
                      Telefono
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Compañia
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
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
                  {firebaseUsers.map((person) => (
                    <tr key={person.id}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                        {person.fullname}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Fullname</dt>
                          <dd className="mt-1 truncate text-gray-700">
                            {formatPhoneNumber(person.phone)}
                          </dd>
                          <dt className="sr-only sm:hidden">
                            Insurance Company
                          </dt>
                          <dd className="mt-1 truncate text-gray-500 sm:hidden">
                            {person.insurance_company}
                          </dd>
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                        {formatPhoneNumber(person.phone)}
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                        {person.insurance_company}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-cyan-600 hover:text-cyan-900"
                        >
                          Editar
                          <span className="sr-only">, {person.fullname}</span>
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
