import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { getCookie } from "./utils";

let refreshPromise: Promise<any> | null = null;

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

    if (!refreshPromise) {
      refreshPromise = Promise.resolve(
        baseQuery(
          { url: "/auth/refresh", method: "POST", credentials: "include" },
          api,
          extraOptions,
        ),
      ).finally(() => {
        refreshPromise = null;
      });
    }

    const refreshResult = await refreshPromise;

    if (refreshResult.error) {
      if (typeof window !== "undefined" && window.location.pathname !== "/") {
        window.location.href = "/";
      }
      return refreshResult;
    }

    result = await baseQuery(args, api, extraOptions);
  } // ← đóng if 401

  return result; // ← return cuối
};
