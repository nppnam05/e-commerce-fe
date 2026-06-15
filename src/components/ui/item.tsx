import { useNavigate } from "react-router-dom";
import { Star } from "./stars";
import type { Product } from "@/types/product";

export type ItemType = {
  product: Product;
};

export function Item({ product }: ItemType) {
  const navigate = useNavigate();

  function navigateToDetailPage() {
    navigate("/detail/" + product.id);
  }

  console.log(product);

  return (
    <span
      className="flex w-fit cursor-pointer flex-col items-start justify-start rounded px-8 py-4 hover:bg-zinc-200"
      onClick={navigateToDetailPage}
    >
      <img
        src={product.imageUrl[0]}
        alt={product.name}
        className="rounded-2xl object-fill pb-2"
        width={300}
      />
      <span className="pb-1 text-2xl font-bold text-zinc-950">
        {product.name}
      </span>
      <Star count={5} widthSize={20} className="pb-1 text-yellow-700" />
      <span className="text-3xl font-bold text-zinc-950">
        {product.price} $
      </span>
    </span>
  );
}
