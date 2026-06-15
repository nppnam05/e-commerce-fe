import { useState, type ReactNode } from "react";
import { useGetAllProductsQuery } from "@/store/api/api-product";
import { createContext } from "react";
import type { VoidCallBack } from "@/types/void-call-back";
import type { ValueChanged } from "@/types/value-change";
import type { Product } from "@/types/product";

type CategoryProviderParam = {
  children: ReactNode;
};

type CategoryProviderValueType = {
  isLoading: boolean;
  isFetching: boolean;
  page: number;
  totalPages: number;
  products: Product[];
  handleNextPage: VoidCallBack;
  handlePrevPage: VoidCallBack;
  setPage: ValueChanged<number>;
};

const defaultValue: CategoryProviderValueType = {
  isLoading: false,
  isFetching: false,
  page: 0,
  totalPages: 0,
  products: [],
  handleNextPage: () => {},
  handlePrevPage: () => {},
  setPage: () => {},
};

export const CategoryContext =
  createContext<CategoryProviderValueType>(defaultValue);
export function CategoryProvider({ children }: CategoryProviderParam) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    pageNumber: page,
    pageSize: 9,
  });
  const totalPages = data?.totalPages ?? 0;
  const products: Product[] = data?.data ?? [];

  function handleNextPage() {
    if (page < totalPages) setPage((page) => page + 1);
  }

  function handlePrevPage() {
    if (page > 1) setPage((page) => page - 1);
  }

  return (
    <CategoryContext.Provider
      value={{
        isLoading: isLoading,
        isFetching: isFetching,
        page: page,
        totalPages: totalPages,
        products: products,
        handleNextPage: handleNextPage,
        handlePrevPage: handlePrevPage,
        setPage: setPage,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
