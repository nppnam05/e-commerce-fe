import Filter from "./components/ui/filter";
import CategoryContent, {
} from "./components/ui/category-content.tsx";
import { SlidersVertical, X } from "lucide-react";
import { useState } from "react";
import {
  BreadcrumbNavigation,
  type BreadcrumbItem,
} from "@/components/ui/breadcrumb-navigation";
import { CategoryProvider } from "./components/context/category-context.tsx";

const breadcrumbItems: BreadcrumbItem[] = [
  { label: "Home", href: "/home" },
  { label: "Casual" },
];

export default function CategoryPage() {
  const [isShowFilter, setIsShowFilter] = useState(false);

  return (
    <CategoryProvider>
      <div className="mx-4 md:mx-8">
        <BreadcrumbNavigation
          breadcumbItems={breadcrumbItems}
          className="mb-4"
        />
        <div className="flex flex-row justify-start gap-4">
          <Filter
            className="hidden lg:flex"
            icon={<SlidersVertical width={24} height={24} />}
          />
          <CategoryContent
            className="h-fit w-fit grow"
            onEnableFilter={() => setIsShowFilter(true)}
          />

          {isShowFilter && (
            <div className="bg-black-[50%] fixed inset-0 flex justify-end overflow-scroll md:hidden">
              <Filter
                className="flex h-fit w-full bg-white"
                onApplyFilter={() => setIsShowFilter(false)}
                icon={<X width={30} onClick={() => setIsShowFilter(false)} />}
              />
            </div>
          )}
        </div>
      </div>
    </CategoryProvider>
  );
}
