import { DashboardPageLayout } from "@/pages/dashboard/components/layouts/dashboardpage-layout";
import { ContainerTotal } from "./components/ui/container-total";
import iconTotalOrder from "@/assets/images/total-order.png";
import iconTotalSale from "@/assets/images/total-sale.png";
import iconTotalPending from "@/assets/images/total-peding.png";
import { useGetTotalDashboardQuery } from "@/store/api/admin";

export const MainPage = () => {
  const { data } = useGetTotalDashboardQuery();
  return (
    <DashboardPageLayout title="Dashboard">
      <div className="flex gap-6">
        <ContainerTotal
          title="Total User"
          value={data?.totalUsers || 0}
          bgColor="bg-[#E0DFFF]"
        />
        <ContainerTotal
          title="Total Order"
          value={data?.totalOrders || 0}
          bgColor="bg-[#FEEFCC]"
          icon={
            <img
              src={iconTotalOrder}
              alt="Total Users"
              className="h-9 w-9 object-contain"
            />
          }
        />
        <ContainerTotal
          title="Total Sale"
          value={data?.totalSales || 0}
          bgColor="bg-[#C4F4DC]"
          icon={
            <img
              src={iconTotalSale}
              alt="Total Users"
              className="h-9 w-9 object-contain"
            />
          }
        />
        <ContainerTotal
          title="Total Pending"
          value={data?.totalPending || 0}
          bgColor="bg-[#FFDCCF]"
          icon={
            <img
              src={iconTotalPending}
              alt="Total Users"
              className="h-9 w-9 object-contain"
            />
          }
        />
      </div>
    </DashboardPageLayout>
  );
};
