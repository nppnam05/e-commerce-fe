import { DashboardPageLayout } from "@/pages/dashboard/components/layouts/dashboardpage-layout";
import { ContainerTotal } from "./components/ui/container-total";
import iconTotalOrder from "@/assets/images/total-order.png";
import iconTotalSale from "@/assets/images/total-sale.png";
import iconTotalPending from "@/assets/images/total-peding.png";

export const MainPage = () => {
  return (
    <DashboardPageLayout title="Dashboard">
      <div className="flex gap-6">
        <ContainerTotal
          title="Total User"
          value={40689}
          bgColor="bg-[#E0DFFF]"
        />
        <ContainerTotal
          title="Total Order"
          value={40689}
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
          value={40689}
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
          value={40689}
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
