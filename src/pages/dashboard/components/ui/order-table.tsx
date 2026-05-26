interface Order {
  id: string;
  name: string;
  address: string;
  date: string;
  type: string;
  status: "Completed" | "Processing" | "Rejected" | "On Hold" | "In Transit";
}

interface OrderTableProps {
  orders: Order[];
}

const StatusBadge = ({ status }: { status: Order["status"] }) => {
  const styles = {
    Completed: "bg-emerald-100 text-emerald-700",
    Processing: "bg-purple-100 text-purple-700",
    Rejected: "bg-red-100 text-red-700",
    "On Hold": "bg-amber-100 text-amber-700",
    "In Transit": "bg-indigo-100 text-indigo-700",
  };

  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export const OrderTable = ({ orders }: OrderTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        <thead>
          <tr className="border-b border-gray-100 text-left text-sm font-medium text-gray-500">
            <th className="px-6 py-5">ID</th>
            <th className="px-6 py-5">NAME</th>
            <th className="px-6 py-5">ADDRESS</th>
            <th className="px-6 py-5">DATE</th>
            <th className="px-6 py-5">TYPE</th>
            <th className="px-6 py-5">STATUS</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="transition-colors hover:bg-gray-50">
              <td className="px-6 py-5 font-mono text-gray-700">{order.id}</td>
              <td className="px-6 py-5 font-medium">{order.name}</td>
              <td className="px-6 py-5 text-sm text-gray-600">
                {order.address}
              </td>
              <td className="px-6 py-5 text-gray-600">{order.date}</td>
              <td className="px-6 py-5 text-gray-700">{order.type}</td>
              <td className="px-6 py-5">
                <StatusBadge status={order.status} />
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
