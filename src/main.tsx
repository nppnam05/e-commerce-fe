import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import { safeLocalStorage } from "@/utils/localStorage";
import { getCookie, setCookie } from "@/lib/utils";

// Kiểm tra nếu có deviceId trong URL (khi redirect từ OAuth2 login thành công)
if (typeof window !== "undefined") {
  const urlParams = new URLSearchParams(window.location.search);
  const urlDeviceId = urlParams.get("deviceId");
  if (urlDeviceId) {
    safeLocalStorage.setItem("deviceId", urlDeviceId);
    setCookie("deviceId", urlDeviceId, 365);

    // Xóa query param deviceId khỏi thanh địa chỉ
    urlParams.delete("deviceId");
    const newSearch = urlParams.toString();
    const newPath =
      window.location.pathname + (newSearch ? `?${newSearch}` : "");
    window.history.replaceState({}, "", newPath);
  }
}

// Đồng bộ deviceId từ localStorage sang cookie khi ứng dụng khởi chạy
const savedDeviceId = safeLocalStorage.getItem("deviceId");
if (savedDeviceId && !getCookie("deviceId")) {
  setCookie("deviceId", savedDeviceId, 365);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
