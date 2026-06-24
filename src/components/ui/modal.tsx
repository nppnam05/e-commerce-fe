import type { VoidCallBack } from "@/types/void-call-back";
import { type ReactNode } from "react";

type ModalParam = {
  className: string;
  isShowModal: boolean;
  onClickOutsideModal: VoidCallBack;
  children: ReactNode;
};

export function Modal({
  className,
  isShowModal,
  onClickOutsideModal,
  children,
}: ModalParam) {
  return (
    <div
      className={`absolute inset-0 bg-zinc-900 opacity-20 ${isShowModal ? "block" : "hidden"}`}
      onClick={onClickOutsideModal}
    >
      <div className={className}>{children}</div>
    </div>
  );
}
