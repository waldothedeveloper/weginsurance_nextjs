import { UserContext } from "../../_hooks/useUser";
import { useContext } from "react";

export default function InsurancePolicy() {
  const { selectedUser } = useContext(UserContext);
  return (
    <div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Fecha de Inicio (de cobertura)
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.policy_start_date || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Numero de Poliza
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.policy_number || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Prima
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              $ {selectedUser?.policy_amount || " - "} USD
            </dd>
          </div>

          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Compañia de Seguros
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.insuranceCompany || " - "}
            </dd>
          </div>

          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Tipo de Plan
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.policy_plan || " - "}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
