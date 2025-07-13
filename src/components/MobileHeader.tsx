interface MobileHeaderProps {
  appName: string;
  pageName: string;
  isMenuOpen: boolean;
  onMenuToggle: (isOpen: boolean) => void;
}

export const MobileHeader = ({
  appName,
  pageName,
  isMenuOpen,
  onMenuToggle,
}: MobileHeaderProps) => {
  const handleToggle = () => {
    const newState = !isMenuOpen;
    onMenuToggle(newState);
  };

  return (
    <>
    <div
      className="md:hidden w-full h-[72px] bg-neutral-gray-300 flex items-center justify-between px-4 bg-cover"
      style={{
        backgroundImage:
          "url('/src/assets/suggestions/mobile/background-header.png')",
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-[15px] leading-[22px] font-bold text-neutral-white">
          {appName}
        </h1>
        <p className="text-[13px] leading-[19px] font-medium text-neutral-gray-200">
          {pageName}
        </p>
      </div>

      <button
        onClick={handleToggle}
        className="p-2"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <img
          src={
            isMenuOpen
              ? "/src/assets/shared/mobile/icon-close.svg"
              : "/src/assets/shared/mobile/icon-hamburger.svg"
          }
          alt={isMenuOpen ? "Close" : "Menu"}
          className="w-5 h-4"
        />
      </button>
    </div>
    </>
  );
};
