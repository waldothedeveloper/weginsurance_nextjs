import { ActiveUser, Gender, InsuranceCompany } from "@/interfaces/index";
/* eslint-disable no-unused-vars */
import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister, UseFormSetValue } from "react-hook-form";
/* eslint-disable react/display-name */
import React, { FocusEvent, forwardRef } from "react";
const errorClass =
  "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-red-900 ring-1 ring-inset ring-red-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6";
const okClass =
  "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6";


interface SelectProps {
  errors: FieldErrors<FieldValues>;
  htmlFor: string,
  options: InsuranceCompany[] | Gender[] | ActiveUser[],
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  onBlur: React.FocusEventHandler<HTMLSelectElement>;
  name: string;
  label: string;
  errorMessage?: string
}

export type Ref = HTMLSelectElement;

export const Select = forwardRef<Ref, SelectProps>(
  (
    { errors, htmlFor, errorMessage, options, onChange, onBlur, name, label },

    ref
  ) => (
    <>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium leading-6 text-slate-900"
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
        {Array.isArray(options) &&
          options?.map((elem) => {
            if ("value" in elem) {
              const { value, id } = elem;
              return (
                <option key={id} value={value}>
                  {elem.value}
                </option>
              );
            } else {
              return (
                <option key={elem.id} value={elem.name}>
                  {elem.name}
                </option>
              );
            }

          })}
      </select>
      {errors[name]?.type === "required" && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </>
  )
);


