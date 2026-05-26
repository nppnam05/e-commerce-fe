import { Pagination } from "@/components/ui/pagination";
import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { TopBar } from "./components/layouts/topbar";
import { ProductCard } from "./components/ui/product-card";
import { useState } from "react";

const products = [
  {
    id: 1,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 2,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 3,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 4,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 5,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 6,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 7,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 8,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 9,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 10,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
  {
    id: 11,
    img: "https://www.pixelstalk.net/wp-content/uploads/2016/07/3840x2160-Images-Free-Download.jpg",
    name: "asdadsd",
    category: "asasdadas",
    money: 1000000,
  },
];
export const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };
  return (
    <div>
      <TopBar />
      <DashboardPageLayout title="Products">
        <div className="grid grid-cols-3 gap-6">
          {products.map((pro) => {
            return (
              <ProductCard
                key={pro.id}
                id={pro.id}
                img={pro.img}
                name={pro.name}
                money={pro.money}
              ></ProductCard>
            );
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={handlePageChange}
        ></Pagination>
      </DashboardPageLayout>
    </div>
  );
};
