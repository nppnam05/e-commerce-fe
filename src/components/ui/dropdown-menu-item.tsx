import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

type FilterTabInput = {
  name: string;
  children: React.ReactNode;
};

export function DropdownMenuItem({ children, name }: FilterTabInput) {
  const [isShowContent, setIsShowContent] = useState(true);

  function handleToggleShowContent() {
    setIsShowContent((isShowContent) => !isShowContent);
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex cursor-pointer flex-row items-center justify-between transition-colors duration-100 hover:bg-zinc-200"
        onClick={handleToggleShowContent}
      >
        <span className="text-2xl font-bold">{name}</span>
        {isShowContent ? (
          <ChevronDown width={24} />
        ) : (
          <ChevronRight width={24} />
        )}
      </div>
      {isShowContent && children}
    </div>
  );
}
