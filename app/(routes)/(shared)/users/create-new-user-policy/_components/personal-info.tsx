import { CustomInput } from "../utils/custom-input";
import { CustomSelect } from "../utils/custom-select";
import { useFormContext } from "react-hook-form";

export default function PersonalInfo() {
  const {
    formState: { errors },
  } = useFormContext<Partial<UserPolicyInputs>>();
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Informacion Personal
            </h3>
            <p className="mt-1 text-sm text-gray-800">
              Aqui debe llenar la informacion personal del cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          {/* Acepta Cobertura Medica SI O NO */}
          <div className="px-4 py-5 bg-gray-50 sm:p-6 rounded-md shadow-lg">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-6">
                <CustomSelect
                  htmlFor="accepts_insurance"
                  options={[
                    { label: "Seleccione una opcion" },
                    { label: "Si" },
                    { label: "No" },
                  ]}
                  mandatory={true}
                  label="Acepta Cobertura Medica"
                  formErrors={errors?.accepts_insurance}
                  errorMessage={errors?.accepts_insurance?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="firstname"
                  autoComplete="given-name"
                  placeholder="Jose"
                  label="Primer Nombre"
                  formErrors={errors?.firstname}
                  errorMessage={errors?.firstname?.message}
                  type="text"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="second_name"
                  autoComplete="additional-name"
                  placeholder="Julian"
                  label="Segundo Nombre"
                  formErrors={errors?.second_name}
                  errorMessage={errors?.second_name?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="lastname"
                  autoComplete="family-name"
                  placeholder="Marti"
                  label="Primer Apellido"
                  formErrors={errors?.lastname}
                  errorMessage={errors?.lastname?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="second_lastname"
                  autoComplete="family-name"
                  placeholder="Perez"
                  label="Segundo Apellido"
                  formErrors={errors?.second_lastname}
                  errorMessage={errors?.second_lastname?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-4">
                <CustomSelect
                  htmlFor="civil_status"
                  options={[
                    { label: "Seleccione una opcion" },
                    { label: "Soltero" },
                    { label: "Casado" },
                    { label: "Divorciado" },
                    { label: "Viudo(a)" },
                    { label: "Separado(a)" },
                  ]}
                  label="Estado Civil"
                  formErrors={errors?.civil_status}
                  errorMessage={errors?.civil_status?.message}
                />
              </div>
              <div className="col-span-6 sm:col-span-6">
                <CustomSelect
                  htmlFor="genre"
                  options={[
                    { label: "Seleccione una opcion" },
                    { label: "Masculino" },
                    { label: "Femenino" },
                  ]}
                  mandatory={true}
                  label="Genero"
                  formErrors={errors?.genre}
                  errorMessage={errors?.genre?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="email"
                  autoComplete="email"
                  placeholder="ejemplo@prueba.com"
                  label="Correo Electronico"
                  formErrors={errors?.email}
                  errorMessage={errors?.email?.message}
                  type="email"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="ssn"
                  autoComplete="ssn"
                  placeholder="123-45-6789"
                  label="Numero de Seguro Social"
                  formErrors={errors?.ssn}
                  errorMessage={errors?.ssn?.message}
                  type="text"
                  inputMode="numeric"
                />
              </div>

              {/* Contact info such as tel & email */}
              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="phone"
                  autoComplete="tel-national"
                  placeholder="(555)-555-5555"
                  label="Telefono"
                  formErrors={errors?.phone}
                  errorMessage={errors?.phone?.message}
                  type="text"
                  inputMode="numeric"
                />
              </div>
              {/* Birthdate  */}
              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  type="date"
                  htmlFor="birthdate"
                  autoComplete="bday"
                  placeholder="YYYY-MM-DD"
                  label="Fecha de Nacimiento"
                  formErrors={errors?.birthdate}
                  errorMessage={errors?.birthdate?.message}
                />
              </div>
              {/* Age auto calc after birth date, READ-ONLY */}
              <div className="col-span-6 sm:col-span-4">
                <CustomInput
                  htmlFor="age"
                  autoComplete="age"
                  placeholder="Edad"
                  label="Edad"
                  formErrors={errors?.age}
                  errorMessage={errors?.age?.message}
                  type="number"
                  inputMode="numeric"
                  expectsNumber={true}
                />
              </div>

              {/* Address */}

              <div className="col-span-6">
                <CustomInput
                  htmlFor="street_address"
                  autoComplete="street-address"
                  placeholder="123 Main St, Apt 4B"
                  label="Direccion (calle, etc)"
                  formErrors={errors?.street_address}
                  errorMessage={errors?.street_address?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <CustomInput
                  htmlFor="city"
                  autoComplete="address-level2"
                  placeholder="Ciudad"
                  label="Ciudad"
                  formErrors={errors?.city}
                  errorMessage={errors?.city?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <CustomInput
                  htmlFor="state"
                  autoComplete="address-level1"
                  placeholder="Estado"
                  label="Estado / Provincia"
                  formErrors={errors?.state}
                  errorMessage={errors?.state?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <CustomInput
                  htmlFor="postal_code"
                  autoComplete="postal-code"
                  placeholder="ZIP / Codigo Postal"
                  label="Codigo Postal"
                  formErrors={errors?.postal_code}
                  errorMessage={errors?.postal_code?.message}
                  type="number"
                  inputMode="numeric"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
