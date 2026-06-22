import {
  BreadcrumbNavigation,
  type BreadcrumbItem,
} from "@/components/ui/breadcrumb-navigation";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Modal } from "@/components/ui/modal";
import AddressSelector from "./components/ui/address-selector";
import ListItem from "./components/ui/list-item";
import { useCartController } from "./components/context/use-cart-controller";
import Label from "./components/ui/label";
import { RowDivident } from "@/components/ui/row-divident";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { formatAddress, formatVND } from "@/utils/format";
import { Dialog } from "radix-ui";
import { SelectableModal } from "@/components/ui/modal/selectable-modal";
import type { MouseEvent } from "react";
import { ErrorModal } from "@/components/ui/modal/error-modal";
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/home" },
  { label: "Cart" },
];

export function CartPage() {
  const customer = useSelector((store: RootState) => store.auth.user?.id);

  if (customer === undefined) {
    return null;
  }

  const { data, pagination, modal, action } = useCartController({
    userId: customer,
  });

  return (
    <div className="relative px-4 md:px-8">
      <BreadcrumbNavigation breadcumbItems={breadcrumbItems} className="mb-4" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <ListItem
          carts={data.carts}
          deleteCart={action.deleteCart}
          updateCart={action.updateCart}
        />

        <div className="col-span-1 flex flex-col gap-8 rounded-2xl px-4 py-4 outline outline-zinc-400 md:col-span-2">
          <div className="text-3xl font-bold">Order</div>
          <Label
            name="Subtotal"
            price={`${formatVND(data.totalPrice)} VND`}
            variant="secondary"
          />
          <Label
            name="Delivery Fee"
            price={`${formatVND(15000)} VND`}
            variant="secondary"
          />
          <RowDivident />
          <Label
            name="Total"
            price={`${formatVND(data.totalPrice + 15000)} VND`}
            variant="primary"
          />
          <div
            className="flex cursor-pointer justify-start gap-2"
            onClick={modal.address.toggleShowModal}
          >
            <span className="text-lg">Address: </span>
            <span className="text-lg">
              {pagination.selectedAddress
                ? formatAddress(pagination.selectedAddress)
                : "none"}
            </span>
          </div>
          <Button variant="superBlack" size="lg" onClick={action.order}>
            Go to checkout <ArrowRight className="inline" />
          </Button>
        </div>
      </div>

      {/* Dialog select address */}
      <Dialog.Root open={modal.address.isShowModal} modal={true}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 bg-black opacity-20"
            onClick={modal.address.toggleShowModal}
          ></Dialog.Overlay>
          <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[90vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2">
            <AddressSelector
              value={pagination.selectedAddress}
              onChange={pagination.setSelectedAddress}
              values={data.addresses}
              currentPage={pagination.addressPage}
              totalPages={pagination.totalPages}
              onChangePage={pagination.setAddressPage}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <ErrorModal
        isOpen={modal.errorOrder.isShowModal}
        toggleModal={modal.errorOrder.toggleShowModal}
        errorMessage={"you don't have anything in your cart"}
      ></ErrorModal>

      <SelectableModal
        isOpen={modal.isOrder.isShowModal}
        toggleModal={modal.isOrder.toggleShowModal}
        onSelected={modal.isOrder.handleSelected}
        selectableMessage={"Are you sure that you want to order"}
      ></SelectableModal>

      <SelectableModal
        isOpen={modal.isDelete.isShowModal}
        toggleModal={modal.isDelete.toggleShowModal}
        onSelected={modal.isDelete.handleSelected}
        selectableMessage={"Are you sure that you want to delete"}
      ></SelectableModal>
    </div>
  );
}
