import { Outlet } from "react-router-dom";
import { Footer } from "../ui/footer";
import { AdvertiseSignup } from "../ui/advertise-signup";
import { NavigationBar } from "../ui/navigation-bar";

export default function AppLayout() {
  return (
    <div className="font-sans">
      <AdvertiseSignup />
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
}
