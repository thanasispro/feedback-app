import { useState } from "react";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

interface SortDropdownProps {
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}

export const SortDropdown = ({ value, options, onSelect }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-sm">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center rounded-md px-4 py-3 bg-neutral-gray-300"
      >
        <span className="text-[16px] leading-[23px] font-normal text-neutral-gray-400">
          Sort by:{" "}
          <span className="text-[16px] leading-[23px] font-bold text-neutral-gray-200">
            {value}
          </span>
        </span>
        <svg
          className="w-[10px] h-[6px] text-neutral-gray-400"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={isOpen ? "M1 5L5 1L9 5" : "M1 1L5 5L9 1"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
