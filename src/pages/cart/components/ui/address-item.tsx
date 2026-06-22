import type { Address } from "@/types/address";
import type { VoidCallBack } from "@/types/void-call-back";
import { MapPin } from "lucide-react";
import colors from "tailwindcss/colors";

interface AddressItemParam extends React.HtmlHTMLAttributes<HTMLDivElement> {
  address: Address;
  className: string;
  isSelected: boolean;
  onClick: VoidCallBack;
}

export default function AddressItem({
  address,
  className,
  isSelected,
  onClick,
}: AddressItemParam) {
  return (
    <div
      className={`relative flex cursor-pointer flex-row items-center gap-2 ${className} ${isSelected ? "bg-teal-300" : ""} `}
      onClick={onClick}
    >
      <MapPin
        width={30}
        height={30}
        color={colors.zinc[800]}
        className="inline"
      />
      <span className="text-2xl font-bold accent-zinc-800">{`${address.street} - ${address.ward} - ${address.district} - ${address.city}`}</span>

      <div className="absolute inset-0 z-10 hidden bg-zinc-900 opacity-20 hover:block"></div>
    </div>
  );
}
