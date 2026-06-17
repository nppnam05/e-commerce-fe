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
import { ProfileLayout } from "./pages/user/components/layout/profile-layout";
import { FavoritePage } from "./pages/user/favorite-page";
import { AddressPage } from "./pages/user/addresses-page";
import { AccountInfoPage } from "./pages/user/accountInfo-page";
import { OrdersUserPage } from "./pages/user/orders-user-page";
import { ProtectedRoute } from "./components/ui/protected-route";
import { getCookie } from "./lib/utils";
import { useGetMeQuery } from "./store/api/api-user";
import { OrderUserDetailPage } from "./pages/user/order-user-detail";
import { DetailPage } from "./pages/detail/detail-page";
import CategoryPage from "./pages/category/category-page";
import { CartPage } from "./pages/cart/cart-page";
import { ProductChildrenPage } from "./pages/dashboard/product-children-page";

export const App = () => {
  const deviceId = getCookie("deviceId");
  const { isLoading } = useGetMeQuery(undefined, { skip: !deviceId });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Route>
      {/* User routes */}
      <Route element={<ProtectedRoute requiredRole="USER" />}>
        <Route element={<AppLayout />}>
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route element={<ProfileLayout />}>
          <Route path="/profile" element={<AccountInfoPage />} />
          <Route path="/profile/orders" element={<OrdersUserPage />} />
          <Route path="/profile/favorite" element={<FavoritePage />} />
          <Route path="/profile/addresses" element={<AddressPage />} />
          <Route path="/profile/orders/:id" element={<OrderUserDetailPage />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<MainPage />} />
          <Route path="/dashboard/products" element={<ProductsPage />} />
          <Route
            path="/dashboard/product-children"
            element={<ProductChildrenPage />}
          />
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
