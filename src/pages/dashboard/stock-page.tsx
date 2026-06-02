import { SearchComponent } from "@/components/ui/search-component";
import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { ProductTable } from "./components/ui/product-stock-table";
import type { ProductStock } from "@/types/product-stock";
import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";
import { StockEditModal } from "./components/ui/stock-edit-modal";

const sampleProducts = [
  {
    id: 1,
    images: ["https://i.imgur.com/8Z2v8zL.png"],
    name: "Apple Watch Series 4",
    category: "Digital Product",
    price: 690.0,
    stock: 63,
    colors: ["#000000", "#9CA3AF", "#F43F5E"],
  },
  {
    id: 2,
    images: ["https://i.imgur.com/2f3vXjK.png"],
    name: "Microsoft Headsquare",
    category: "Digital Product",
    price: 190.0,
    stock: 13,
    colors: ["#000000", "#F43F5E", "#3B82F6", "#EAB308"],
  },
];
export const StockPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<ProductStock | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };

  const handleEdit = (product: ProductStock) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  const handleSaveStock = (id: number, newStock: number) => {
    console.log(`Cập nhật stock cho sản phẩm ${id}: ${newStock}`);
    // TODO: Gọi API cập nhật stock
    alert(`Đã cập nhật số lượng thành ${newStock}`);
  };

  return (
    <DashboardPageLayout title={"Product Stock"}>
      <div className="flex">
        <div className="w-96">
          <SearchComponent />
        </div>
        <div className="flex-1"></div>
      </div>
      <ProductTable
        products={sampleProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={10}
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
