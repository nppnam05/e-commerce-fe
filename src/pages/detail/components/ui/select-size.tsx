import type { Size } from "@/types/size";

interface SelectSizeProps {
  sizes: Size[];
  selectedSize: string;
  onChange: (sizeName: string) => void;
}

export const SelectSize = ({
  sizes,
  selectedSize,
  onChange,
}: SelectSizeProps) => {
  return (
    <div>
      <div className="mb-2 text-2xl text-zinc-400">Select Size</div>
      <div className="flex flex-wrap gap-3">
        {sizes?.map((size) => (
          <button
            key={size.id}
            onClick={() => onChange(size.name)}
            className={`h-11 min-w-[52px] rounded-xl border-2 font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
              selectedSize === size.name
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-zinc-800 hover:border-gray-400"
            }`}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  );
};
