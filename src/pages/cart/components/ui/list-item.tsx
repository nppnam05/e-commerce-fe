import Item, { type ItemInput } from "./item";
import { RowDivident } from "@/components/ui/row-divident";

export interface ListItemInput extends React.HtmlHTMLAttributes<HTMLDivElement> {
  items: ItemInput[];
}

export default function ListItem({ items }: ListItemInput) {
  return (
    <div className="col-span-1 flex h-fit w-full flex-col gap-4 rounded-2xl px-4 py-4 outline outline-zinc-400 md:col-span-3">
      {items.map((item, index) => {
        return (
          <>
            <Item
              item={item}
              onCountChange={(count) => console.log(count)}
              onDelete={() => console.log("delete")}
              key={item.id}
            />
            {index != items.length - 1 && <RowDivident />}
          </>
        );
      })}
    </div>
  );
}
