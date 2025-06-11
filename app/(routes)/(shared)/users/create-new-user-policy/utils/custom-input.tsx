import { FieldErrors, useFormContext } from "react-hook-form";

import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import type { InputHTMLAttributes } from "react";

interface CustomInputProps {
  htmlFor: keyof UserPolicyInputs;
  autoComplete?: string;
  placeholder?: string;
  mandatory?: boolean;
  label: string;
  formErrors?: FieldErrors<Partial<UserPolicyInputs>>;
  errorMessage?: string;
  type: string;
  readOnly?: boolean;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  expectsNumber?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  htmlFor,
  autoComplete,
  placeholder,
  mandatory = false,
  label,
  formErrors,
  errorMessage,
  type = "text",
  readOnly = false,
  inputMode = "text",
  pattern,
  expectsNumber = false,
}) => {
  const { register } = useFormContext<Partial<UserPolicyInputs>>();
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
        {mandatory && <span className="text-red-500 ">{` *`}</span>}
      </label>
      <div className="mt-2 grid grid-cols-1">
        <input
          inputMode={inputMode}
          readOnly={readOnly}
          id={htmlFor}
          {...register(htmlFor, { valueAsNumber: expectsNumber })}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          pattern={pattern}
          className={
            readOnly
              ? "block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-100 sm:text-sm/6"
              : formErrors
                ? "col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
                : "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6"
          }
        />
        {formErrors && (
          <ExclamationCircleIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
          />
        )}
      </div>
      {formErrors && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </>
  );
};
