import type { Order } from "@/types/order";
import { formatDateTime } from "@/utils/format";
import { Edit2 } from "lucide-react";
import { StatusBadge } from "./status-badge";

interface OrderTableProps {
  orders: Order[];
  onEdit: (order: Order) => void;
}

export const OrderTable = ({ orders, onEdit }: OrderTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        <thead>
          <tr className="border-b border-gray-100 text-left text-sm font-medium text-gray-500">
            <th className="px-6 py-5">ID</th>
            <th className="px-6 py-5">CODE</th>
            <th className="px-6 py-5">NAME</th>
            <th className="px-6 py-5">ADDRESS</th>
            <th className="px-6 py-5">DATE</th>
            <th className="px-6 py-5">STATUS</th>
            <th className="px-6 py-5">ACTION</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="transition-colors hover:bg-gray-50">
              <td className="px-6 py-5 font-mono text-gray-700">{order.id}</td>
              <td className="px-6 py-5 font-medium">{order.code}</td>
              <td className="px-6 py-5 font-medium">{order.customerName}</td>
              <td className="px-6 py-5 text-sm text-gray-600">
                {order.address}
              </td>
              <td className="px-6 py-5 text-gray-600">
                {formatDateTime(order.createdOn, "short")}
              </td>
              <td className="px-6 py-5">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => onEdit(order)}
                    className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="py-20 text-center text-gray-500">
          Không tìm thấy đơn hàng nào
        </div>
      )}
    </div>
  );
};
