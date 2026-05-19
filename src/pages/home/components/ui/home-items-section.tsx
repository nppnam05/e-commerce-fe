import { Button } from "@/components/ui/button";
import type { ItemType } from "@/components/ui/item";
import { ListItem } from "@/components/ui/list-item";

type HomeItemSectionInput = {
  name: string;
  items: ItemType[];
};

export function HomeItemsSection({ name, items }: HomeItemSectionInput) {
  return (
    <div className="flex flex-col gap-12 items-center my-12">
      <h2 className="text-6xl font-bold  w-fit ">{name}</h2>
      <ListItem items={items} />
      <Button variant="primary" className="inline">
        View all
      </Button>
    </div>
  );
}
