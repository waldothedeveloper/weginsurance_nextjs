import { CustomInput } from "../utils/custom-input";
import { CustomSelect } from "../utils/custom-select";
import { useFormContext } from "react-hook-form";

//
export const WorkInfo = () => {
  const {
    formState: { errors },
  } = useFormContext<Partial<UserPolicyInputs>>();
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informacion Laboral
            </h3>
            <p className="mt-1 text-sm text-gray-800">
              Aqui debe llenar la informacion laborarl del cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 bg-gray-50 sm:p-6 rounded-md shadow-lg">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <CustomSelect
                  htmlFor="work_type"
                  options={[
                    { label: "Seleccione una opcion" },
                    { label: "W2" },
                    { label: "1099" },
                    { label: "SSA-1099" },
                    { label: "1099-R" },
                  ]}
                  mandatory={false}
                  label="Tipo de Empleo"
                  formErrors={errors?.work_type}
                  errorMessage={errors?.work_type?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="company_name"
                  placeholder="Apple"
                  mandatory={false}
                  label="Nombre de la compañia"
                  formErrors={errors?.company_name}
                  errorMessage={errors?.company_name?.message}
                  type="text"
                />
              </div>
              {/* Ingresos anuales */}
              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="wages"
                  placeholder="$110.000"
                  mandatory={false}
                  label="Ingresos Anuales (aproximadamente)"
                  formErrors={errors?.wages}
                  errorMessage={errors?.wages?.message}
                  type="text"
                  pattern="[0-9]*"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
