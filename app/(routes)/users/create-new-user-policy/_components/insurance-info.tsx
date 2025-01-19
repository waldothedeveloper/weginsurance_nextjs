import { Controller } from "react-hook-form";
import { InsuranceCompanies } from "../_ui-components/insurance-companies";
import { useCreateUserPolicy } from "../hooks/useCreateUserPolicy";

export const InsuranceInfo = () => {
  const { register, control } = useCreateUserPolicy();
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6 mt-10">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Poliza de Seguro
            </h3>
            <p className="mt-1 text-sm text-gray-800">
              Aqui debe llenar toda la informacion correspondiente a la poliza
              de seguro que ha sido elegida por el cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 bg-gray-50 sm:p-6 rounded-md shadow-lg">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="policy_start_date"
                  className="block text-sm font-medium text-gray-800"
                >
                  Fecha de Inscripción
                </label>
                {/* , {
                    valueAsDate: true,
                  } */}
                <input
                  {...register("policy_start_date")}
                  type="date"
                  name="policy_start_date"
                  id="policy_start_date"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500  block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="insurance_policy_number"
                  className="block text-sm font-medium text-gray-800"
                >
                  Numero de poliza
                </label>
                <input
                  {...register("insurance_policy_number")}
                  placeholder="55-55-555"
                  type="text"
                  inputMode="numeric"
                  name="insurance_policy_number"
                  id="insurance_policy_number"
                  className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <div>
                  <label
                    htmlFor="prima"
                    className="block text-sm font-medium text-gray-800"
                  >
                    Prima
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className=" text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      {...register("prima")}
                      type="text"
                      inputMode="numeric"
                      name="prima"
                      id="prima"
                      className="focus:ring-blue-500 focus:border-blue-500  block w-full placeholder-gray-400 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      aria-describedby="price-currency"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span
                        className="text-gray-500 sm:text-sm"
                        id="price-currency"
                      >
                        USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Companias de Seguros */}
              <div className="col-span-6 sm:col-span-3">
                <InsuranceCompanies />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="insurance_plan_type"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <>
                      <div>
                        <label
                          htmlFor="insurance_plan_type"
                          className="block text-sm font-medium text-gray-800"
                        >
                          Tipo de Plan
                        </label>
                        <select
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value ?? "Seleccione un plan"}
                          ref={ref}
                          id="insurance_plan_type"
                          name="insurance_plan_type"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500  sm:text-sm rounded-md"
                        >
                          <option value="Seleccione un plan">
                            Seleccione un plan
                          </option>
                          <option value="Bronze">Bronze</option>
                          <option value="Silver">Silver</option>
                          <option value="Gold">Gold</option>
                          <option value="Platinum">Platinum</option>
                        </select>
                      </div>
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
