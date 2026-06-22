import type { VoidCallBack } from "@/types/void-call-back";
import { type ReactNode } from "react";

type ModalParam = {
  className?: string;
  isShowModal: boolean;
  onClickOutsideModal: VoidCallBack;
  children: ReactNode;
};

export function Modal({
  isShowModal,
  onClickOutsideModal,
  children,
}: ModalParam) {
  return (
    <div
      className={`fixed inset-0 h-screen w-screen bg-zinc-900/20 p-20 ${isShowModal ? "block" : "hidden"}`}
      onClick={onClickOutsideModal}
    >
      <div onClick={(e) => e.stopPropagation()} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
