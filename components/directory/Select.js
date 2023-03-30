import PropTypes from "prop-types";
/* eslint-disable react/display-name */
import React from "react";
const errorClass =
  "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-red-900 ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6";
const okClass =
  "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6";
export const Select = React.forwardRef(
  (
    { errors, htmlFor, errorMessage, options, onChange, onBlur, name, label },

    ref
  ) => (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <select
        className={errors[name]?.type === "required" ? errorClass : okClass}
        name={name}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((elem) => {
          const { value, id } = elem;
          return (
            <option key={id} value={value}>
              {elem.value}
            </option>
          );
        })}
      </select>
      {errors[name]?.type === "required" && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </>
  )
);

Select.propTypes = {
  errors: PropTypes.shape({}),
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};
