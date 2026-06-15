import {
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    id: "account",
    label: "Thông tin tài khoản",
    icon: User,
    path: "/profile",
  },
  {
    id: "orders",
    label: "Đơn hàng của tôi",
    icon: Package,
    path: "/profile/orders",
  },
  {
    id: "favorite",
    label: "Sản phẩm yêu thích",
    icon: Heart,
    path: "/profile/favorite",
  },
  {
    id: "addresses",
    label: "Sổ địa chỉ",
    icon: MapPin,
    path: "/profile/addresses",
  },
];

export const SidebarProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex h-screen w-72 flex-col border-r border-gray-800 bg-gray-950 text-white">
      <div className="border-b border-gray-800 px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white">
            <span className="text-2xl font-bold text-black">S</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">SHOP.CO</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-3.5 rounded-2xl px-5 py-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-1 border-t border-gray-800 p-4">
        <a
          href="#"
          className="flex items-center gap-3.5 rounded-2xl px-5 py-3.5 text-sm font-medium text-gray-400 transition-all duration-200 hover:bg-gray-900 hover:text-white"
        >
          <Settings className="h-5 w-5" />
          <span>Cài đặt</span>
        </a>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3.5 rounded-2xl px-5 py-3.5 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-950/50 hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};
