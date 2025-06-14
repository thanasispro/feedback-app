export default {
  title: 'Design System/Typography',
};

const typographySamples = [
  {
    label: 'H1 - Jost Bold | 24px / 35px / -0.33',
    className: 'text-[24px] leading-[35px] font-bold tracking-[-0.33px]',
    sample: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  },
  {
    label: 'Body 1 - Jost Regular | 16px / 23px',
    className: 'text-[16px] leading-[23px] font-normal',
    sample: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
Phasellus hendrerit. Pellentesque aliquet nibh nec urna. 
In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. 
Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, 
eget blandit nunc tortor eu nibh. Nullam mollis.`,
  },
  {
    label: 'H2 - Jost Bold | 20px / 29px / -0.25',
    className: 'text-[20px] leading-[29px] font-bold tracking-[-0.25px]',
    sample: 'Vestibulum volutpat lacus a ultrices sagittis.',
  },
  {
    label: 'Body 2 - Jost Regular | 15px / 22px',
    className: 'text-[15px] leading-[22px] font-normal',
    sample: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
  },
  {
    label: 'H3 - Jost Bold | 18px / 26px / -0.25',
    className: 'text-[18px] leading-[26px] font-bold tracking-[-0.25px]',
    sample: `Sed egestas, ante et vulputate volutpat, eros pede semper est, 
vitae luctus metus libero eu augue. Morbi purus libero, 
faucibus adipiscing, commodo quis, gravida id, est.`,
  },
  {
    label: 'H4 - Jost Bold | 14px / 20px / -0.2',
    className: 'text-[14px] leading-[20px] font-bold tracking-[-0.2px]',
    sample: 'Ut scelerisque hendrerit tellus. Integer sagittis.',
  },
  {
    label: 'Body 3 - Jost Semibold | 13px / 19px',
    className: 'text-[13px] leading-[19px] font-semibold',
    sample: `Sed egestas, ante et vulputate volutpat, eros pede semper est, 
vitae luctus metus libero eu augue. Morbi purus libero, 
faucibus adipiscing, commodo quis, gravida id, est.`,
  },
];

export const TypographySamples = () => (
  <div className="flex flex-col gap-10 p-6 max-w-3xl">
    {typographySamples.map(({ label, className, sample }) => (
      <div key={label}>
        <div className="text-xs text-gray-500 mb-2">{label}</div>
        <div className={className}>{sample}</div>
      </div>
    ))}
  </div>
);
