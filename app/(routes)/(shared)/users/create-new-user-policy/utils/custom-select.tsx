import { Controller, useFormContext } from "react-hook-form";
import type { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
type CustomSelectProps = {
  htmlFor: keyof UserPolicyInputs;
  options: { label: string }[];
  mandatory?: boolean;
  label: string;
  formErrors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  errorMessage?: string;
  readOnly?: boolean;
};

export const CustomSelect: React.FC<CustomSelectProps> = ({
  htmlFor,
  options,
  mandatory = false,
  label,
  formErrors,
  errorMessage,
  readOnly = false,
}) => {
  const { control } = useFormContext<Partial<UserPolicyInputs>>();
  return (
    <Controller
      control={control}
      rules={{ required: mandatory }}
      name={htmlFor}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <>
          <label
            htmlFor={htmlFor}
            className="block text-sm/6 font-medium text-gray-900"
          >
            {label}
            {mandatory && <span className="text-red-500 ">{` *`}</span>}
          </label>
          <div className="mt-2 grid grid-cols-1">
            <select
              id={htmlFor}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              value={value ?? "Seleccione una opcion"}
              className={
                readOnly
                  ? "block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-100 sm:text-sm/6"
                  : formErrors
                    ? "mt-1 block w-full py-2 px-3 border border-red-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    : "mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              }
            >
              {options.map((option) => (
                <option key={option.label}>{option.label}</option>
              ))}
            </select>
          </div>
          {formErrors && (
            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
          )}
        </>
      )}
    />
  );
};
