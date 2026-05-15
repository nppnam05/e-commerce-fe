import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
}

export const Input = ({
  icon,
  label,
  className = "",
  ...props
}: InputProps) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-zinc-400 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
            {icon}
          </div>
        )}
        <input
          className={`w-full pl-11 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-2xl 
                     focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 outline-none 
                     transition-all text-white placeholder:text-zinc-500 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};
