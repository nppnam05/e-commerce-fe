import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  variant: "superBlack" | "primary";
}

export const Input = ({
  icon,
  label,
  className = "",
  variant,
  ...props
}: InputProps) => {
  const variants = {
    superBlack: {
      icons: "",
      input:
        "border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400",
    },
    primary: {
      icons: "",
      input:
        "bg-zinc-300 text-zinc-800 placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400",
    },
  };

  const variantStyle = variants[variant];

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-zinc-400">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={`absolute top-1/2 left-4 -translate-y-1/2 text-zinc-500 ${variantStyle.icons}`}
          >
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-2xl px-4 py-3 transition-all outline-none ${className} ${variantStyle.input}`}
          {...props}
        />
      </div>
    </div>
  );
};
