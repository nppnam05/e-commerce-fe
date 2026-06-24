import type { ValueChanged } from "@/types/value-change";

interface BadgeSelectorInput extends React.HTMLAttributes<HTMLDivElement> {
  notFading?: string[];
  texts: string[];
  fontSize: number;
  selectedTextColor: string;
  defaultTextColor: string;
  selectedBackgroundColor: string;
  defaultBackgroundColor: string;
  gap: number;
  value: string | null;
  onChanged: ValueChanged<string>;
}

export function BadgeSelector({
  texts,
  fontSize,
  selectedBackgroundColor,
  defaultBackgroundColor,
  defaultTextColor,
  selectedTextColor,
  gap,
  onChanged,
  className,
  value,
  notFading = null,
}: BadgeSelectorInput) {
  return (
    <div className={`flex flex-row ${className}`} style={{ gap: `${gap}px` }}>
      {texts.map((text, index) => (
        <Badge
          isFading={notFading !== null && !notFading.includes(text)}
          text={text}
          fontSize={fontSize}
          selectedBackgroundColor={selectedBackgroundColor}
          defaultBackgroundColor={defaultBackgroundColor}
          defaultTextColor={defaultTextColor}
          selectedTextColor={selectedTextColor}
          isSelected={text === value}
          onClick={() => onChanged(text)}
          key={index}
        />
      ))}
    </div>
  );
}

type BadgeInput = {
  isFading: boolean;
  text: string;
  selectedTextColor: string;
  defaultTextColor: string;
  selectedBackgroundColor: string;
  defaultBackgroundColor: string;
  isSelected: boolean;
  fontSize: number;
  onClick: () => void;
};

function Badge({
  isFading,
  text,
  selectedTextColor,
  defaultTextColor,
  selectedBackgroundColor,
  defaultBackgroundColor,
  isSelected,
  fontSize,
  onClick,
}: BadgeInput) {
  const textColor = isSelected ? selectedTextColor : defaultTextColor;
  const backgroundColor = isSelected
    ? selectedBackgroundColor
    : defaultBackgroundColor;

  return (
    <div
      onClick={onClick}
      style={{ backgroundColor: backgroundColor }}
      className="relative cursor-pointer rounded-3xl px-4 py-2 transition-colors duration-300 ease-in-out"
    >
      <span style={{ color: textColor, fontSize: `${fontSize}px` }}>
        {text}
      </span>

      <div
        className={`absolute inset-0 rounded-3xl bg-white opacity-50 ${isFading ? "block" : "hidden"}`}
      ></div>
    </div>
  );
}
