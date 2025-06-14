import { useState } from 'react';
import { Dropdown } from './Dropdown';

export default { title: 'Design System/Dropdown' };

const options = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];

export const Default = () => {
  const [val, setVal] = useState('Feature');
  return <Dropdown value={val} onSelect={setVal} options={options} />;
};
