import { RowDivident } from "@/components/ui/row-divident";
import { DoubleRange } from "@/components/ui/double-range";
import colors from "tailwindcss/colors";
import { useState } from "react";
import { BadgeSelector } from "@/components/ui/badge-selector";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/components/ui/menu-item";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu-item";
import type { VoidCallBack } from "@/types/void-call-back";
import ColorPallete, { type ColorInput } from "./color-pallete";

type FilterInput = {
  className?: string;
  icon?: React.ReactNode;
  onApplyFilter?: VoidCallBack;
};

const colorsInput: ColorInput[] = [
  {
    backgroundColor: colors.green[600],
    outlineColor: colors.green[900],
    checkColor: colors.white,
  },
  {
    backgroundColor: colors.red[600],
    outlineColor: colors.red[900],
    checkColor: colors.white,
  },
  {
    backgroundColor: colors.yellow[600],
    outlineColor: colors.yellow[900],
    checkColor: colors.white,
  },
  {
    backgroundColor: colors.orange[600],
    outlineColor: colors.orange[900],
    checkColor: colors.white,
  },
  {
    backgroundColor: colors.cyan[600],
    outlineColor: colors.cyan[900],
    checkColor: colors.white,
  },
  {
    backgroundColor: colors.blue[600],
    outlineColor: colors.blue[900],
    checkColor: colors.white,
  },
  {
    backgroundColor: colors.purple[600],
    outlineColor: colors.purple[900],
    checkColor: colors.white,
  },
  {
    backgroundColor: colors.pink[600],
    outlineColor: colors.pink[900],
    checkColor: colors.white,
  },
  {
    backgroundColor: colors.white,
    outlineColor: colors.zinc[300],
    checkColor: colors.zinc[900],
  },
  {
    backgroundColor: colors.zinc[900],
    outlineColor: colors.zinc[800],
    checkColor: colors.white,
  },
];

export default function Filter({
  className,
  icon,
  onApplyFilter,
}: FilterInput) {
  const [selectedColor, setSelectedColor] = useState(colors.white);

  return (
    <div
      className={`outline-zinc-40 ${className} flex h-fit w-100 flex-col gap-4 rounded-3xl px-8 py-8 outline`}
    >
      <div className="flex flex-row justify-between">
        <span className="text-2xl">Filter</span>
        {icon}
      </div>
      <RowDivident />
      <MenuItem name="Shirt" />
      <MenuItem name="Shirt" />
      <MenuItem name="Shirt" />
      <MenuItem name="Shirt" />
      <MenuItem name="Shirt" />
      <RowDivident />
      <DropdownMenuItem name="price">
        <DoubleRange />
      </DropdownMenuItem>
      <RowDivident />
      <DropdownMenuItem name="color">
        <ColorPallete
          colors={colorsInput}
          valueChanged={setSelectedColor}
          selectColor={selectedColor}
          className="grid grid-cols-5 grid-rows-2 gap-4"
        />
      </DropdownMenuItem>
      <RowDivident />
      <DropdownMenuItem name="Size">
        <BadgeSelector
          value="Small"
          texts={["Small", "Medium", "Large", "X-Large", "XX-Large"]}
          defaultTextColor={colors.zinc[800]}
          defaultBackgroundColor={colors.zinc[100]}
          selectedTextColor={colors.white}
          selectedBackgroundColor={colors.zinc[900]}
          fontSize={20}
          gap={8}
          className="flex-wrap"
          onChanged={(a) => console.log(a)}
        />
      </DropdownMenuItem>
      <RowDivident />
      <Button variant="superBlack" onClick={onApplyFilter}>
        Apply filter
      </Button>
    </div>
  );
}
