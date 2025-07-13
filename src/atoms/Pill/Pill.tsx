import { useEffect, useState } from 'react';
import clsx from 'clsx';
import upArrowIcon from '@/assets/shared/icon-arrow-up.svg';


interface PillProps {
  label: string | number;
  isActive?: boolean;
  onClick: () => void;
  variant?: 'default' | 'upvote';
  className?: string;
}

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
        'flex items-center justify-center gap-2',
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
        <span
          className={clsx(
            'transition-colors duration-150',
            animate && 'animate-scaleUp'
          )}
          style={{ color: iconColor }}
        >
          <img 
            src={upArrowIcon}
            alt="Upvote" 
            className="w-4 h-4"
          />
        </span>
      )}
      <span>{label}</span>
    </button>
  );
};