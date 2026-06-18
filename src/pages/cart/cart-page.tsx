import {
  BreadcrumbNavigation,
  type BreadcrumbItem,
} from "@/components/ui/breadcrumb-navigation";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { CartContextProvider } from "./components/context/cart-context";
import ContentSection from "./components/ui/content-section";
const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/home" },
  { label: "Cart" },
];

export function CartPage() {
  const customer = useSelector((store: RootState) => store.auth.user?.id);

  if (customer === undefined) {
    return null;
  }

  return (
    <CartContextProvider userId={parseInt(customer!)}>
      <div className="px-4 md:px-8">
        <BreadcrumbNavigation
          breadcumbItems={breadcrumbItems}
          className="mb-4"
        />
        <ContentSection />
      </div>
    </CartContextProvider>
  );
}
