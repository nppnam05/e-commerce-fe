import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { getCookie } from "./utils";

// Add a flag to track ongoing refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

export const customBaseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseUrl = import.meta.env.VITE_SERVER_URI || "";
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getCookie("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const url = typeof args === "string" ? args : args.url;
    if (url && (url.includes("/auth/login") || url.includes("/auth/sign-up"))) {
      return result;
    }

    // If already refreshing, add to queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          // Retry the original request with new token

          return baseQuery(args, api, extraOptions);
        })
        .catch((err) => {
          return { error: err };
        });
    }

    isRefreshing = true;

    try {
      // Attempt to refresh token
      const refreshResult = await baseQuery(
        { url: "/auth/refresh", method: "POST", credentials: "include" },
        api,
        extraOptions,
      );

      const accessToken = (refreshResult.data as any)?.data?.accessToken;

      if (accessToken) {
        // Process queued requests
        processQueue(null, accessToken);
        // Retry the original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, try auto-login
        const autoLogin = await baseQuery(
          { url: "/auth/auto-login", method: "GET", credentials: "include" },
          api,
          extraOptions,
        );

        const autoLoginAccessToken = (autoLogin.data as any)?.data?.accessToken;
        const autoLoginRefreshToken = (autoLogin.data as any)?.data
          ?.refreshToken;

        if (autoLoginAccessToken && autoLoginRefreshToken) {
          // Process queued requests
          processQueue(null, autoLoginAccessToken);
          // Retry the original request
          result = await baseQuery(args, api, extraOptions);
        } else {
          // Auto-login failed, process queue with error
          processQueue(new Error("Authentication failed"));

          if (
            (autoLogin?.error?.status === 400 ||
              autoLogin?.error?.status === 401) &&
            typeof window !== "undefined" &&
            window.location.pathname !== "/auth/sign-in"
          ) {
            window.location.href = "/auth/sign-in";
          }
        }
      }
    } catch (error) {
      // Process queue with error
      processQueue(error);
    } finally {
      isRefreshing = false;
    }
  }

  return result;
};
