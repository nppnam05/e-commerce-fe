import type { ValueChanged } from "@/types/value-change";
import SelectableColor from "./selectable-color";

export type ColorInput = {
  outlineColor: string;
  backgroundColor: string;
  checkColor: string;
};

interface ColorPalleteInput extends React.HtmlHTMLAttributes<HTMLDivElement> {
  colors: ColorInput[];
  selectColor: string;
  valueChanged: ValueChanged<string>;
  colorWidthHeight?: number;
}

export function ColorPallete({
  colors,
  selectColor,
  valueChanged,
  className,
  colorWidthHeight,
}: ColorPalleteInput) {
  return (
    <div className={`${className} `}>
      {colors.map((color) => (
        <SelectableColor
          {...color}
          isCheck={color.backgroundColor === selectColor}
          key={color.backgroundColor}
          className="aspect-square h-full w-full p-2"
          colorWidthHeight={colorWidthHeight}
          valueChanged={valueChanged}
        />
      ))}
    </div>
  );
}
