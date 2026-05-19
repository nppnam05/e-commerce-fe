import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

export function DropdownButton({ children }: Props) {
  const [isActive, setIsActive] = useState(false);
  const width = 20;

  return (
    <div
      className="cursor-pointer relative inline"
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <span>Shop</span>
      {isActive ? (
        <ChevronUp width={width} className="inline" />
      ) : (
        <ChevronDown width={width} className="inline" />
      )}

      {isActive ? (
        <div className="absolute bottom-0 translate-y-[100%] left-1/2 translate-x-[-50%] bg-white outline outline-zinc-700 p-3 border rounded-md">
          {children}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
