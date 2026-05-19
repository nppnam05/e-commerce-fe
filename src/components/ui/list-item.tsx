import { Item, type ItemType } from "./item";

type ListItemInput = {
  items: ItemType[];
};

export function ListItem({ items }: ListItemInput) {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 justify-items-center gap-4 ">
      {items.map((item, index) => {
        return <Item key={index} {...item} />;
      })}
    </div>
  );
}
