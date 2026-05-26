import { DashboardPageLayout } from "./components/layouts/dashboardpage-layout";
import { Filter } from "lucide-react";
import { OrderTable } from "./components/ui/order-table";
import { SelectInput } from "./components/ui/select-input";
import { SimpleDatePicker } from "./components/ui/date-picker";
import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";

const sampleOrders = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "04 Sep 2026",
    type: "Electric",
    status: "Completed" as const,
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "28 May 2026",
    type: "Book",
    status: "Processing" as const,
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "23 Nov 2026",
    type: "Medicine",
    status: "Rejected" as const,
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "05 Feb 2026",
    type: "Mobile",
    status: "Completed" as const,
  },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "29 Jul 2026",
    type: "Watch",
    status: "Processing" as const,
  },
  {
    id: "00006",
    name: "Alfred Murray",
    address: "543 Weimann Mountain",
    date: "15 Aug 2026",
    type: "Medicine",
    status: "Completed" as const,
  },
  {
    id: "00007",
    name: "Maggie Sullivan",
    address: "New Scottieberg",
    date: "21 Dec 2026",
    type: "Watch",
    status: "Processing" as const,
  },
  {
    id: "00008",
    name: "Rosie Todd",
    address: "New Jon",
    date: "30 Apr 2026",
    type: "Medicine",
    status: "On Hold" as const,
  },
  {
    id: "00009",
    name: "Dollie Hines",
    address: "124 Lyla Forge Suite 975",
    date: "09 Jan 2026",
    type: "Book",
    status: "In Transit" as const,
  },
];

export const OrderPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
  };
  const typeOptions = [
    { value: "Electric", label: "Electric" },
    { value: "Book", label: "Book" },
    { value: "Medicine", label: "Medicine" },
    { value: "Mobile", label: "Mobile" },
    { value: "Watch", label: "Watch" },
  ];

  const statusOptions = [
    { value: "Completed", label: "Completed" },
    { value: "Processing", label: "Processing" },
    { value: "Rejected", label: "Rejected" },
    { value: "On Hold", label: "On Hold" },
    { value: "In Transit", label: "In Transit" },
  ];
  return (
    <DashboardPageLayout title="Order Lists">
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col items-center gap-4 border-b border-gray-100 p-6 md:flex-row">
          <div className="flex items-center gap-2 font-medium text-gray-600">
            <Filter size={20} />
            <span>Filter By</span>
          </div>

          <div className="flex flex-1 flex-wrap gap-3">
            <SimpleDatePicker></SimpleDatePicker>

            <SelectInput
              name="type"
              defaultLabel="Order Type"
              options={typeOptions}
            />

            <SelectInput
              name="status"
              defaultLabel="Order Status"
              options={statusOptions}
            />
          </div>
        </div>

        <OrderTable orders={sampleOrders} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      ></Pagination>
    </DashboardPageLayout>
  );
};
