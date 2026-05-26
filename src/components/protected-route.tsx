import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  // Thay thế bằng logic kiểm tra đăng nhập thực tế của bạn (ví dụ check token trong store/cookies)
  const { isAuthenticated } = useSelector((state: any) => state.auth); 

  if (!isAuthenticated) {
    // Nếu chưa đăng nhập, bắt buộc quay về trang login
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập, render các route con bên trong
  return <Outlet />;
};
