import { Button } from './Button';
import { FiArrowRight } from 'react-icons/fi';

export default {
  title: 'Design System/Button',
  component: Button,
};

export const Default = () => (
  <Button text="Primary Purple" color="purple" icon={<FiArrowRight />} />
);

export const Ghost = () => (
  <Button text="Ghost Purple" variant="ghost" color="purple" icon={<FiArrowRight />} />
);

export const Large = () => (
  <Button text="Primary Large" size="large" color="purple" icon={<FiArrowRight />} />
);

export const AllVariants = () => {
  const colors = ['purple', 'blue', 'orange', 'gray'] as const;
  const sizes = ['default', 'large'] as const;
  const variants = ['primary', 'ghost'] as const;

  return (
    <div className="flex flex-col gap-10 p-6">
      {variants.map((variant) => (
        <div key={variant}>
          <h3 className="text-base font-semibold mb-3 capitalize">{variant} buttons</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {colors.map((color) =>
              sizes.map((size) => {
                if (variant === 'ghost' && size === 'large') return null;

                return (
                  <Button
                    key={`${variant}-${color}-${size}`}
                    text={`${color} ${size}`}
                    variant={variant}
                    color={color}
                    size={size}
                    icon={<FiArrowRight />}
                  />
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
