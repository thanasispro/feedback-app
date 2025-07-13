import { FilterSection } from "./FilterSection";
import { SuggestionsInfo } from "./SuggestionsInfo";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  suggestionsCounts: {
    planned: number;
    inProgress: number;
    live: number;
  };
}

export const MobileSidebar = ({ 
  isOpen, 
  onClose, 
  selectedFilters, 
  onFilterChange,
  suggestionsCounts 
}: MobileSidebarProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="md:hidden fixed top-[72px] left-0 w-[calc(100vw-271px)] h-[calc(100vh-72px)] bg-transparent z-40"
        onClick={onClose}
      />
      
      <div className="md:hidden fixed top-[72px] right-0 w-[271px] h-[calc(100vh-72px)] bg-neutral-gray-100 z-50 p-6 overflow-y-auto">
        <div className="space-y-6">
          <FilterSection 
            selectedFilters={selectedFilters}
            onFilterChange={onFilterChange}
          />
          
          <SuggestionsInfo 
            plannedCount={suggestionsCounts.planned}
            inProgressCount={suggestionsCounts.inProgress}
            liveCount={suggestionsCounts.live}
          />
        </div>
      </div>
    </>
  );
};