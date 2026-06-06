import { DashboardPageLayout } from "@/pages/dashboard/components/layouts/dashboardpage-layout";
import { ContainerTotal } from "./components/ui/container-total";
import iconTotalOrder from "@/assets/images/total-order.png";
import iconTotalSale from "@/assets/images/total-sale.png";
import iconTotalPending from "@/assets/images/total-peding.png";
import { useGetTotalDashboardQuery } from "@/store/api/admin";
import { SalesChart } from "./components/ui/sales-chart";
import { useGetMonthlyRevenueQuery } from "@/store/api/api-order";

export const MainPage = () => {
  const { data } = useGetTotalDashboardQuery();
  const { data: monthlyRevenue } = useGetMonthlyRevenueQuery();


  return (
    <DashboardPageLayout title="Dashboard">
      <div className="mb-8 flex gap-6">
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
      <div className="w-full">
        <SalesChart data={monthlyRevenue} />
      </div>
    </DashboardPageLayout>
  );
};
