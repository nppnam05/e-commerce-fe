import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { ProductOrderDetailTable } from "./components/ui/order-detail-table";
import { Button } from "@/components/ui/button";
import { useGetOrderDetailQuery } from "@/store/api/api-order";
import { formatVND } from "@/utils/format";
import { useParams } from "react-router-dom";
import { StatusBadge } from "./components/ui/status-badge";
import { useUpdateStatusOrderMutation } from "@/store/api/api-order";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const { data } = useGetOrderDetailQuery(Number(id));
  const [updateStatus] = useUpdateStatusOrderMutation();
  const products = data?.products || [];

  const handleShip = async () => {
    try {
      const result = await updateStatus({
        id: Number(id),
        status: "SHP",
      }).unwrap();
      if (result) {
        window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async () => {
    try {
      const result = await updateStatus({
        id: Number(id),
        status: "REJ",
      }).unwrap();
      if (result) {
        window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleComplete = async () => {
    try {
      const result = await updateStatus({
        id: Number(id),
        status: "COM",
      }).unwrap();
      if (result) {
        window.history.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardPageLayout title="Order Detail">
      {data && (
        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6">
          <div className="grid grid-cols-2 gap-4 text-base">
            <div>
              <p className="text-gray-500">Mã đơn hàng</p>
              <p className="font-semibold text-gray-800">{data.code}</p>
            </div>

            <div>
              <p className="text-gray-500">Trạng thái</p>
              <StatusBadge status={data.status} />
            </div>

            <div>
              <p className="text-gray-500">Khách hàng</p>
              <p className="font-semibold text-gray-800">{data.customerName}</p>
            </div>

            <div>
              <p className="text-gray-500">Địa chỉ</p>
              <p className="font-semibold text-gray-800">{data.address}</p>
            </div>

            <div>
              <p className="text-gray-500">Ngày tạo</p>
              <p className="font-semibold text-gray-800">
                {new Date(data.createdOn).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Tổng tiền</p>
              <p className="font-bold text-blue-600">
                {formatVND(data.totalAmount)}
              </p>
            </div>
          </div>
        </div>
      )}

      <ProductOrderDetailTable products={products} />

      {data?.status === "PND" && (
        <div className="mt-5 flex justify-end gap-5">
          <Button
            variant="custom"
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleShip}
          >
            Ship
          </Button>

          <Button
            variant="custom"
            className="bg-red-600 text-white hover:bg-red-700"
            onClick={handleReject}
          >
            Reject
          </Button>
        </div>
      )}

      {data?.status === "SHP" && (
        <div className="mt-5 flex justify-end gap-5">
          <Button
            variant="custom"
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={handleComplete}
          >
            Complete
          </Button>
        </div>
      )}
    </DashboardPageLayout>
  );
};
