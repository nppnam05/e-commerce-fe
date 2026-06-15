import type { OrderUser } from "@/types/order";
import { formatDateTime, formatVND } from "@/utils/format";
import { StatusBadge } from "./status-badge";
import { useNavigate } from "react-router-dom";

interface OrderCardProps {
  order: OrderUser;
}

export const OrderCard = ({ order }: OrderCardProps) => {
  const navigate = useNavigate();
  const handleViewDetail = () => {
    navigate(`/profile/orders/${order.id}`);
  };
  return (
    <div
      className="cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md active:scale-[0.99] dark:border-gray-700 dark:hover:border-gray-600"
      onClick={handleViewDetail}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-lg font-semibold text-gray-900">
            Đơn hàng {order.code}
          </div>
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {formatDateTime(order.createdOn, "short")} • {order.totalQuantity}{" "}
            sản phẩm
          </div>
        </div>

        <div className="text-right">
          <div className="mb-1 text-xl font-bold text-gray-900">
            {formatVND(order.totalPrice)}
          </div>
          <StatusBadge status={order.status}></StatusBadge>
        </div>
      </div>
    </div>
  );
};
