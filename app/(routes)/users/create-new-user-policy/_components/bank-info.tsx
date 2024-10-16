import { UseFormRegister } from "react-hook-form";

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
  register,
}: {
  register: UseFormRegister<UserPolicyInputs>;
}) => {
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
                    <label
                      htmlFor="bank_account"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Cuenta de Banco
                    </label>
                    <input
                      {...register("bank_account")}
                      placeholder="Chase"
                      type="text"
                      name="bank_account"
                      id="bank_account"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="routing_number"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Numero de Ruta
                    </label>
                    <input
                      {...register("routing_number", {
                        valueAsNumber: true,
                      })}
                      placeholder="3530111333300000"
                      type="number"
                      name="routing_number"
                      id="routing_number"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {/* Account number */}
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="bank_account_number"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Numero de Cuenta
                    </label>
                    <input
                      {...register("bank_account_number", {
                        valueAsNumber: true,
                      })}
                      placeholder="091000019"
                      type="number"
                      name="bank_account_number"
                      id="bank_account_number"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="bank_account_number_confirmation"
                      className="block text-sm font-medium text-gray-800"
                    >
                      Numero de Cuenta{" "}
                      <span className="text-gray-400"> (debe coincidir)</span>
                    </label>
                    <input
                      {...register("bank_account_number_confirmation", {
                        valueAsNumber: true,
                      })}
                      placeholder="091000019"
                      type="number"
                      name="bank_account_number_confirmation"
                      id="bank_account_number_confirmation"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                    <div className="mt-1 bg-white rounded-md shadow-sm -space-y-px">
                      <div>
                        <label htmlFor="card_number" className="sr-only">
                          Card number
                        </label>
                        <input
                          {...register("card_number")}
                          name="card_number"
                          type="text"
                          id="card_number"
                          className="focus:ring-blue-500 focus:border-blue-500 relative block w-full rounded-none rounded-t-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
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
                          className="focus:ring-blue-500 focus:border-blue-500 relative block w-full bg-transparent focus:z-10 sm:text-sm border-gray-300"
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
                            {...register("card_expiration_date")}
                            type="text"
                            name="card_expiration_date"
                            id="card_expiration_date"
                            className="focus:ring-blue-500 focus:border-blue-500 relative block w-full rounded-none rounded-bl-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                            placeholder="MM / YY"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <label htmlFor="card_cvv" className="sr-only">
                            CVC
                          </label>
                          <input
                            {...register("card_cvv", {
                              valueAsNumber: true,
                            })}
                            type="number"
                            id="card_cvv"
                            className="focus:ring-blue-500 focus:border-blue-500 relative block w-full rounded-none rounded-br-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
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
