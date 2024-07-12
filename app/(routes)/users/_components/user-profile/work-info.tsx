import { UserContext } from "../../_hooks/useUser";
import { useContext } from "react";
// Employment information
export default function WorkInfo() {
  const { selectedUser } = useContext(UserContext);
  return (
    <div>
      <div>
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Tipo de Empleo
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.employment_type || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Nombre de la Compañia
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.company_name || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Ingresos Anuales (aproximados)
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.annual_income || " - "}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}