import type { FavoriteProduct } from "@/types/favorite";
import { ShoppingCart, Trash2 } from "lucide-react";

interface FavoriteCardProps {
  item: FavoriteProduct;
  onAddToCart?: (id: number) => void;
  onRemove?: (id: number) => void;
}

export const FavoriteCard = ({
  item,
  onAddToCart,
  onRemove,
}: FavoriteCardProps) => {
  return (
    <div
      key={item.id}
      className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-5 hover:shadow"
    >
      <img
        src={item.imageUrls[0]}
        alt={item.name}
        className="h-28 w-28 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 leading-tight font-medium text-gray-900">
          {item.name}
        </h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {(item.price / 1000).toFixed(0)}K
          </span>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onAddToCart?.(item.id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black py-2.5 font-medium text-white transition hover:bg-gray-800 hover:text-white dark:bg-white dark:text-black"
          >
            <ShoppingCart size={18} />
            Thêm vào giỏ
          </button>

          <button
            onClick={() => onRemove?.(item.id)}
            className="rounded-xl border border-gray-300 p-2.5 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-gray-600"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
