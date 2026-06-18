import type { Cart } from "@/types/cart";
import Item from "./item";
import { RowDivident } from "@/components/ui/row-divident";
import { useContext } from "react";
import { CartContext } from "../context/cart-context";

export interface ListItemInput extends React.HtmlHTMLAttributes<HTMLDivElement> {
  carts: Cart[];
}

export default function ListItem({ carts }: ListItemInput) {
  const context = useContext(CartContext);
  if (context === null) throw new Error("cart context can't be null");

  const { deleteCart, updateCart } = context;

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
