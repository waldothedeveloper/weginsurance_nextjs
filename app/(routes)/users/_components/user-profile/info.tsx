import { UserContext } from "../../_hooks/useUser";
import { calculateAge } from "@/appUtils/calculate-age";
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
              {selectedUser?.firstname}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Segundo Nombre
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.secondName || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Apellidos
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.lastname} {selectedUser?.secondLastname}
            </dd>
          </div>

          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Correo Electronico
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.email || " - "}
            </dd>
          </div>

          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Telefono
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {formatPhoneNumberToNationalUSAformat(selectedUser?.phone)}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Seguro Social
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.ssn || " - "}
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Genero
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.gender || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Fecha de Nacimiento
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {friendlyDate(selectedUser?.birthdate) || " - "}
            </dd>
          </div>
          <div className="px-4 py-6 sm:col-span-1 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Edad
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {calculateAge(selectedUser?.birthdate) || " - "}
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
                  {selectedUser?.address?.street || " - "}
                </p>
              </div>
              <div>
                <dd className="mt-1 leading-6 text-gray-700 sm:mt-2">Ciudad</dd>
                <p className="text-sm leading-6 text-gray-700">
                  {selectedUser?.address?.city || " - "}
                </p>
              </div>
              <div>
                <dd className="mt-1 leading-6 text-gray-700 sm:mt-2">Estado</dd>
                <p className="text-sm leading-6 text-gray-700">
                  {selectedUser?.address?.state || " - "}
                </p>
              </div>
              <div>
                <dd className="mt-1 leading-6 text-gray-700 sm:mt-2">
                  Codigo Postal
                </dd>
                <p className="text-sm leading-6 text-gray-700">
                  {selectedUser?.address?.zipcode || " - "}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Tiene Cobertura
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.has_policy
                ? "SI"
                : "No tiene cobertura o aun no se ha actualizado la cobertura del usuario"}
            </dd>
          </div>
          {/* Notes */}
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Notas
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
              {selectedUser?.notes || "No hay notas acerca de este usuario"}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
