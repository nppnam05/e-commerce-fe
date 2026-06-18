import { CountSelector } from "@/components/ui/count-selector";
import type { Cart } from "@/types/cart";
import type { ValueChanged } from "@/types/value-change";
import type { VoidCallBack } from "@/types/void-call-back";
import { Trash2 } from "lucide-react";
import colors from "tailwindcss/colors";

type ItemWithAction = {
  cart: Cart;
  onDelete: VoidCallBack;
  onCountChange: ValueChanged<number>;
};

export default function Item({
  cart,
  onDelete,
  onCountChange,
}: ItemWithAction) {
  // const { image, name, size, color, price, value } = { ...item };

  const { product, quantity } = cart;
  const { name, size, colorCode, price, imageUrls } = product;

  return (
    <div className="flex h-fit w-full flex-row">
      <img
        src={imageUrls[0]}
        alt={name}
        width={124}
        height={124}
        className="object-fill"
      />
      <div className="flex grow flex-col justify-between">
        <div className="flex grow flex-col justify-start">
          <div className="text-xl font-bold">{name}</div>
          <div>
            <span className="text-lg text-zinc-900">Size:</span>{" "}
            <span className="text-base text-zinc-600">{size}</span>
          </div>
          <div>
            <span className="text-lg text-zinc-900">Color:</span>{" "}
            <span className="text-base text-zinc-600">{colorCode}</span>
          </div>
        </div>
        <div className="text-2xl font-bold">{price} VND</div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Trash2 color={colors.red[600]} onClick={onDelete} />
        <CountSelector onChanged={onCountChange} value={quantity} />
      </div>
    </div>
  );
}
