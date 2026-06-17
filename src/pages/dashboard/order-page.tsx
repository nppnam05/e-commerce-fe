import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { Filter } from "lucide-react";
import { OrderTable } from "./components/ui/order-table";
import { SimpleDatePicker } from "./components/ui/date-picker";
import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { useGetOrdersQuery } from "@/store/api/api-order";
import { page } from "@/constant/paginate";
import { SelectInput } from "./components/ui/select-input";
import type { Order } from "@/types/order";
import { useNavigate } from "react-router-dom";

export const statusOptions = [
  { value: "PND", label: "Pending" },
  { value: "REJ", label: "Rejected" },
  { value: "SHP", label: "Shipped" },
  { value: "COM", label: "Completed" },
];
export const OrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onEdit = (order: Order) => {
    navigate(`/dashboard/order/${order.id}`);
  };

  const { data } = useGetOrdersQuery({
    pageNumber: currentPage,
    pageSize: page.pageSize,
    status: selectedStatus || undefined,
    dateTime: selectedDate || undefined,
  });

  const orders = data?.data || [];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  return (
    <DashboardPageLayout title="Order Lists">
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center gap-4 border-b border-gray-100 p-6 md:flex-row">
          <div className="flex items-center gap-2 font-medium text-gray-600">
            <Filter size={20} />
            <span>Filter By</span>
          </div>

          <div className="flex flex-1 flex-wrap gap-3">
            <SimpleDatePicker
              value={selectedDate}
              onChange={handleDateChange}
            />

            <SelectInput
              defaultLabel="Order Status"
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
            />
          </div>
        </div>

        <OrderTable orders={orders} onEdit={onEdit} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      ></Pagination>
    </DashboardPageLayout>
  );
};
