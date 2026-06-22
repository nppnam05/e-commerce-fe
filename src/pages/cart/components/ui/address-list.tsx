import type { Address } from "@/types/address";
import AddressItem from "./address-item";
import { RowDivident } from "@/components/ui/row-divident";
import type { ValueChanged } from "@/types/value-change";

type AddressListParam = {
  value: Address;
  onChange: ValueChanged<Address>;
  addresses: Address[];
  className: string;
};

export default function AddressList({
  value,
  onChange,
  addresses,
  className,
}: AddressListParam) {
  return (
    <div className={className} onClick={(e) => e.preventDefault()}>
      {addresses.map((address, index) => (
        <>
          <AddressItem
            address={address}
            isSelected={address.id === (value?.id ?? 0)}
            className="px-8 py-4"
            onClick={() => onChange(address)}
            key={address.id}
          />
          {index != addresses.length - 1 && <RowDivident></RowDivident>}
        </>
      ))}
    </div>
  );
}
