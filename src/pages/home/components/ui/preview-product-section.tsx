import { RowDivident } from "@/components/ui/row-divident";
import HomeCategorySection from "./home-category-section";
import { HomeItemsSection } from "./home-items-section";
import { useContext } from "react";
import { HomeContext } from "../context/home-context";

type ReviewProductSectionParam = {
  className: string;
};

export default function ReviewProductSection({
  className,
}: ReviewProductSectionParam) {
  const { products, isLoading, isFetching } = useContext(HomeContext);

  return (
    <section className={`${className}`}>
      <HomeItemsSection
        name="Top Selling"
        products={products}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      <RowDivident />
      <HomeItemsSection
        name="Top Selling"
        products={products}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      <HomeCategorySection />
    </section>
  );
}
