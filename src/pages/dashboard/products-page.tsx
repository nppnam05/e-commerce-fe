import { Pagination } from "@/components/ui/pagination";
import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { TopBar } from "./components/layouts/topbar";
import { ProductCard } from "./components/ui/product-card";
import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "@/store/api/api-product";
import { page } from "@/constant/paginate";

export const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setKeyword(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data } = useGetAllProductsQuery({
    pageNumber: currentPage,
    pageSize: page.pageSize,
    keyword: keyword || undefined,
  });

  const products = data?.data || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <TopBar searchValue={search} onSearchChange={setSearch} />
      <DashboardPageLayout title="Products">
        <div className="grid grid-cols-3 gap-6 py-4">
          {products.map((pro) => {
            return (
              <ProductCard
                key={pro.id}
                id={pro.id}
                img={pro.imageUrl[0]}
                name={pro.name}
                money={pro.price}
              ></ProductCard>
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages}
          onPageChange={handlePageChange}
        ></Pagination>
      </DashboardPageLayout>
    </div>
  );
};
