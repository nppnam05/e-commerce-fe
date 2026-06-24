import type { ValueChanged } from "@/types/value-change";
import SelectableColor from "./selectable-color";

export type ColorInput = {
  outlineColor: string;
  backgroundColor: string;
  checkColor: string;
};

interface ColorPalleteInput extends React.HtmlHTMLAttributes<HTMLDivElement> {
  notFadingColors?: String[];
  colors: ColorInput[];
  selectColor: string;
  valueChanged: ValueChanged<string>;
  colorWidthHeight?: number;
}

export function ColorPallete({
  colors,
  notFadingColors,
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
          isFading={
            notFadingColors !== undefined &&
            !notFadingColors.includes(color.backgroundColor)
          }
          valueChanged={valueChanged}
        />
      ))}
    </div>
  );
}
