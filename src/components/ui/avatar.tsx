import { useState } from "react";

const AVATAR_SIZES = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-xl",
  xl: "h-24 w-24 text-3xl",
};

export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: () => void;
}

export const Avatar = ({
  src,
  name = "",
  size = "md",
  className = "",
  onClick = () => {},
}: AvatarProps) => {
  const [hasError, setHasError] = useState(false);

  const getFallbackText = (fullName: string) => {
    if (!fullName) return "?";
    const words = fullName.trim().split(" ");
    return words[words.length - 1].charAt(0).toUpperCase();
  };

  const sizeClass = AVATAR_SIZES[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none overflow-hidden bg-gray-100 text-gray-600 font-semibold dark:bg-gray-700 dark:text-gray-300 ${sizeClass} ${className}`}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
          onClick={onClick}
        />
      ) : (
        <span className="uppercase" onClick={onClick}>
          {getFallbackText(name)}
        </span>
      )}
    </div>
  );
};