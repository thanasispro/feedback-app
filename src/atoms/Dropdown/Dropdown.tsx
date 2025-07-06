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
    <div className="relative w-full max-w-sm">
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
        <span className="text-primary-blue text-base">
          <svg
            className="w-2 h-1 text-primary-blue"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
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
