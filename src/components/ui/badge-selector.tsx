import type { ValueChanged } from "@/types/value-change";
import { useState } from "react";

interface BadgeSelectorInput extends React.HTMLAttributes<HTMLDivElement> {
  texts: String[];
  fontSize: number;
  selectedTextColor: string;
  defaultTextColor: string;
  selectedBackgroundColor: string;
  defaultBackgroundColor: string;
  gap: number;
  value: String;
  onChanged: ValueChanged<String>;
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
}: BadgeSelectorInput) {
  const [selectedText, setSelectedText] = useState(value);

  function handleChangeValue(text: String) {
    setSelectedText(text);
    onChanged(text);
  }

  return (
    <div className={`flex flex-row ${className}`} style={{ gap: `${gap}px` }}>
      {texts.map((text, index) => (
        <Badge
          text={text}
          fontSize={fontSize}
          selectedBackgroundColor={selectedBackgroundColor}
          defaultBackgroundColor={defaultBackgroundColor}
          defaultTextColor={defaultTextColor}
          selectedTextColor={selectedTextColor}
          isSelected={text === selectedText}
          onClick={() => handleChangeValue(text)}
          key={index}
        />
      ))}
    </div>
  );
}

type BadgeInput = {
  text: String;
  selectedTextColor: string;
  defaultTextColor: string;
  selectedBackgroundColor: string;
  defaultBackgroundColor: string;
  isSelected: boolean;
  fontSize: number;
  onClick: () => void;
};

function Badge({
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
      className="cursor-pointer rounded-3xl px-4 py-2 transition-colors duration-300 ease-in-out"
    >
      <span style={{ color: textColor, fontSize: `${fontSize}px` }}>
        {text}
      </span>
    </div>
  );
}
