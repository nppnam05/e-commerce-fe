import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/auth/login-page";
import { RegisterPage } from "./pages/auth/register-page";
import { HomePage } from "./pages/home-page";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route
        path="*"
        element={
          <div className="flex h-screen items-center justify-center">
            404 - Không tìm thấy trang
          </div>
        }
      />
    </Routes>
  );
};
