import React from "react";

export const DashboardPageLayout = ({
  title,
  children,
}: {
  title: String;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen bg-[#F5F6FA] p-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="mb-9"></div>
      {children}
    </div>
  );
};
