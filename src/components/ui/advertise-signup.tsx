import { X } from "lucide-react";
import { useState } from "react";

export function AdvertiseSignup() {
  const [isShow, setIsShow] = useState(true);

  return isShow ? (
    <div className="flex items-center justify-center bg-black px-40 py-2">
      <span className="flex grow items-center justify-center">
        <span className="pr-1 text-sm text-zinc-400">
          Sign up an get 20% off to your first order.
        </span>
        <a
          className="text-sm font-bold text-zinc-100 underline underline-offset-2"
          href="#"
        >
          Sign up now
        </a>
      </span>
      <span
        className="cursor-pointer text-zinc-100"
        onClick={() => setIsShow(false)}
      >
        <X width={20} height={20} />
      </span>
    </div>
  ) : (
    <></>
  );
}
