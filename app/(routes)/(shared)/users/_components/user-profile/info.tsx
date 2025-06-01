import { UserContext } from "../../../../../global-hooks/useUser";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { friendlyDate } from "@/appUtils/format-date-friendly";
import { useContext } from "react";

export default function UserInfo() {
  const { selectedUser } = useContext(UserContext);

  return (
    <div>
      <div className="mt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Nombre
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.user.personal_info?.firstname || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Segundo Nombre
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.user.personal_info?.secondName || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Apellidos
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.user.personal_info?.lastname}{" "}
              {selectedUser?.user.personal_info?.secondLastname}
            </dd>
          </div>

          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Correo Electronico
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.user.personal_info?.email || " - "}
            </dd>
          </div>

          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Telefono
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {formatPhoneNumberToNationalUSAformat(
                selectedUser?.user.personal_info?.phone
              )}
            </dd>
          </div>

          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Genero
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.user.personal_info?.gender || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Fecha de Nacimiento
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {friendlyDate(selectedUser?.user.personal_info?.birthdate) ||
                " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Edad
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.user.personal_info?.age || " - "}
              {/* {calculateAge(selectedUser?.user.personal_info?.age) ||
                " - "} */}
            </dd>
          </div>
          {/* Address */}
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Dirección
            </dt>
            <div className="grid grid-cols-2">
              <div>
                <dd className="mt-1 leading-6 text-gray-700 sm:mt-2">Calle</dd>
                <p className="text-sm leading-6 text-gray-700">
                  {selectedUser?.user.address?.streetAddress || " - "}
                </p>
              </div>
              <div>
                <dd className="mt-1 leading-6 text-gray-700 sm:mt-2">Ciudad</dd>
                <p className="text-sm leading-6 text-gray-700">
                  {selectedUser?.user.address?.city || " - "}
                </p>
              </div>
              <div>
                <dd className="mt-1 leading-6 text-gray-700 sm:mt-2">Estado</dd>
                <p className="text-sm leading-6 text-gray-700">
                  {selectedUser?.user.address?.state || " - "}
                </p>
              </div>
              <div>
                <dd className="mt-1 leading-6 text-gray-700 sm:mt-2">
                  Codigo Postal
                </dd>
                <p className="text-sm leading-6 text-gray-700">
                  {selectedUser?.user.address?.postalCode || " - "}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Acepta Cobertura
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.user.insurance_info?.accepts_insurance
                ? "Si"
                : "No tiene cobertura o aun no se ha actualizado la cobertura del usuario"}
            </dd>
          </div>
          {/* Notes */}
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Notas
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.user.personal_info?.notes ||
                "No hay notas acerca de este usuario"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
