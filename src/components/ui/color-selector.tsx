import type { ValueChanged } from "@/types/value-change";
import { Check } from "lucide-react";
import { useState } from "react";

type colorSelectorInput = {
  colors: React.CSSProperties["backgroundColor"][]
  gap: number,
  size: number,
  value: React.CSSProperties["backgroundColor"],
  onChanged: ValueChanged<React.CSSProperties["backgroundColor"]>
}

export function ColorSelector({ colors, gap, onChanged, size, value }: colorSelectorInput) {
  const [selectedColor, setSelectedColor] = useState(value);
  function handleChangeColor(color: React.CSSProperties["backgroundColor"]) {
    setSelectedColor(color)
    onChanged(color)
  }

  return <div className="flex" style={{ gap: `${gap}px` }}>
    {colors.map((color) => (<div style={{ backgroundColor: color, width: `${size}px`, height: `${size}px` }} className="relative rounded-3xl border border-zinc-400" onClick={() => handleChangeColor(color)} key={color}>
      {
        selectedColor === color && (<div className="absolute w-full h-full inset-0 p-1">
          <Check className="w-full h-full text-white" />
        </div>)
      }

    </div>))}
  </div>
}
