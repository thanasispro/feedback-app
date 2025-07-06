export default {
  title: 'Design System/Colors',
};

const colorGroups: Record<string, string[]> = {
  Primary: ['--color-primary-purple', '--color-primary-blue'],
  Neutral: [
    '--color-white',
    '--color-gray-100',
    '--color-gray-200',
    '--color-gray-300',
    '--color-gray-400',
    '--color-gray-500',
  ],
  Accent: ['--color-accent-orange', '--color-accent-lightblue'],
};

export const ColorPalette = () => (
  <div className="space-y-10 p-6">
    {Object.entries(colorGroups).map(([group, colors]) => (
      <div key={group}>
        <h2 className="text-xl font-semibold mb-4">{group}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {colors.map((cssVar) => (
            <div
              key={cssVar}
              className="flex flex-col items-center"
            >
              <div
                className="w-20 h-20 rounded shadow"
                style={{ backgroundColor: `var(${cssVar})` }}
              />
              <div
                className="text-sm text-center mt-2 leading-tight min-h-[2.5rem] flex items-center justify-center px-1"
              >
                {cssVar.replace('--color-', '')}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
