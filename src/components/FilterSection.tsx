import { Pill } from "../atoms/Pill/Pill";

interface FilterSectionProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const filterOptions = [
  "All",
  "UI",
  "UX", 
  "Enhancement",
  "Bug",
  "Feature"
];

export const FilterSection = ({ selectedFilters, onFilterChange }: FilterSectionProps) => {
  const handleFilterClick = (filter: string) => {
    if (filter === "All") {
      onFilterChange(["All"]);
      return;
    }

    let newFilters;
    if (selectedFilters.includes(filter)) {
      newFilters = selectedFilters.filter(f => f !== filter);
      if (newFilters.length === 0) {
        newFilters = ["All"];
      }
    } else {
      newFilters = selectedFilters.filter(f => f !== "All");
      newFilters.push(filter);
    }
    
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-neutral-white rounded-[10px] p-6">
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((filter) => (
          <Pill
            key={filter}
            label={filter}
            isActive={selectedFilters.includes(filter)}
            onClick={() => handleFilterClick(filter)}
          />
        ))}
      </div>
    </div>
  );
};