import { Controller, useFormContext } from "react-hook-form";

//
export const LegalStatus = () => {
  const { register, control } = useFormContext();
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
                <Controller
                  control={control}
                  name="legal_status"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <>
                      <label
                        htmlFor="legal_status"
                        className="block text-sm font-medium text-gray-800"
                      >
                        Estatus Legal
                      </label>
                      <select
                        id="legal_status"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option>Seleccione una opcion</option>
                        <option>Residente</option>
                        <option>Ciudadano</option>
                        <option>Permiso de Trabajo</option>
                        <option>Huellas</option>
                        <option>En Tramites</option>
                        <option>Sin Estatus</option>
                      </select>
                    </>
                  )}
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
                    className="shadow-xs focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
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
