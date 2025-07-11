import React from "react";
import clsx from "clsx";

interface TextFieldProps {
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  isActive?: boolean;
}

export const TextField = ({
  value,
  onChange,
  placeholder,
  error,
  isActive,
  name = "",
}: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
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
