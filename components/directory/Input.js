import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

const errorClass =
  "mt-1 block w-full rounded-md border-0 text-red-900 ring-1 ring-inset ring-red-400 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6";

const okClass =
  "mt-1 focus:ring-cyan-500 focus:border-cyan-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md";

export const Input = ({
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
}) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...register(name, { required: isRequired })}
          placeholder={placeholder}
          type={type}
          name={name}
          autoComplete={autoComplete}
          className={errors[name]?.type === "required" ? errorClass : okClass}
          {...rest}
        />
        {errors[name]?.type === "required" && (
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
    </>
  );
};
