import { useAppSelector } from "@/store";
import { useCreateCartMutation } from "@/store/api/api-cart";
import {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
} from "@/store/api/api-product";
import type { Product, ProductDetail } from "@/types/product";
import type { ValueChanged } from "@/types/value-change";
import type { VoidCallBack } from "@/types/void-call-back";
import { createContext, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";

type DetailProviderParam = {
  children: ReactNode;
};

type DetailProviderValue = {
  product?: ProductDetail;
  relatedProducts: Product[];
  createCart: VoidCallBack;
  setCountOrdered: ValueChanged<number>;
  countOrdered: number;
  isLoadingProduct: boolean;
  isFetchingProduct: boolean;
  isLoadingRelatedProducts: boolean;
  isFetchingRelatedProducts: boolean;
  isLoadingCreateCart: boolean;
};

export const DetailContext = createContext<DetailProviderValue | null>(null);

export function DetailProvider({ children }: DetailProviderParam) {
  const navigate = useNavigate();
  const userId = useAppSelector((store) => store.auth.user?.id || "0");
  const { id } = useParams();
  const idInt = parseInt(id ?? "0");
  const userIdInt = parseInt(userId);

  const [countOrdered, setCountOrdered] = useState(1);
  const [
    createCart,
    { isUninitialized, isSuccess, isLoading: isLoadingCreateCart },
  ] = useCreateCartMutation();

  if (!isUninitialized && isSuccess) {
    navigate("/cart");
  }

  function handleCreateCart() {
    createCart({
      quantity: countOrdered,
      singlePrice: 0,
      userId: userIdInt,
      productId: idInt,
    });
  }

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
        createCart: handleCreateCart,
        isLoadingCreateCart,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
}
