import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  defaultLabel: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export const SelectInput = ({
  defaultLabel,
  options,
  onChange,
  ...props
}: SelectInputProps) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className={`cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none`}
      {...props}
    >
      <option value="">{defaultLabel}</option>

      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
