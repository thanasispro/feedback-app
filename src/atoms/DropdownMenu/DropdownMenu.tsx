import clsx from "clsx";

interface DropdownMenuProps {
  value: string;
  options: string[];
  onSelect: (val: string) => void;
}

export const DropdownMenu = ({ value, options, onSelect }: DropdownMenuProps) => {
  return (
    <ul className="absolute z-10 mt-2 w-full rounded-md bg-neutral-white shadow-xl">
      {options.map((option, index) => {
        const isSelected = option === value;
        return (
          <li
            key={option}
            onClick={() => onSelect(option)}
            className={clsx(
              "flex justify-between items-center cursor-pointer px-4 py-3 text-sm",
              "text-neutral-gray-400 hover:text-primary-purple",
              "border-t border-neutral-gray-300",
              index === 0 && "border-t-0"
            )}
          >
            <span>{option}</span>
            {isSelected && (
              <img 
                src="/src/assets/shared/icon-check.svg" 
                alt="Selected" 
                className="w-4 h-4" 
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};