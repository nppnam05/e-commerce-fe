import {
  useUpdateCartMutation,
  useDeleteCartMutation,
  useGetAllCartsByUserIdQuery,
  type UpdateCartRequest,
} from "@/store/api/api-cart";
import { useState } from "react";
import { useGetAddressesByUserIdQuery } from "@/store/api/api-address";
import type { Cart } from "@/types/cart";
import type { Address } from "@/types/address";
import type { ValueChanged } from "@/types/value-change";
import { createContext, type ReactNode } from "react";

type CartContextProviderParam = {
  children: ReactNode;
  userId: number;
};

type CartContextValueType = {
  addresses: Address[];
  carts: Cart[];
  isLoading: boolean;
  isFetching: boolean;
  isLoadingAddress: boolean;
  isFetchingAddress: boolean;
  addressPage: number;
  setAddressPage: ValueChanged<number>;
  deleteCart: ValueChanged<number>;
  updateCart: ValueChanged<UpdateCartRequest>;
} | null;

export const CartContext = createContext<CartContextValueType | null>(null);

export function CartContextProvider({
  children,
  userId,
}: CartContextProviderParam) {
  const [addressPage, setAddressPage] = useState(1);

  const {
    data: paginationAddress,
    isLoading: isLoadingAddress,
    isFetching: isFetchingAddress,
  } = useGetAddressesByUserIdQuery({
    userId: userId.toString(),
    params: {
      pageNumber: addressPage,
      pageSize: 10,
    },
  });

  const addresses = paginationAddress?.data ?? [];

  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const getAllCartByUserId = useGetAllCartsByUserIdQuery(userId); 
  const {data, isLoading, isFetching} = getAllCartByUserId;
  // let { data, isLoading, isFetching } = useGetAllCartsByUserIdQuery(userId);

  const carts = data?.data ?? [];

  function handleUpdateCart({ id, quantity }: UpdateCartRequest) {
    const request: UpdateCartRequest = {
      id,
      quantity,
      singlePrice: 0,
    };
    updateCart(request);
  }

  function handleDeleteCart(id: number) {
    deleteCart(id);
  }

  const value: CartContextValueType = {
    carts,
    addresses,
    isLoading,
    isFetching,
    deleteCart: handleDeleteCart,
    updateCart: handleUpdateCart,
    isLoadingAddress,
    isFetchingAddress,
    addressPage,
    setAddressPage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
