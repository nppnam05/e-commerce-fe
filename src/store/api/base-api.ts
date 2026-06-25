import { customBaseQueryWithReauth } from "@/lib/api";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["Order", "cart"],
  endpoints: () => ({}),
});
