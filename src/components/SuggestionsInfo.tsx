interface SuggestionsInfoProps {
  plannedCount: number;
  inProgressCount: number;
  liveCount: number;
}

export const SuggestionsInfo = ({ 
  plannedCount, 
  inProgressCount, 
  liveCount 
}: SuggestionsInfoProps) => {
  return (
    <div className="bg-neutral-white rounded-lg p-6">
      <h3 className="text-[18px] leading-[26px] font-bold text-neutral-gray-300 mb-6">
        Roadmap
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span className="text-[16px] leading-[23px] font-normal text-neutral-gray-400">
              Planned
            </span>
          </div>
          <span className="text-[16px] leading-[23px] font-bold text-neutral-gray-400">
            {plannedCount}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-primary-purple"></div>
            <span className="text-[16px] leading-[23px] font-normal text-neutral-gray-400">
              In-Progress
            </span>
          </div>
          <span className="text-[16px] leading-[23px] font-bold text-neutral-gray-400">
            {inProgressCount}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-accent-lightblue"></div>
            <span className="text-[16px] leading-[23px] font-normal text-neutral-gray-400">
              Live
            </span>
          </div>
          <span className="text-[16px] leading-[23px] font-bold text-neutral-gray-400">
            {liveCount}
          </span>
        </div>
      </div>
    </div>
  );
};