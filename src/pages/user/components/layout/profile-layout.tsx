import { Outlet } from "react-router-dom";
import { SidebarProfile } from "../ui/sidebar-profile";
import { NavigationBar } from "@/components/ui/navigation-bar";

export const ProfileLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProfile />
      <div className="flex w-full flex-col">
        <NavigationBar />
        <div className="flex-1 overflow-y-auto bg-[#F5F6FA] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
