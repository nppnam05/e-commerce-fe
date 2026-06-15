import { useGetAllProductsQuery } from "@/store/api/api-product";
import type { Product } from "@/types/product";
import { createContext, type ReactNode } from "react";

type HomeProviderParam = {
  children: ReactNode;
};

type HomeProviderValueType = {
  isLoading: boolean;
  isFetching: boolean;
  products: Product[];
};

const defaultValue: HomeProviderValueType = {
  isLoading: false,
  isFetching: false,
  products: [],
};

export const HomeContext = createContext<HomeProviderValueType>(defaultValue);

export function HomeProvider({ children }: HomeProviderParam) {
  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    pageNumber: 1,
    pageSize: 4,
  });

  const products = data?.data ?? [];

  return (
    <HomeContext.Provider
      value={{
        isLoading: isLoading,
        isFetching: isFetching,
        products: products,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
