import { useState } from 'react';
import { TextField } from './TextField';

export default { title: 'Design System/TextField' };

export const Default = () => {
  const [val, setVal] = useState('');
  return <TextField value={val} onChange={(e) => setVal(e.target.value)} placeholder="Lorem ipsum dolor" />;
};

export const Filled = () => <TextField value="Lorem ipsum dolor" onChange={() => {}} />;

export const Active = () => <TextField value="Lorem ipsum dolor" onChange={() => {}} isActive />;

export const Error = () => <TextField value="" onChange={() => {}} error="Can’t be empty" />;
