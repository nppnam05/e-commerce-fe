import { useGetAddressesByUserIdQuery } from "@/store/api/api-address";
import {
  useDeleteCartMutation,
  useGetAllCartsByUserIdQuery,
  useUpdateCartMutation,
  type UpdateCartRequest,
} from "@/store/api/api-cart";
import { useCreateOrderMutation } from "@/store/api/api-order";
import { useGetPaymentUrlMutation } from "@/store/api/api-pay";
import type { Address } from "@/types/address";
import type { Cart } from "@/types/cart";
import type { ValueChanged } from "@/types/value-change";
import type { VoidCallBack } from "@/types/void-call-back";
import { useState } from "react";

type CartControllerParam = {
  userId: string;
};

type CartControllerValue = {
  data: {
    addresses: Address[];
    carts: Cart[];
    totalPrice: number;
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
  action: {
    deleteCart: ValueChanged<number>;
    updateCart: ValueChanged<UpdateCartRequest>;
    order: VoidCallBack;
  };
  pagination: {
    selectedAddress: Address | null;
    setSelectedAddress: ValueChanged<Address>;
    addressPage: number;
    setAddressPage: ValueChanged<number>;
    totalPages: number;
  };
  modal: {
    address: {
      isShowModal: boolean;
      toggleShowModal: ValueChanged<React.MouseEvent | null>;
    };
    isOrder: {
      isShowModal: boolean;
      toggleShowModal: ValueChanged<React.MouseEvent | null>;
      handleSelected: ValueChanged<boolean>;
    };
    isDelete: {
      isShowModal: boolean;
      toggleShowModal: ValueChanged<React.MouseEvent | null>;
      handleSelected: ValueChanged<boolean>;
    };
    errorOrder: {
      isShowModal: boolean;
      toggleShowModal: ValueChanged<React.MouseEvent | null>;
    };
    qr: {
      isShowModal: boolean;
      toggleShowModal: ValueChanged<React.MouseEvent | null>;
      qrCode: string | null;
    };
  };
};

export function useCartController({ userId }: CartControllerParam) {
  const [addressPage, setAddressPage] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedDeleteItem, setSelectedDeleteItem] = useState<number | null>(
    null,
  );
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalErrorOrder, setIsShowErrorOrderModal] = useState(false);
  const [isShowModalIsOrder, setIsShowModalIsOrder] = useState(false);
  const [isShowModalIsDelete, setIsShowModalIsDelete] = useState(false);
  const [isShowQRModal, setIsShowQRModal] = useState(false);
  function handleToggleShowAddressModal(e?: React.MouseEvent) {
    e?.stopPropagation();
    console.log("toggle show address");
    setIsShowModal((isShowModal) => !isShowModal);
  }
  function handleToggleShowErrorOrderModal(e?: React.MouseEvent) {
    e?.stopPropagation();
    setIsShowErrorOrderModal((isShow) => !isShow);
  }
  function handleToggleShowIsOrderModal(e?: React.MouseEvent) {
    e?.stopPropagation();
    setIsShowModalIsOrder((isShow) => !isShow);
  }
  function handleToggleShowIsDeleteModal(e?: React.MouseEvent) {
    e?.stopPropagation();
    setIsShowModalIsDelete((isShow) => !isShow);
  }
  function handleToggleShowQRModal(e?: React.MouseEvent) {
    e?.stopPropagation();
    setIsShowQRModal((isShow) => !isShow);
  }

  const [createOrder] = useCreateOrderMutation();
  const [getPaymentUrl] = useGetPaymentUrlMutation();

  async function handleSelectedIsOrder(isOrder: boolean) {
    if (isOrder === false) return;

    try {
      const order = await createOrder({
        userId: parseInt(userId),
        addressId: selectedAddress?.id ?? 1,
      }).unwrap();
      console.log("order:", order.id);

      const payment = await getPaymentUrl(order.id).unwrap();
      console.log("payment:", payment);
      setPaymentUrl(payment.qrCode);
      setIsShowModalIsOrder(false);
      setIsShowQRModal(true);
    } catch (err) {
      console.log(err);
    }
  }

  const {
    data: paginationAddress,
    isLoading: isLoadingAddress,
    isFetching: isFetchingAddress,
  } = useGetAddressesByUserIdQuery({
    userId: userId,
    params: {
      pageNumber: addressPage,
      pageSize: 10,
    },
  });

  const addresses = paginationAddress?.data ?? [];
  const totalPages = paginationAddress?.totalPages ?? 0;

  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();

  const getAllCartByUserId = useGetAllCartsByUserIdQuery(parseInt(userId));
  const { data, isLoading, isFetching } = getAllCartByUserId;
  // let { data, isLoading, isFetching } = useGetAllCartsByUserIdQuery(userId);

  const carts = data?.data ?? [];

  const totalPrice = carts
    .map((cart) => cart.singlePrice * cart.quantity)
    .reduce((prev, now) => prev + now, 0);

  function handleUpdateCart({ id, quantity }: UpdateCartRequest) {
    const request: UpdateCartRequest = {
      id,
      quantity,
      singlePrice: 0,
    };
    updateCart(request);
  }

  function handleDeleteCart(id: number) {
    setSelectedDeleteItem(id);
    handleToggleShowIsDeleteModal();
  }

  function handleSetSelectedAddress(address: Address) {
    setSelectedAddress(address);
    handleToggleShowAddressModal();
  }

  function handleOrder() {
    if (selectedAddress === null) {
      handleToggleShowAddressModal();
      return;
    }

    if (carts.length === 0) {
      handleToggleShowErrorOrderModal();
      return;
    }

    handleToggleShowIsOrderModal();
  }

  function handleSelectedIsDelete(isDelete: boolean) {
    if (!isDelete) return;

    if (selectedDeleteItem === null) return;

    deleteCart(selectedDeleteItem);
  }

  const value: CartControllerValue = {
    data: {
      addresses: addresses,
      carts: carts,
      totalPrice: totalPrice,
    },
    state: {
      carts: {
        isLoading: isLoading,
        isFetching: isFetching,
      },
      address: {
        isLoading: isLoadingAddress,
        isFetching: isFetchingAddress,
      },
    },
    action: {
      deleteCart: handleDeleteCart,
      updateCart: handleUpdateCart,
      order: handleOrder,
    },
    pagination: {
      selectedAddress: selectedAddress,
      setSelectedAddress: handleSetSelectedAddress,
      addressPage: addressPage,
      setAddressPage: setAddressPage,
      totalPages: totalPages,
    },
    modal: {
      address: {
        isShowModal: isShowModal,
        toggleShowModal: handleToggleShowAddressModal,
      },
      isOrder: {
        isShowModal: isShowModalIsOrder,
        toggleShowModal: handleToggleShowIsOrderModal,
        handleSelected: handleSelectedIsOrder,
      },
      isDelete: {
        isShowModal: isShowModalIsDelete,
        toggleShowModal: handleToggleShowIsDeleteModal,
        handleSelected: handleSelectedIsDelete,
      },
      errorOrder: {
        isShowModal: isShowModalErrorOrder,
        toggleShowModal: handleToggleShowErrorOrderModal,
      },
      qr: {
        isShowModal: isShowQRModal,
        toggleShowModal: handleToggleShowQRModal,
        qrCode: paymentUrl,
      },
    },
  };

  return value;
}
