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
import { DetailPage } from "./pages/detail/detail-page";
import CategoryPage from "./pages/category/category-page";
import { CartPage } from "./pages/cart/cart-page";

export const App = () => {
  const a = 10; 

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Route>
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
