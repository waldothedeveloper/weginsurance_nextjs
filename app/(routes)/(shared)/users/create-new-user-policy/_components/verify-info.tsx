import { SavingModal } from "./saving-modal";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber";
import { useCreateUserPolicy } from "../hooks/useCreateUserPolicy";
export const VerifyInfo = () => {
  const {
    steps,
    submittingForm,
    setSubmittingForm,
    success,
    setSuccess,
    submissionError,
    submissionErrorMessage,
    setSubmissionError,
  } = useCreateUserPolicy();

  return (
    <>
      <SavingModal
        open={submittingForm}
        setOpen={setSubmittingForm}
        success={success}
        setSuccess={setSuccess}
        submissionError={submissionError}
        setSubmissionError={setSubmissionError}
        submissionErrorMessage={submissionErrorMessage}
      />
      {steps.map((step) => (
        <section
          className="mt-12"
          key={step.id}
          aria-labelledby="applicant-information-title"
        >
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2
                id="applicant-information-title"
                className="text-lg/6 font-medium text-gray-900"
              >
                {step.tag.charAt(0).toUpperCase() + step.tag.slice(1)}
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {step.description}
              </p>
            </div>
            {Object.keys(step.data).length > 0 ? (
              <div className="px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  {/* Divider start */}
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500">
                          Secion Personal
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Divider end */}
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Acepta Seguro Medico?
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.accepts_insurance}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Correo Electronico
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.email}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Nombre
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.firstname} {step.data.second_name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Apellidos
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.lastname} {step.data.second_lastname}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Telefono
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatPhoneNumberToNationalUSAformat(step.data.phone)}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Estado Civil
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.civil_status}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Genero
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.genre}
                    </dd>
                  </div>
                  {/* TODO: WE NEED CONSISTENT DATE FORMATS MAYBE USE THE LIBRARY DATE-FNS  */}
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Fecha de Nacimiento
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.birthdate
                        ? new Date(step.data.birthdate).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "N/A"}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Numero de Seguro Social
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.ssn}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Edad</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.age}
                    </dd>
                  </div>
                  {/* Divider start */}
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500">
                          Estado Legal
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Divider end */}
                  {/* Legal Status */}
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Estado Legal
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.legal_status}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Notas del Estado Legal
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.legal_status_notes}
                    </dd>
                  </div>
                  {/* Divider start */}
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500">
                          Direcciones
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Divider end */}
                  {/* Address */}
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Direccion de Calle
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.street_address}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Ciudad
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.city}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Estado
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.state}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Codigo Postal
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.postal_code}
                    </dd>
                  </div>
                  {/* Divider start */}
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500">
                          Secion de Economia
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Divider end */}
                  {/* BANK INFO */}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Banco</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.bank_account}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Numero de Cuenta de Banco
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.routing_number}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Confirmacion del Numero de Cuenta de Banco
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.bank_account_number_confirmation}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Tipo de Tarjeta
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.payment_method}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Numero de Tarjeta
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.card_number}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Nombre del Titular de la Tarjeta
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.card_holder_fullname}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Fecha de Expiracion de la Tarjeta
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.card_expiration_date}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">CVV</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.card_cvv}
                    </dd>
                  </div>
                  {/* Divider start */}
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500">
                          Secion de Trabajo
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Divider end */}
                  {/* Work Related Info */}
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Tipo de Trabajo
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.work_type}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Nombre de la Compania
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.company_name}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Salario
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.wages}
                    </dd>
                  </div>
                  {/* Divider start */}
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500">
                          Secion de Seguros
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Divider end */}
                  {/* Insurance Related Info */}
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Prima</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.prima}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Numero de Poliza de Seguro
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.insurance_policy_number}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Fecha de Inicio de la Poliza
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.policy_start_date}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Tipo de Plan de Seguro
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.insurance_plan_type}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Compania de Seguro
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.insurance_company}
                    </dd>
                  </div>
                  {/* Divider start */}
                  <div className="sm:col-span-2">
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center"
                      >
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-2 text-sm text-gray-500">
                          Secion de Notas
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Divider end */}
                  {/* Notes */}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Notas</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {step.data.notes}
                    </dd>
                  </div>
                </dl>
              </div>
            ) : (
              <p className="px-4 py-6 sm:px-6 text-gray-400">
                No hay informacion disponible. <br />
                Verifique que usted llenó el formulario correctamente para este
                usuario, conyuge o familiar relativo.
              </p>
            )}
          </div>
        </section>
      ))}
    </>
  );
};
