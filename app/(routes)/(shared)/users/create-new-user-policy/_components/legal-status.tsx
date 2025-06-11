import { FieldErrors, useFormContext } from "react-hook-form";

import { CustomSelect } from "../utils/custom-select";

export const LegalStatus = ({
  formErrors,
}: {
  formErrors?: FieldErrors<Partial<UserPolicyInputs>>;
}) => {
  const { register } = useFormContext();
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Estatus Legal
            </h3>
            <p className="mt-1 text-sm text-gray-800">
              Aqui debe llenar la informacion correspondiente al estatus legal
              del cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 bg-gray-50 sm:p-6 rounded-md shadow-lg">
            <div className="grid grid-cols-6 gap-6">
              {/* Status: Residente, Citizen, Huellas */}
              <div className="col-span-6 sm:col-span-3">
                <CustomSelect
                  htmlFor="legal_status"
                  options={[
                    { label: "Seleccione una opcion" },
                    { label: "Residente" },
                    { label: "Ciudadano" },
                    { label: "Permiso de Trabajo" },
                    { label: "Huellas" },
                    { label: "En Tramites" },
                    { label: "Sin Estatus" },
                  ]}
                  mandatory={false}
                  label="Estatus Legal"
                  formErrors={formErrors?.legal_status}
                  errorMessage={formErrors?.legal_status?.message}
                  readOnly={false}
                />
              </div>
              {/* Notes */}
              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="legal_status_notes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notas
                </label>
                <div className="mt-1">
                  <textarea
                    {...register("legal_status_notes")}
                    id="legal_status_notes"
                    name="legal_status_notes"
                    rows={3}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                    placeholder="ejemplo: 2 meses para el permiso de trabajo."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
