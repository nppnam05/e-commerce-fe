import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/store/api/api-product";
import type { Product, ProductDetail } from "@/types/product";
import type { ValueChanged } from "@/types/value-change";
import type { VoidCallBack } from "@/types/void-call-back";
import { createContext, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";

type DetailProviderParam = {
  children: ReactNode;
};

type DetailProviderValue = {
  product?: ProductDetail;
  relatedProducts: Product[];
  order: VoidCallBack;
  setCountOrdered: ValueChanged<number>;
  countOrdered: number;
  isLoadingProduct: boolean;
  isFetchingProduct: boolean;
  isLoadingRelatedProducts: boolean;
  isFetchingRelatedProducts: boolean;
};

export const DetailContext = createContext<DetailProviderValue | null>(null);

export function DetailProvider({ children }: DetailProviderParam) {
  const { id } = useParams();
  const idInt = parseInt(id ?? "0");

  const [countOrdered, setCountOrdered] = useState(1);

  function handleOrder() {}

  const {
    isLoading: isLoadingProduct,
    isFetching: isFetchingProduct,
    data: product,
  } = useGetProductByIdQuery(idInt);

  const {
    isLoading: isLoadingRelatedProducts,
    isFetching: isFetchingRelatedProducts,
    data,
  } = useGetAllProductsQuery({ pageNumber: 1, pageSize: 4 });

  const relatedProducts = data?.data ?? [];

  return (
    <DetailContext.Provider
      value={{
        isFetchingProduct,
        isLoadingProduct,
        product,
        isLoadingRelatedProducts,
        isFetchingRelatedProducts,
        relatedProducts,
        countOrdered,
        setCountOrdered,
        order: handleOrder,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
}
