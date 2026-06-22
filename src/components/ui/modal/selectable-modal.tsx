import type { ValueChanged } from "@/types/value-change";
import { Dialog } from "radix-ui";
import { Button } from "../button";

type SelectableModalParams = {
  isOpen: boolean;
  toggleModal: ValueChanged<null | React.MouseEvent>;
  onSelected: ValueChanged<boolean>;
  selectableMessage: string;
};

export function SelectableModal({
  isOpen,
  toggleModal,
  onSelected,
  selectableMessage,
}: SelectableModalParams) {
  function handleSelected(e: React.MouseEvent, value: boolean) {
    toggleModal(e);
    onSelected(value);
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black opacity-20"
          onClick={toggleModal}
        ></Dialog.Overlay>
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white px-4 py-2 outline outline-zinc-400">
          <Dialog.Title className="text-center text-2xl text-blue-400">
            Information
          </Dialog.Title>
          <Dialog.Description className="my-4 text-start text-xl text-zinc-800">
            {selectableMessage}
          </Dialog.Description>
          <Dialog.Close className="flex w-full items-center justify-around">
            <Button onClick={(e) => handleSelected(e, true)}>Yes</Button>
            <Button onClick={(e) => handleSelected(e, false)}>No</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
