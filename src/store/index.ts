import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import { authApi } from "./api/api-auth";
import { productApi } from "./api/api-product";
import { adminApi } from "./api/admin";
import { categoryApi } from "./api/api-category";
import { colorApi } from "./api/api-color";
import { sizeApi } from "./api/api-size";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [colorApi.reducerPath]: colorApi.reducer,
    [sizeApi.reducerPath]: sizeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(productApi.middleware)
    .concat(adminApi.middleware)
    .concat(categoryApi.middleware)
    .concat(colorApi.middleware)
    .concat(sizeApi.middleware),
});

// Xuất ra các Type để dùng với TypeScript cho chuẩn
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
