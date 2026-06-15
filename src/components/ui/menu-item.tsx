import { ChevronRight } from "lucide-react";

type MenuItemInput = {
  name: String;
};

export function MenuItem({ name }: MenuItemInput) {
  return (
    <div className="flex flex-row items-center justify-between">
      <span className="text-xl text-zinc-400">{name}</span>
      <ChevronRight width={24} height={24} className="text-zinc-400" />
    </div>
  );
}
