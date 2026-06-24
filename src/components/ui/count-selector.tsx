import type { ValueChanged } from "@/types/value-change";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type CountSelectorInput = {
  onChanged: ValueChanged<number>;
  value: number;
};

export function CountSelector({ onChanged, value }: CountSelectorInput) {
  function handlePrev() {
    if (value <= 1) return;

    onChanged(value - 1);
  }

  function handleNext() {
    onChanged(value + 1);
  }

  return (
    <span className="flex w-fit flex-row items-center gap-8 rounded-3xl bg-zinc-100 px-4 py-2">
      <Minus onClick={handlePrev} width={24} height={24} />
      <span style={{ fontSize: 24 }}>{value}</span>
      <Plus onClick={handleNext} width={24} height={24} />
    </span>
  );
}
