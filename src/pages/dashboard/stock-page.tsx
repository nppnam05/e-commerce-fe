import { SearchComponent } from "@/components/ui/search-component";
import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { ProductTable } from "./components/ui/product-stock-table";
import { Pagination } from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { StockEditModal } from "./components/ui/stock-edit-modal";
import { page } from "@/constant/paginate";
import {
  useGetAllProductStocksQuery,
  useUpdateStockMutation,
} from "@/store/api/api-stock";
import type { ProductStock } from "@/types/product";

export const StockPage = () => {
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

  const { data } = useGetAllProductStocksQuery({
    pageNumber: currentPage,
    pageSize: page.pageSize,
    keyword: keyword || undefined,
  });

  const [updateStock] = useUpdateStockMutation();

  const products = data?.data || [];

  const [selectedProduct, setSelectedProduct] = useState<ProductStock | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEdit = (product: ProductStock) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveStock = async (id: number, newQuantity: number) => {
    await updateStock({ id: id, quantity: newQuantity }).unwrap();
    setIsModalOpen(false);
  };

  return (
    <DashboardPageLayout title={"Product Stock"}>
      <div className="flex">
        <div className="w-96">
          <SearchComponent value={search} onChange={setSearch} />
        </div>
        <div className="flex-1"></div>
      </div>
      <ProductTable products={products} onEdit={handleEdit} />
      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      ></Pagination>

      <StockEditModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStock}
      />
    </DashboardPageLayout>
  );
};
