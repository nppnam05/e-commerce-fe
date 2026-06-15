import type { ValueChanged } from "@/types/value-change";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type CountSelectorInput = {
  onChanged: ValueChanged<number>
  value: number
}

export function CountSelector({ onChanged, value }: CountSelectorInput) {
  const [count, setCount] = useState(value)

  function handlePrev() {
    if (count <= 1)
      return;

    setCount(count => {
      const newCount = count - 1;
      onChanged(newCount)
      return newCount;
    })
  }

  function handleNext() {
    setCount(count => {
      const newCount = count + 1;

      onChanged(newCount)
      return newCount;
    })
  }

  return (<span className="rounded-3xl bg-zinc-100 px-4 py-2 flex flex-row gap-8 w-fit items-center">
    <Minus onClick={handlePrev} width={24} height={24} />
    <span style={{ fontSize: 24 }}>{count}</span>
    <Plus onClick={handleNext} width={24} height={24} />
  </span>)
}
