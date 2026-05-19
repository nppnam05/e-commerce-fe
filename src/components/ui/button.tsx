import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "font-semibold rounded-2xl transition-all active:scale-95 cursor-pointer";

  const variants = {
    primary: "bg-white text-zinc-950 hover:bg-zinc-100 border border-zinc-200",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    outline: "border border-zinc-700 hover:border-zinc-500 text-white",
  };

  const sizes = {
    sm: "py-2.5 px-5 text-sm",
    md: "py-4 px-6 text-base",
    lg: "py-4 text-lg tracking-wider",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} `}
      {...props}
    >
      {children}
    </button>
  );
};
