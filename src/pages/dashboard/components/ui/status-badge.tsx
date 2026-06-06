import { STATUS } from "@/constant/status";

export const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    PND: "bg-gray-100 text-gray-700",
    REJ: "bg-red-100 text-red-700",
    COM: "bg-green-100 text-green-700",
    SHP: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${styles[status as keyof typeof styles] || ""}`}
    >
      {STATUS[status as keyof typeof STATUS] || status}
    </span>
  );
};
