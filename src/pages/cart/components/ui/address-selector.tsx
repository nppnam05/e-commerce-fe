import type { Address } from "@/types/address";
import type { ValueChanged } from "@/types/value-change";
import AddressList from "./address-list";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type AddressSelectorParam = {
  value: Address;
  onChange: ValueChanged<Address>;
  values: Address[];
  currentPage: number;
  totalPages: number;
  onChangePage: ValueChanged<number>;
};

export default function AddressSelector({
  currentPage,
  totalPages,
  onChangePage,
  value,
  values,
  onChange,
}: AddressSelectorParam) {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col items-stretch justify-start rounded-2xl border border-zinc-400 bg-white px-4 py-4 ${totalPages !== 0 ? "h-[90vh] w-[90vw]" : ""}`}
      onClick={(e) => e.preventDefault()}
    >
      <h2 className="my-4 text-center text-3xl font-bold text-zinc-800">
        Select Address
      </h2>
      {totalPages === 0 ? (
        <>
          <h2 className="my-4 text-center text-3xl font-bold text-zinc-800">
            you don't have any address
          </h2>

          <Button
            variant="primary"
            onClick={() => navigate("/profile/addresses")}
          >
            Go To Address Page
          </Button>
        </>
      ) : (
        <>
          <AddressList
            className="grow overflow-scroll"
            onChange={onChange}
            addresses={values}
            value={value}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onChangePage}
          />
        </>
      )}
    </div>
  );
}
