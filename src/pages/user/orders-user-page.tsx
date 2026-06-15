import { useGetMeOrderQuery } from "@/store/api/api-user";
import { OrderCard } from "./components/ui/order-card";
import { Pagination } from "@/components/ui/pagination";
import { useState } from "react";
import { page } from "@/constant/paginate";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export const OrdersUserPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data } = useGetMeOrderQuery({
    userId: user.id,
    params: {
      pageNumber: currentPage,
      pageSize: page.pageSize,
    },
  });
  const orders = data?.data || [];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">Đơn hàng của tôi</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order}></OrderCard>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      ></Pagination>
    </div>
  );
};
