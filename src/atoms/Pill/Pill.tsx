import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface PillProps {
  label: string | number;
  isActive?: boolean;
  onClick: () => void;
  variant?: 'default' | 'upvote';
  className?: string;
}

interface UpArrowIconProps {
  color: string;
  className?: string;
}

export const UpArrowIcon = ({ color, className }: UpArrowIconProps) => (
  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M1 6l4-4 4 4" stroke={color} strokeWidth="2" fill="none" fillRule="evenodd" />
  </svg>
);

export const Pill: React.FC<PillProps> = ({
  label,
  isActive = false,
  onClick,
  variant = 'default',
  className,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isActive) {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [isActive]);

  const baseColor = 'var(--color-gray-100)';
  const hoverColor = 'var(--color-neutral-gray-400)';
  const activeColor = 'var(--color-primary-blue)';
  const textColor = isActive ? 'white' : 'var(--color-neutral-gray-300)';
  const iconColor = isActive ? 'white' : 'var(--color-primary-blue)';

  return (
    <button
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center gap-1',
        variant === 'upvote' && 'md:flex-col',
        'rounded-[10px] px-4 py-2 text-[13px] leading-[19px] font-semibold cursor-pointer transition-all duration-150',
        className
      )}
      style={{
        backgroundColor: isActive ? activeColor : baseColor,
        color: textColor,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = hoverColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.backgroundColor = baseColor;
        }
      }}
    >
      {variant === 'upvote' && (
       <UpArrowIcon
          color={iconColor}
          className={clsx(
            'transition-colors duration-150',
            animate && 'animate-scaleUp'
          )}
        />
      )}
      <span>{label}</span>
    </button>
  );
};