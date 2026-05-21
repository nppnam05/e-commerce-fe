import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
  variant?: "superBlack" | "primary";
}

export const Input = ({
  icon,
  label,
  className = "",
  variant = "superBlack",
  ...props
}: InputProps) => {
  const variants = {
    superBlack: {
      input:
        "bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400",
    },
    primary: {
      input:
        "bg-zinc-300 border border-zinc-300 text-zinc-800 placeholder:text-zinc-500 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400",
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
          <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-zinc-500">
            {icon}
          </div>
        )}

        <input
          className={`w-full rounded-2xl py-3.5 transition-all outline-none ${icon ? "pr-4 pl-11" : "px-4"} ${className} ${variantStyle.input}`}
          {...props}
        />
      </div>
    </div>
  );
};
