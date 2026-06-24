import { useGetAddressesByUserIdQuery } from "@/store/api/api-address";
import {
  useDeleteCartMutation,
  useGetAllCartsByUserIdQuery,
  useUpdateCartMutation,
  type UpdateCartRequest,
} from "@/store/api/api-cart";
import type { Address } from "@/types/address";
import type { Cart } from "@/types/cart";
import type { ValueChanged } from "@/types/value-change";
import { useState } from "react";

type CartHookParam = {
  userId: number;
};

type CartHookValue = {
  data: {
    addresses: Address[];
    carts: Cart[];
  };
  state: {
    carts: {
      isLoading: boolean;
      isFetching: boolean;
    };
    address: {
      isLoading: boolean;
      isFetching: boolean;
    };
  };
  actions: {
    deleteCart: ValueChanged<number>;
    updateCart: ValueChanged<UpdateCartRequest>;
  };
  pagination: {
    addressPage: number;
    setAddressPage: ValueChanged<number>;
  };
};

export function useCartHook({ userId }: CartHookParam) {
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
  const { data, isLoading, isFetching } = getAllCartByUserId;
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

  const value: CartHookValue = {
    data: {
      addresses: addresses, 
      carts: carts,
    },
    state: {
      carts: {
        isLoading: isLoading,
        isFetching: isFetching,
      }, 

    }
    actions:{

    },
    pagination: {

    }
  };

  return value;
}
