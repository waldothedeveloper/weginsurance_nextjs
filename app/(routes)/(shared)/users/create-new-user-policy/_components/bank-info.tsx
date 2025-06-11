import { FieldErrors, useFormContext } from "react-hook-form";

import { CustomInput } from "../utils/custom-input";

const paymentMethod = [
  {
    value: "Credito",
    register: "payment_method",
  },
  {
    value: "Debito",
    register: "payment_method",
  },
];

//
export const BankInfo = ({
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
              Informacion bancaria
            </h3>
            <p className="mt-1 text-sm text-gray-800">
              Aqui debe llenar la informacion bancaria relacionada con el
              cliente.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="px-4 py-5 bg-gray-50 sm:p-6 rounded-md shadow-lg">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Metodos de pago
              </h2>

              {/* BANK INFORMATION */}
              <div className="mt-4">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <CustomInput
                      htmlFor="bank_account"
                      placeholder="Chase"
                      mandatory={false}
                      label="Cuenta de Banco"
                      formErrors={formErrors?.bank_account}
                      errorMessage={formErrors?.bank_account?.message}
                      type="text"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <CustomInput
                      htmlFor="routing_number"
                      placeholder="3530111333300000"
                      mandatory={false}
                      label="Numero de Ruta"
                      formErrors={formErrors?.routing_number}
                      errorMessage={formErrors?.routing_number?.message}
                      type="number"
                      inputMode="numeric"
                      readOnly={false}
                    />
                  </div>
                  {/* Account number */}
                  <div className="col-span-6 sm:col-span-3">
                    <CustomInput
                      htmlFor="bank_account_number"
                      placeholder="091000019"
                      mandatory={false}
                      label="Numero de Cuenta"
                      formErrors={formErrors?.bank_account_number}
                      errorMessage={formErrors?.bank_account_number?.message}
                      type="number"
                      inputMode="numeric"
                      readOnly={false}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <CustomInput
                      htmlFor="bank_account_number_confirmation"
                      placeholder="091000019"
                      mandatory={false}
                      label="Numero de Cuenta (debe coincidir)"
                      formErrors={formErrors?.bank_account_number_confirmation}
                      errorMessage={
                        formErrors?.bank_account_number_confirmation?.message
                      }
                      type="number"
                      inputMode="numeric"
                      readOnly={false}
                    />
                  </div>
                </div>
              </div>
              {/* to select type of card */}
              <fieldset className="mt-12">
                <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {paymentMethod.map((input) => (
                    <div key={input.value}>
                      <input
                        {...register("payment_method")}
                        name="payment_method"
                        value={input.value}
                        id={`payment_method_${input.value}`}
                        type="radio"
                        aria-describedby={`${input.value}-description`}
                        className="size-4 text-blue-500 focus:ring-blue-500 ring-gray-300"
                      />
                      <label className="ml-2" htmlFor="payment_method">
                        {input.value}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              {/* credit/debit card details */}
              <div className="mt-6 grid grid-cols-6 gap-y-6 gap-x-4">
                <div className="col-span-6 sm:col-span-3">
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-800">
                      Detalles de la tarjeta
                    </legend>
                    <div className="mt-1 bg-white rounded-md shadow-xs -space-y-px">
                      <div>
                        <label htmlFor="card_number" className="sr-only">
                          Card number
                        </label>
                        <input
                          maxLength={16}
                          pattern="\d{16}"
                          autoComplete="cc-number"
                          {...register("card_number")}
                          name="card_number"
                          type="text"
                          inputMode="numeric"
                          id="card_number"
                          className="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                          placeholder="4242-4242-4242"
                        />
                      </div>
                      {/* titular de la tarjeta */}
                      <div>
                        <label
                          htmlFor="card_holder_fullname"
                          className="sr-only"
                        >
                          Cardholder full name
                        </label>
                        <input
                          {...register("card_holder_fullname")}
                          name="card_holder_fullname"
                          placeholder="William Gola"
                          type="text"
                          id="card_holder_fullname"
                          autoComplete="cc-name"
                          className="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                        />
                      </div>
                      {/* fecha de expiracion y cvc */}
                      <div className="flex -space-x-px">
                        <div className="w-1/2 flex-1 min-w-0">
                          <label
                            htmlFor="card_expiration_date"
                            className="sr-only"
                          >
                            Expiration date
                          </label>
                          <input
                            {...register("card_expiration_date", {
                              setValueAs: (value: string) =>
                                value.replace(/\s+/g, ""),
                            })}
                            type="text"
                            name="card_expiration_date"
                            id="card_expiration_date"
                            className="block w-full rounded-bl-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            placeholder="MM / YY"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <label htmlFor="card_cvv" className="sr-only">
                            CVC
                          </label>
                          <input
                            maxLength={4}
                            autoComplete="cc-csc"
                            {...register("card_cvv")}
                            type="number"
                            inputMode="numeric"
                            id="card_cvv"
                            className="block w-full rounded-br-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
                            placeholder="CVC"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
