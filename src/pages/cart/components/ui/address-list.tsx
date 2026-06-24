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
    <div className={className}>
      {addresses.map((address, index) => (
        <>
          <AddressItem
            address={address}
            isSelected={address.id === value.id}
            className="mx-8 my-4"
            onClick={() => onChange(address)}
          />
          {index != addresses.length - 1 && <RowDivident></RowDivident>}
        </>
      ))}
    </div>
  );
}
