// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
import type { MonthlyRevenueResponse } from "@/types/monthly-revenue";

interface SalesChartProps {
  data?: MonthlyRevenueResponse[];
}

export const SalesChart = (_props: SalesChartProps) => {
  return <></>;
  // return (
  //   <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
  //     <div className="mb-6 flex items-center justify-between">
  //       <div>
  //         <h3 className="text-lg font-bold text-gray-800">Biểu đồ doanh thu</h3>
  //         <p className="text-sm text-gray-500">Thống kê tình hình bán hàng</p>
  //       </div>
  //     </div>
  //
  //     <div className="h-[350px] w-full min-w-0 text-xs">
  //       {data.length === 0 ? (
  //         <div className="flex h-full items-center justify-center text-gray-400">
  //           Không có dữ liệu hiển thị
  //         </div>
  //       ) : (
  //         <ResponsiveContainer width="100%" height="100%">
  //           {/* 1. Đổi bọc ngoài thành LineChart */}
  //           <LineChart
  //             data={data}
  //             margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
  //           >
  //             <CartesianGrid
  //               strokeDasharray="3 3"
  //               vertical={false}
  //               stroke="#F3F4F6"
  //             />
  //
  //             <XAxis
  //               dataKey="month"
  //               axisLine={false}
  //               tickLine={false}
  //               stroke="#9CA3AF"
  //             />
  //
  //             <YAxis
  //               axisLine={false}
  //               tickLine={false}
  //               stroke="#9CA3AF"
  //               tickFormatter={(value) => `${value / 1000000}M`}
  //             />
  //
  //             <Tooltip
  //               formatter={(value: any) => [formatVND(value), "Doanh thu"]}
  //               contentStyle={{
  //                 backgroundColor: "#fff",
  //                 borderRadius: "12px",
  //                 border: "1px solid #E5E7EB",
  //                 boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  //               }}
  //             />
  //
  //             <Line
  //               type="monotone"
  //               dataKey="revenue"
  //               stroke="#3B82F6"
  //               strokeWidth={3}
  //               dot={{ r: 4, strokeWidth: 2 }}
  //               activeDot={{ r: 6 }}
  //             />
  //           </LineChart>
  //         </ResponsiveContainer>
  //       )}
  //     </div>
  //   </div>
  // );
};
