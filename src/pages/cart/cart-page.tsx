import {
  BreadcrumbNavigation,
  type BreadcrumbItem,
} from "@/components/ui/breadcrumb-navigation";
import Item from "./components/ui/item";
import { useState } from "react";
import ListItem, { type ListItemInput } from "./components/ui/list-item";
import aoThun from "@/assets/images/ao_thun.jpg";
import SumaryPrice from "./components/ui/sumary-price";
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/home" },
  { label: "Cart" },
];

const fakeListItem: ListItemInput = {
  items: [
    {
      name: "ao thun",
      value: 1,
      color: "brown",
      id: 1,
      image: aoThun,
      price: 100000,
      size: "Medium",
    },
    {
      name: "ao thun",
      value: 1,
      color: "brown",
      id: 1,
      image: aoThun,
      price: 100000,
      size: "Medium",
    },
    {
      name: "ao thun",
      value: 1,
      color: "brown",
      id: 1,
      image: aoThun,
      price: 100000,
      size: "Medium",
    },
  ],
};

export function CartPage() {
  return (
    <div className="px-4 md:px-8">
      <BreadcrumbNavigation breadcumbItems={breadcrumbItems} className="mb-4" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <ListItem items={fakeListItem.items} />
        <SumaryPrice className="col-span-1 md:col-span-2" />
      </div>
    </div>
  );
}
