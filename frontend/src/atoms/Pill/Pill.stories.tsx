import { useState } from 'react';
import { Pill } from './Pill';

export default {
  title: 'Design System/Pill',
  component: Pill,
};

export const WithNumber = () => {
  const [active, setActive] = useState(false);

  return (
    <Pill
      label={12}
      isActive={active}
      onClick={() => setActive(!active)}
    />
  );
};

export const PillSetWithNumbers = () => {
  const [selected, setSelected] = useState<number | null>(2);
  const numbers = [1, 2, 3, 4];

  return (
    <div className="flex gap-4 flex-wrap p-6">
      {numbers.map((num) => (
        <Pill
          key={num}
          label={num}
          isActive={selected === num}
          onClick={() => setSelected(num)}
        />
      ))}
    </div>
  );
};

export const SimplePill = () => {
  const [active, setActive] = useState(false);

  return (
    <Pill
      label="Feature"
      isActive={active}
      onClick={() => setActive(!active)}
      icon={null}
    />
  );
};
