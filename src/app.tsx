import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/auth/login-page";
import { RegisterPage } from "./pages/auth/register-page";
import { HomePage } from "./pages/home/home-page";
import AppLayout from "./components/layouts/app-layout";
import { DashboardLayout } from "./pages/dashboard/components/layouts/dashboard-layout";
import { MainPage } from "./pages/dashboard/main-page";
import { ProductsPage } from "./pages/dashboard/products-page";
import { OrderPage } from "./pages/dashboard/order-page";
import { StockPage } from "./pages/dashboard/stock-page";
import { ProductPage } from "./pages/dashboard/product-page";
import { EditProductPage } from "./pages/dashboard/update-product-page";
import { OrderDetailPage } from "./pages/dashboard/order-detail-page";
import { ProtectedRoute } from "./components/ui/protected-route";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<MainPage />} />
          <Route path="/dashboard/products" element={<ProductsPage />} />
          <Route path="/dashboard/order" element={<OrderPage />} />
          <Route path="/dashboard/stock" element={<StockPage />} />
          <Route
            path="/dashboard/product"
            element={<ProductPage title="Add Product" />}
          />
          <Route
            path="/dashboard/update-product/:id"
            element={<EditProductPage />}
          />
          <Route path="/dashboard/order/:id" element={<OrderDetailPage />} />
        </Route>
      </Route>

      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};
