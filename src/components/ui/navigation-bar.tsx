import { DropdownButton } from "./dropdown-button";
import { Input } from "./input";
import Cart from "@/assets/svgs/cart.svg?react";
import Profile from "@/assets/svgs/profile.svg?react";

export function NavigationBar() {
  return (
    <div className="flex items-center justify-between px-18 py-8">
      <span className="cursor-pointer text-4xl font-bold">SHOP.CO</span>
      <DropdownButton>
        <div className="h-7 w-3xs">hello</div>
      </DropdownButton>
      <span className="cursor-pointer text-base">On Sale</span>
      <span className="cursor-pointer text-base">New Arrivals</span>
      <span className="cursor-pointer text-base">Brands</span>
      <Input variant="primary" />
      <div className="flex gap-2">
        <Cart width={30} className="cursor-pointer" />
        <Profile width={30} className="cursor-pointer" />
      </div>
    </div>
  );
}
