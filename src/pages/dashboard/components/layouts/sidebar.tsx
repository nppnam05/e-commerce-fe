import { useState } from "react";
import {
  Home,
  Package,
  List,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/store/api/api-auth";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Package, label: "Products", path: "/dashboard/products" },
  {
    icon: Package,
    label: "Product children",
    path: "/dashboard/product-children",
  },
  { icon: List, label: "Orders", path: "/dashboard/order" },
  { icon: BarChart3, label: "Product Stock", path: "/dashboard/stock" },
];

export const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logout().unwrap();
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={`relative flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4.5 -right-3 z-50 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition-all hover:bg-gray-50 active:scale-95"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      <div
        className={`border-b border-gray-100 transition-all ${isCollapsed ? "justify-center p-5" : "p-6"}`}
      >
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600">
            <span className="text-xl font-bold text-white">CO</span>
          </div>
          <span
            className={`text-2xl font-bold text-gray-900 transition-opacity duration-200 ${
              isCollapsed ? "w-0 opacity-0" : "opacity-100"
            }`}
          >
            SHOP.CO
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-x-hidden p-4">
        <nav className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                  isCollapsed ? "mx-auto h-11 w-11 justify-center px-0" : ""
                } ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                title={isCollapsed ? item.label : ""}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span
                  className={`transition-opacity duration-200 ${isCollapsed ? "hidden w-0 opacity-0" : "opacity-100"}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-100 p-4">
        <a
          href="#"
          className={`flex items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-600 hover:bg-gray-100 ${
            isCollapsed ? "mx-auto h-11 w-11 justify-center px-0" : ""
          }`}
          title={isCollapsed ? "Settings" : ""}
        >
          <Settings className="h-5 w-5 shrink-0" />
          <span
            className={`transition-opacity duration-200 ${isCollapsed ? "hidden w-0 opacity-0" : "opacity-100"}`}
          >
            Settings
          </span>
        </a>
        <button
          onClick={handleLogout}
          className={`mt-1 flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-sm font-medium whitespace-nowrap text-red-600 hover:bg-red-50 ${
            isCollapsed ? "mx-auto h-11 w-11 justify-center px-0" : ""
          }`}
          title={isCollapsed ? "Logout" : ""}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          <span
            className={`transition-opacity duration-200 ${isCollapsed ? "hidden w-0 opacity-0" : "opacity-100"}`}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};
