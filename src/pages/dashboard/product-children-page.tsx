import { Pagination } from "@/components/ui/pagination";
import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { useState, useEffect } from "react";
import { useGetProductFiltersQuery } from "@/store/api/api-product";
import { SearchComponent } from "@/components/ui/search-component";
import { Filter } from "lucide-react";
import { SelectInput } from "./components/ui/select-input";
import { useGetAllProductChildrenQuery } from "@/store/api/api-product-children";
import { ProductChildrenTable } from "./components/ui/product-children-table";

export const ProductChildrenPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const { data: productFilter } = useGetProductFiltersQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data } = useGetAllProductChildrenQuery({
    pageNumber: currentPage,
    pageSize: 6,
    keyword,
    productId: selectedProductId ? parseInt(selectedProductId) : undefined,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProductChange = (value: string) => {
    setSelectedProductId(value);
    setCurrentPage(1);
  };
  return (
    <div>
      <DashboardPageLayout title="Products Children">
        <div className="flex gap-4">
          <div className="w-96">
            <SearchComponent value={search} onChange={setSearch} />
          </div>
          <div className="flex items-center gap-4 font-medium text-gray-600">
            <Filter size={20} />
            <span>Filter By</span>
            <SelectInput
              defaultLabel="Product Name"
              options={
                productFilter?.map((filter) => {
                  return {
                    value: filter.id.toString(),
                    label: filter.name,
                  };
                }) ?? []
              }
              value={selectedProductId}
              onChange={handleProductChange}
            />
          </div>
        </div>
        <ProductChildrenTable products={data?.data || []} />

        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages ?? 1}
          onPageChange={handlePageChange}
        ></Pagination>
      </DashboardPageLayout>
    </div>
  );
};
