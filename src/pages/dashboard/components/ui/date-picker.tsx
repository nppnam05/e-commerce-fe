interface SimpleDatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export const SimpleDatePicker = ({
  value,
  onChange,
}: SimpleDatePickerProps) => {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none"
    />
  );
};
