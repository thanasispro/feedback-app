import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import iconArrowDown  from "@/assets/shared/icon-arrow-down.svg";

interface DropdownProps {
  value: string;
  options: string[];
  onSelect: (val: string) => void;
  label?: string;
  description?: string;
  required?: boolean;
  error?: string;
}

export const Dropdown = ({
  value,
  options,
  onSelect,
  label,
  description,
  required = false,
  error,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div className="relative w-full" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={clsx(
            "w-full flex justify-between items-center rounded-md px-4 py-3 text-sm",
            "bg-neutral-gray-100 text-neutral-gray-300 border transition",
            error
              ? "border-red-500"
              : isOpen
                ? "border-primary-blue"
                : "border-transparent hover:border-primary-blue"
          )}
        >
          <span>{value}</span>
          <img src={iconArrowDown} alt="Expand" className="w-[10px] h-[6px]" />
        </button>

        {isOpen && (
          <DropdownMenu
            value={value}
            options={options}
            onSelect={(selected) => {
              onSelect(selected);
              setIsOpen(false);
            }}
          />
        )}
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};
