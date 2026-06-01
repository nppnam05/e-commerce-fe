interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  colors: string[];
}



export const ColorPicker = ({ label, value, onChange, colors }: ColorPickerProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            className={`w-9 h-9 rounded-xl border-2 transition-all hover:scale-110 ${
              value === color ? 'border-gray-900 scale-110' : 'border-transparent'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
      {value && (
        <div className="mt-2 flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg border border-gray-200" style={{ backgroundColor: value }} />
          <span className="text-sm text-gray-500">{value}</span>
        </div>
      )}
    </div>
  );
};