import { CustomInput } from "../utils/custom-input";
import { CustomSelect } from "../utils/custom-select";
import { FieldErrors } from "react-hook-form";

export default function PersonalInfo({
  formErrors,
}: {
  formErrors?: FieldErrors<Partial<UserPolicyInputs>>;
}) {
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
                  formErrors={formErrors?.accepts_insurance}
                  errorMessage={formErrors?.accepts_insurance?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="firstname"
                  autoComplete="given-name"
                  placeholder="Jose"
                  mandatory={true}
                  label="Primer Nombre"
                  formErrors={formErrors?.firstname}
                  errorMessage={formErrors?.firstname?.message}
                  type="text"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="second_name"
                  autoComplete="additional-name"
                  placeholder="Julian"
                  label="Segundo Nombre"
                  formErrors={formErrors?.second_name}
                  errorMessage={formErrors?.second_name?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="lastname"
                  autoComplete="family-name"
                  placeholder="Marti"
                  mandatory={true}
                  label="Primer Apellido"
                  formErrors={formErrors?.lastname}
                  errorMessage={formErrors?.lastname?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="second_lastname"
                  autoComplete="family-name"
                  placeholder="Perez"
                  label="Segundo Apellido"
                  formErrors={formErrors?.second_lastname}
                  errorMessage={formErrors?.second_lastname?.message}
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
                  formErrors={formErrors?.civil_status}
                  errorMessage={formErrors?.civil_status?.message}
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
                  formErrors={formErrors?.genre}
                  errorMessage={formErrors?.genre?.message}
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="email"
                  autoComplete="email"
                  placeholder="ejemplo@prueba.com"
                  label="Correo Electronico"
                  formErrors={formErrors?.email}
                  errorMessage={formErrors?.email?.message}
                  type="email"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <CustomInput
                  htmlFor="ssn"
                  autoComplete="ssn"
                  placeholder="123-45-6789"
                  label="Numero de Seguro Social"
                  formErrors={formErrors?.ssn}
                  errorMessage={formErrors?.ssn?.message}
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
                  formErrors={formErrors?.phone}
                  errorMessage={formErrors?.phone?.message}
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
                  formErrors={formErrors?.birthdate}
                  errorMessage={formErrors?.birthdate?.message}
                />
              </div>
              {/* Age auto calc after birth date, READ-ONLY */}
              <div className="col-span-6 sm:col-span-4">
                <CustomInput
                  htmlFor="age"
                  autoComplete="age"
                  placeholder="Edad"
                  label="Edad"
                  formErrors={formErrors?.age}
                  errorMessage={formErrors?.age?.message}
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
                  formErrors={formErrors?.street_address}
                  errorMessage={formErrors?.street_address?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <CustomInput
                  htmlFor="city"
                  autoComplete="address-level2"
                  placeholder="Ciudad"
                  label="Ciudad"
                  formErrors={formErrors?.city}
                  errorMessage={formErrors?.city?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <CustomInput
                  htmlFor="state"
                  autoComplete="address-level1"
                  placeholder="Estado"
                  label="Estado / Provincia"
                  formErrors={formErrors?.state}
                  errorMessage={formErrors?.state?.message}
                  type="text"
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <CustomInput
                  htmlFor="postal_code"
                  autoComplete="postal-code"
                  placeholder="ZIP / Codigo Postal"
                  label="Codigo Postal"
                  formErrors={formErrors?.postal_code}
                  errorMessage={formErrors?.postal_code?.message}
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
