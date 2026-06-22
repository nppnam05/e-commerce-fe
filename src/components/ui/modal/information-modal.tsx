import type { ValueChanged } from "@/types/value-change";
import { Dialog } from "radix-ui";
import { Button } from "../button";

type InformationModalParams = {
  isOpen: boolean;
  toggleModal: ValueChanged<null | React.MouseEvent>;
  informationMessage: string;
};

export function InformationModal({
  isOpen,
  toggleModal,
  informationMessage,
}: InformationModalParams) {
  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black opacity-20"
          onClick={toggleModal}
        ></Dialog.Overlay>
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-4 py-2 outline outline-zinc-400">
          <Dialog.Title className="text-center text-2xl text-red-500">
            Information
          </Dialog.Title>
          <Dialog.Description className="my-4 text-start text-xl text-zinc-800">
            {informationMessage}
          </Dialog.Description>
          <Dialog.Close className="flex w-full items-center justify-center">
            <Button onClick={toggleModal}>close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
