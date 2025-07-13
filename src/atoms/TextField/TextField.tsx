import React from "react";
import clsx from "clsx";

interface TextFieldProps {
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  isActive?: boolean;
  label?: string;
  description?: string;
  required?: boolean;
}

export const TextField = ({
  value,
  onChange,
  placeholder,
  error,
  isActive,
  name = "",
  label,
  description,
  required = false,
}: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-[14px] leading-[20px] font-bold text-neutral-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {description && (
        <p className="text-[14px] leading-[20px] text-neutral-gray-400 mb-2">
          {description}
        </p>
      )}
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "rounded-md px-4 py-3 text-sm outline-none transition",
          "bg-neutral-gray-100 text-neutral-gray-300",
          "placeholder:text-neutral-gray-400",
          error
            ? "border border-red-500"
            : isActive
            ? "border border-primary-blue"
            : "border border-transparent hover:border-primary-blue"
        )}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};