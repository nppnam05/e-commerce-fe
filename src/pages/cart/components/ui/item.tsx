import aoThun from "@/assets/images/ao_thun.jpg";
import { CountSelector } from "@/components/ui/count-selector";
import type { ValueChanged } from "@/types/value-change";
import type { VoidCallBack } from "@/types/void-call-back";
import { Trash2 } from "lucide-react";
import colors from "tailwindcss/colors";

export type ItemInput = {
  id: number;
  image: string;
  name: string;
  size: string;
  color: string;
  price: number;
  value: number;
};

type ItemWithAction = {
  item: ItemInput;
  onDelete: VoidCallBack;
  onCountChange: ValueChanged<number>;
};

export default function Item({
  item,
  onDelete,
  onCountChange,
}: ItemWithAction) {
  const { id, image, name, size, color, price, value } = { ...item };
  return (
    <div className="flex h-fit w-full flex-row">
      <img
        src={image}
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
            <span className="text-base text-zinc-600">{color}</span>
          </div>
        </div>
        <div className="text-2xl font-bold">{price} VND</div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Trash2 color={colors.red[600]} onClick={onDelete} />
        <CountSelector onChanged={onCountChange} value={value} />
      </div>
    </div>
  );
}
