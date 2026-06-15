import {
  BreadcrumbNavigation,
  type BreadcrumbItem,
} from "@/components/ui/breadcrumb-navigation";
import ProductDetail from "./components/ui/product-detail";
import RatingAndReviewSection from "./components/ui/rating-review-section";
import { DetailProvider } from "./components/context/detail-context";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/home" },
  { label: "Detail" },
];

export function DetailPage() {
  return (
    <DetailProvider>
      <div className="mx-8 lg:mx-16">
        <BreadcrumbNavigation
          breadcumbItems={breadcrumbItems}
          className="mb-4"
        />
        <ProductDetail />
        <RatingAndReviewSection />
      </div>
    </DetailProvider>
  );
}
