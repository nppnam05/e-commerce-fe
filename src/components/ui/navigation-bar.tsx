import { Menu, Search } from "lucide-react";
import { DropdownButton } from "./dropdown-button";
import { Input } from "./input";
import Cart from "@/assets/svgs/cart.svg?react";
import Profile from "@/assets/svgs/profile.svg?react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/store";
import { Avatar } from "./avatar";
import { useState } from "react";
import { MenuItem } from "./menu-item";
import { DropdownMenuItem } from "./dropdown-menu-item";

export function NavigationBar() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );
  const handleAvatarClick = () => {
    navigate("/profile");
  };

  const handleShopClick = () => {
    navigate("/home");
  };
  const handleCartClick = () => {
    navigate("/cart");
  };

  const [isShowDrawerBar, setIsShowDrawerBar] = useState(true);
  const [isShowSearchBar, setIsShowSearchBar] = useState(true);
  const [search, setSearch] = useState("");

  function handleToggleDrawerBar() {
    setIsShowDrawerBar((isShowDrawerBar) => !isShowDrawerBar);
  }

  function handleToggleSearchBar() {
    setIsShowSearchBar((isShowSearchBar) => !isShowSearchBar);
  }

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 lg:px-18 lg:py-8">
        <div className="inline-flex w-fit items-center">
          <Menu
            width={30}
            className="inline cursor-pointer stroke-3 md:hidden"
            onClick={handleToggleDrawerBar}
          />
          <span
            className="cursor-pointer text-4xl font-bold"
            onClick={handleShopClick}
          >
            SHOP.CO
          </span>
        </div>
        <DropdownButton name="Shop" className="hidden md:inline">
          <div className="h-7 w-3xs">hello</div>
        </DropdownButton>
        <span className="hidden cursor-pointer text-base md:inline">
          On Sale
        </span>
        <span className="hidden cursor-pointer text-base md:inline">
          New Arrivals
        </span>
        <span className="hidden cursor-pointer text-base md:inline">
          Brands
        </span>
        <span className="hidden md:inline">
          <Input
            icon={<Search width={30} />}
            placeholder="Search"
            variant="primary"
            value={search}
            onChange={handleChangeSearch}
          />
        </span>
        <div className="flex gap-2">
          <Search
            width={30}
            className="inline cursor-pointer md:hidden"
            onClick={handleToggleSearchBar}
          />
          <Cart
            width={30}
            className="cursor-pointer"
            onClick={handleCartClick}
          />
          {isAuthenticated ? (
            <Avatar
              src={user?.avatar}
              name={user?.displayName}
              onClick={() => handleAvatarClick()}
            />
          ) : (
            <Profile
              width={30}
              className="cursor-pointer"
              onClick={() => handleAvatarClick()}
            />
          )}
        </div>
      </div>
      {isShowSearchBar && (
        <div className="block px-4 md:hidden">
          <Input
            icon={<Search width={30} />}
            placeholder="Search"
            variant="primary"
            className="my-2"
            value={search}
            onChange={handleChangeSearch}
          />
        </div>
      )}
      {isShowDrawerBar && (
        <div className="flex flex-col gap-2 md:hidden">
          <DropdownMenuItem name="Shop">
            <MenuItem name="hello" />
          </DropdownMenuItem>
          <MenuItem name="On Sale" />
          <MenuItem name="New Arrivals" />
          <MenuItem name="Brands" />
        </div>
      )}
    </>
  );
}
