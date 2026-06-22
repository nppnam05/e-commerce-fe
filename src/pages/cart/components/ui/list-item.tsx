import type { Cart } from "@/types/cart";
import Item from "./item";
import { RowDivident } from "@/components/ui/row-divident";
import type { ValueChanged } from "@/types/value-change";
import type { UpdateCartRequest } from "@/store/api/api-cart";

export interface ListItemInput extends React.HtmlHTMLAttributes<HTMLDivElement> {
  carts: Cart[];
  deleteCart: ValueChanged<number>;
  updateCart: ValueChanged<UpdateCartRequest>;
}

export default function ListItem({
  carts,
  deleteCart,
  updateCart,
}: ListItemInput) {
  return (
    <div className="col-span-1 flex h-fit w-full flex-col gap-4 rounded-2xl px-4 py-4 outline outline-zinc-400 md:col-span-3">
      {carts.map((cart, index) => {
        return (
          <>
            <Item
              cart={cart}
              onCountChange={(number) =>
                updateCart({ id: cart.id, quantity: number, singlePrice: 0 })
              }
              onDelete={() => deleteCart(cart.id)}
              key={cart.id}
            />
            {index != carts.length - 1 && <RowDivident />}
          </>
        );
      })}
    </div>
  );
}
