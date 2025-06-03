import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'ghost';
type ButtonSize = 'default' | 'large';
type ButtonColor = 'purple' | 'blue' | 'orange' | 'gray';

const colorMap: Record<ButtonColor, { base: string }> = {
  purple: { base: 'var(--color-primary-purple)' },
  blue: { base: 'var(--color-primary-blue)' },
  orange: { base: 'var(--color-accent-orange)' },
  gray: { base: 'var(--color-neutral-gray-300)' },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
}

export const Button = ({
  text,
  icon,
  variant = 'primary',
  size = 'default',
  color = 'purple',
  className,
  ...props
}: ButtonProps) => {
  const isGhost = variant === 'ghost';
  const base = colorMap[color].base;

  const baseStyles =
    'inline-flex items-center justify-center font-bold tracking-[-0.2px] transition-all duration-150 rounded-[10px] cursor-pointer';

  const sizeStyles =
    size === 'large'
      ? 'w-[158px] h-[53px] text-[14px] leading-[20px]'
      : 'w-[158px] h-[44px] text-[14px] leading-[20px]';

  const primaryStyles =
    'hover:opacity-80 hover:text-[#F2F4FE] text-white';

  const ghostStyles =
    'bg-transparent hover:underline';

  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles,
        isGhost ? ghostStyles : primaryStyles,
        className
      )}
      style={
        isGhost
          ? { color: base }
          : { backgroundColor: base, color: 'white' }
      }
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
        <span>{text}</span>
      </div>
    </button>
  );
};
