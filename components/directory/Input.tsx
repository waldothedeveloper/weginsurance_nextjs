import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { formatPhoneNumberToNationalUSAformat } from "@/utils/formatPhoneNumber"

const errorClass =
  "mt-1 block w-full rounded-md border-0 text-red-900 ring-1 ring-inset ring-red-400 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6";

const okClass =
  "mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md";
type InputProps = {
  setValue: UseFormSetValue<FieldValues>,
  errorMessage: string,
  register: UseFormRegister<FieldValues>,
  name: string,
  placeholder?: string,
  isRequired: boolean,
  autoComplete: string,
  type: string,
  errors: FieldErrors<FieldValues>,
  label: string,
  htmlFor: string,
}

export const Input = ({
  setValue,
  errorMessage,
  register,
  name,
  placeholder,
  isRequired,
  autoComplete,
  type,
  errors,
  label,
  htmlFor,
  ...rest
}: InputProps) => {

  return (

    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative">
        {name === "phone" ? (<input
          {...register("phone", {
            pattern: /^(\+?1-?)?(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)?\d{4}$/g,
            required: isRequired,
            onChange: (e) => { return setValue("phone", formatPhoneNumberToNationalUSAformat(e.target.value), { shouldValidate: true }) },
          })}
          placeholder={placeholder}
          type={type}
          name={name}
          autoComplete={autoComplete}
          className={errors[name]?.type === "required" || errors[name]?.type === 'pattern' ? errorClass : okClass}
          {...rest}
        />) : (<input
          {...register(name, { required: isRequired })}
          placeholder={placeholder}
          type={type}
          name={name}
          autoComplete={autoComplete}
          className={errors[name]?.type === "required" ? errorClass : okClass}
          {...rest}
        />)}

        {errors[name]?.type === "required" && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
        {errors[name]?.type === "pattern" && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errors[name]?.type === "required" && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
      {errors[name]?.type === "pattern" && (
        <p className="mt-2 text-sm text-red-600">El numero de telefono no es correcto</p>
      )}
    </>
  );
};