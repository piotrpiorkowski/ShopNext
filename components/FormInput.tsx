import React, { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
}

export const FormInput = ({ name, label }: FormInputProps) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];
  return (
    <>
      <label className="mb-1 block text-sm text-gray-600" form="first_name">
        {label}
      </label>

      <input
        className="w-full rounded-lg border-gray-200 p-2.5 text-sm shadow-sm"
        type="text"
        {...register(name)}
      />
      {error && (
        <span className="text-red-500 text-sm ml-1">
          {error.message as ReactNode}
        </span>
      )}
    </>
  );
};

export const FormInputSelect = ({ name, label }: FormInputProps) => {
  const { register, formState } = useFormContext();
  const error = formState.errors[name];
  return (
    <>
      <label className="mb-1 block text-sm text-gray-600" form="first_name">
        {label}
      </label>

      <select
        className="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm
        focus:z-10"
        autoComplete="country-name"
        {...register(name)}
      >
        <option>Poland</option>
      </select>
      {error && (
        <span className="text-red-500 text-sm ml-1">
          {error.message as ReactNode}
        </span>
      )}
    </>
  );
};
