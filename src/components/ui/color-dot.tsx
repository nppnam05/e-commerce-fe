export const ColorDot = ({ color }: { color: string }) => (
  <div
    className="h-5 w-5 rounded-full border border-gray-200 shadow-sm"
    style={{ backgroundColor: color }}
  />
);