import { UserContext } from "../../_hooks/useUser";
import { useContext } from "react";

export default function LegalStatus() {
  const { selectedUser } = useContext(UserContext);
  return (
    <div>
      <div>
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Estatus Legal
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.legal_status || "No hay informacion sobre el estatus legal de este usuario"}
            </dd>
          </div>
          {/* Notes */}
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Notas
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.legal_status_notes || "No hay notas del estatus legal sobre este usuario"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}