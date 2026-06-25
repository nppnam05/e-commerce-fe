import { customBaseQueryWithReauth } from "@/lib/api";
import type { BaseResponse } from "@/types/response";
import type { Size } from "@/types/size";
import { createApi } from "@reduxjs/toolkit/query/react";

export const sizeApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "sizeApi",
  tagTypes: ["Size"],
  endpoints: (builder) => ({
    getAllSizes: builder.query<Size[], void>({
      query: () => ({
        url: "/size",
        method: "GET",
        credentials: "include",
        providesTags: ["Size"],
      }),
      transformResponse: (response: BaseResponse<Size[]>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return [];
      },
    }),
    getSizesWithStockByProductId: builder.query<Size[], number>({
      query: (productId) => ({
        url: `/size/product/${productId}`,
        method: "GET",
        credentials: "include",
        providesTags: ["Size"],
      }),
      transformResponse: (response: BaseResponse<Size[]>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return [];
      },
    }),
  }),
});

export const { useGetAllSizesQuery, useGetSizesWithStockByProductIdQuery } =
  sizeApi;
