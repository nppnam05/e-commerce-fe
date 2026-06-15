import type { ValueChanged } from "@/types/value-change";
import { Check } from "lucide-react";

interface SelectableColorInput extends React.HtmlHTMLAttributes<HTMLDivElement> {
  outlineColor: string;
  valueChanged: ValueChanged<string>;
  backgroundColor: string;
  checkColor: string;
  colorWidthHeight?: number;
  isCheck: boolean;
}

export default function SelectableColor({
  outlineColor,
  backgroundColor,
  checkColor,
  colorWidthHeight,
  isCheck,
  valueChanged,
  className,
}: SelectableColorInput) {
  return (
    <div
      className={`cursor-pointer rounded-[100px] outline ${className}`}
      style={{
        outlineColor: outlineColor,
        backgroundColor: backgroundColor,
        width: `${colorWidthHeight}px`,
        height: `${colorWidthHeight}px`,
      }}
      onClick={() => valueChanged(backgroundColor)}
    >
      {isCheck && (
        <span>
          <Check className="h-full w-full" style={{ color: checkColor }} />
        </span>
      )}
    </div>
  );
}
