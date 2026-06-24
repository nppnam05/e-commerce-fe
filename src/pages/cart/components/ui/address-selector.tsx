import type { Address } from "@/types/address";
import type { ValueChanged } from "@/types/value-change";
import AddressList from "./address-list";
import { Pagination } from "@/components/ui/pagination";
import { current } from "@reduxjs/toolkit";

type AddressSelectorParam = {
  value: Address;
  onChange: ValueChanged<Address>;
  values: Address[];
  currentPage: number;
  totalPage: number;
  onChangePage: ValueChanged<number>;
};

export default function AddressSelector({
  currentPage,
  totalPage,
  onChangePage,
  value,
  values,
  onChange,
}: AddressSelectorParam) {
  return (
    <div>
      <h2>Select Address</h2>
      <AddressList
        className="by-4 mx-8"
        onChange={onChange}
        addresses={values}
        value={value}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={onChangePage}
      />
    </div>
  );
}
