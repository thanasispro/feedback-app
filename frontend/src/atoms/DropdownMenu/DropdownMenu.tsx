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
              <svg
                className="w-4 h-4 text-primary-purple"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </li>
        );
      })}
    </ul>
  );
};
