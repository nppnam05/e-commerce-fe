import { DropdownButton } from "@/components/ui/dropdown-button";
import aoThun from "@/assets/images/ao_thun.jpg";
import { ListItem } from "@/components/ui/list-item";
import { RowDivident } from "@/components/ui/row-divident";
import { useContext, useState } from "react";
import type { VoidCallBack } from "@/types/void-call-back";
import { SlidersVertical } from "lucide-react";
import PaginationController from "./pagination-controller";
import { CategoryContext } from "../context/category-context";

interface ListItemParam extends React.HtmlHTMLAttributes<HTMLDivElement> {
  onEnableFilter?: VoidCallBack;
}

const fakeItem = {
  image: aoThun,
  name: "ao thun",
  price: 10000,
  stars: 3.2,
};

export default function CategoryContent({
  className,
  onEnableFilter,
}: ListItemParam) {
  const {
    isFetching,
    isLoading,
    products,
    page,
    totalPages,
    setPage,
    handlePrevPage,
    handleNextPage,
  } = useContext(CategoryContext);

  return (
    <div className={`${className}`}>
      <div className="flex h-fit flex-row items-center justify-between px-4 text-base">
        <span className="text-2xl font-bold text-zinc-900">Casual</span>
        <div className="flex h-fit w-fit flex-row gap-4 text-zinc-400">
          <span>Show 1-10 of 100 Product</span>
          <div className="hidden h-fit w-fit flex-row gap-2 text-zinc-400 md:flex">
            <span>Sort by</span>
            <DropdownButton
              name="Most popular"
              className="font-bold text-zinc-900"
            >
              <span>hello </span>
            </DropdownButton>
          </div>

          <SlidersVertical
            width={30}
            onClick={onEnableFilter}
            className="block md:hidden"
          />
        </div>
      </div>

      <ListItem
        isFetching={isFetching}
        isLoading={isLoading}
        products={products}
        maxItem={9}
        className="grid grid-cols-3 grid-rows-3 justify-items-center gap-4"
      />

      <RowDivident className="my-4" />

      <PaginationController
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        totalPages={totalPages}
        value={page}
        onChange={setPage}
      />
    </div>
  );
}
