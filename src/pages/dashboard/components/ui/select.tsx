import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select = ({ label, options, className = "", ...props }: SelectProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        className={`w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors ${className}`}
        {...props}
      >
        <option value="">Chọn {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};