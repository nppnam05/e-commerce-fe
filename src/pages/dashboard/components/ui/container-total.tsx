import React from "react";
import userIcon from "@/assets/images/total-user.png";

interface ContainerTotalProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  bgColor?: string;
}

export const ContainerTotal = ({ title, value, icon, bgColor = "bg-[#E0DFFF]" }: ContainerTotalProps) => {
  return (
    <div className="rounded-2xl border border-blue-500 bg-white p-5">
      <div className="flex items-center justify-between gap-20">
        <div>
          <p className="mb-1 text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-gray-900">
            {value.toLocaleString()}
          </p>
        </div>

        <div className={`flex-shrink-0 rounded-full ${bgColor} p-3`}>
          {icon ? (
            icon
          ) : (
            <img
              src={userIcon}
              alt="Total Users"
              className="h-9 w-9 object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};
