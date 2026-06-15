import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  name: String;
  children: React.ReactNode;
}

export function DropdownButton({ name, children, className }: Props) {
  const [isActive, setIsActive] = useState(false);
  const width = 20;

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <span>{name}</span>
      {isActive ? (
        <ChevronUp width={width} className="inline" />
      ) : (
        <ChevronDown width={width} className="inline" />
      )}

      {isActive ? (
        <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[100%] rounded-md border bg-white p-3 outline outline-zinc-700">
          {children}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
