import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  defaultLabel: string;
  options: SelectOption[];
}

export const SelectInput = ({
  defaultLabel,
  options,
  className = "",
  ...props
}: SelectInputProps) => {
  return (
    <select
      className={`cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none ${className}`}
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
