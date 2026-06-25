import type { Color } from "@/types/color";

interface ColorSelectorProps {
  colors: Color[];
  selectedColorCode: string;
  onChange: (colorCode: string) => void;
}

export const ColorSelector = ({
  colors,
  selectedColorCode,
  onChange,
}: ColorSelectorProps) => {
  return (
    <div>
      <div className="mb-2 text-2xl text-zinc-400">Select Colors</div>
      <div className="flex items-center gap-4">
        {colors?.map((c) => {
          const isWhite = c.colorCode.toLowerCase() === "#ffffff";
          const isSelected = selectedColorCode === c.colorCode;

          return (
            <button
              key={c.id}
              onClick={() => onChange(c.colorCode)}
              className={`relative h-12 w-12 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${
                isWhite ? "shadow-md ring-2 ring-black ring-offset-2" : ""
              } ${
                isSelected
                  ? "shadow-md ring-2 ring-black ring-offset-2"
                  : "hover:ring-1 hover:ring-gray-300"
              }`}
              style={{ backgroundColor: c.colorCode }}
              title={c.name}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 drop-shadow-sm"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#22c55e"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
