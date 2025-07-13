interface AppInfoCardProps {
  appName: string;
  pageName: string;
}

export const AppInfoCard = ({ appName, pageName }: AppInfoCardProps) => {
  return (
    <div 
      className="lg:h-[137px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-[10px] flex items-end p-6 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/src/assets/suggestions/tablet/background-header.png')",
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-[20px] leading-[29px] font-bold text-neutral-white">
          {appName}
        </h1>
        <p className="text-[15px] leading-[22px] font-medium text-neutral-gray-200">
          {pageName}
        </p>
      </div>
    </div>
  );
};