import { useContext } from "react";
import ListItem from "./list-item";
import SumaryPrice from "./sumary-price";
import { CartContext } from "../context/cart-context";

export default function ContentSection() {
  const context = useContext(CartContext);
  if (context === null) throw Error("CartContext cannot be null");

  const { carts, isLoading, isFetching } = context;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
      <ListItem carts={carts} />
      <SumaryPrice className="col-span-1 md:col-span-2" />
    </div>
  );
}
