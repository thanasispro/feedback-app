import { useState } from "react";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import iconArrowUp from "@/assets/shared/icon-arrow-up.svg";
import iconArrowDown from "@/assets/shared/icon-arrow-down.svg";

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
        <img 
          src={isOpen ? iconArrowUp : iconArrowDown} 
          alt={isOpen ? "Collapse" : "Expand"} 
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