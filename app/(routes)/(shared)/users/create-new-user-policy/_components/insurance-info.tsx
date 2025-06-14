import { CustomInput } from "../utils/custom-input";
import { CustomSelect } from "../utils/custom-select";
import { useFormContext } from "react-hook-form";
import { useGetCompanies } from "../hooks/useGetCompanies";

export const InsuranceInfo = () => {
  const {
    formState: { errors },
  } = useFormContext<Partial<UserPolicyInputs>>();
  const { companies } = useGetCompanies();
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
                <CustomInput
                  htmlFor="policy_start_date"
                  type="date"
                  label="Fecha de Inscripción"
                  formErrors={errors?.policy_start_date}
                  errorMessage={errors?.policy_start_date?.message}
                  readOnly={false}
                  mandatory={false}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="insurance_policy_number"
                  placeholder="55-55-555"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  mandatory={false}
                  label="Numero de poliza"
                  formErrors={errors?.insurance_policy_number}
                  errorMessage={errors?.insurance_policy_number?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="prima"
                  placeholder="$0.00"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  mandatory={false}
                  label="Prima"
                  formErrors={errors?.prima}
                  errorMessage={errors?.prima?.message}
                  type="text"
                />
              </div>

              {/* Companias de Seguros */}
              <div className="col-span-6 sm:col-span-3">
                <CustomSelect
                  htmlFor="insurance_company"
                  label="Compañias de Seguros"
                  options={companies.map((company) => ({
                    value: company.name,
                    label: company.name,
                  }))}
                  formErrors={errors?.insurance_company}
                  errorMessage={errors?.insurance_company?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                <CustomSelect
                  htmlFor="insurance_plan_type"
                  label="Tipo de Plan"
                  options={[
                    { label: "Seleccione un plan" },
                    { label: "Bronze" },
                    { label: "Silver" },
                    { label: "Gold" },
                    { label: "Platinum" },
                  ]}
                  formErrors={errors?.insurance_plan_type}
                  errorMessage={errors?.insurance_plan_type?.message}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
