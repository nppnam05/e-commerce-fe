import { customBaseQueryWithReauth } from "@/lib/api";
import type { Category } from "@/types/catyegory";
import type { BaseResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "categoryApi",
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/category",
        method: "GET",
        credentials: "include",
        providesTags: ["Category"],
      }),
      transformResponse: (response: BaseResponse<Category[]>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return [];
      },
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;