import { useState } from "react";
import clsx from "clsx";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

interface DropdownProps {
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}

export const Dropdown = ({ value, options, onSelect }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          "w-full flex justify-between items-center rounded-md px-4 py-3 text-sm",
          "bg-neutral-gray-100 text-neutral-gray-300 border transition",
          isOpen
            ? "border-primary-blue"
            : "border-transparent hover:border-primary-blue"
        )}
      >
        <span>{value}</span>
        <img 
          src="/src/assets/shared/icon-arrow-down.svg" 
          alt="Expand" 
          className="w-[10px] h-[6px]" 
        />
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
  );
};