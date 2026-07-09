// components/protected-route.tsx
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "@/store";
import { ROLE } from "@/constant/status";

interface ProtectedRouteProps {
  requiredRole?: "ADMIN" | "USER";
  redirectTo?: string;
}

export const ProtectedRoute = ({
  requiredRole,
  redirectTo = "/login",
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  if (!isAuthenticated) return <Navigate to={redirectTo} />;

  if (requiredRole && user?.roleName !== requiredRole) {
    if (user?.roleName === ROLE.ADMIN) return <Navigate to="/dashboard" />;
    else if (user?.roleName === ROLE.USER) return <Navigate to="/home" />;
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
