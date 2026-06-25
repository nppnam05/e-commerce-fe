import { customBaseQueryWithReauth } from "@/lib/api";
import type { ProductStock } from "@/types/product";
import type { BaseResponse, PaginatedResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface UpdateStockRequest {
  id: number;
  quantity: number;
}
interface GetAllStocksParams {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
}
export const stockApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "stockApi",
  tagTypes: ["Stock"],
  endpoints: (builder) => ({
    updateStock: builder.mutation<boolean, UpdateStockRequest>({
      query: (body) => ({
        url: `/stock`,
        method: "PUT",
        body,
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<boolean>) => {
        if (response.succeeded) {
          return true;
        }
        return false;
      },
      invalidatesTags: ["Stock"], 
    }),
    getAllProductStocks: builder.query<PaginatedResponse<ProductStock>, GetAllStocksParams>({
      query: (params) => ({
        url: "/stock",
        method: "GET",
        params,
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<PaginatedResponse<ProductStock>>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return {
          pageNumber: 0,
          pageSize: 0,
          total: 0,
          totalPages: 0,
          data: [],
        };
      },
      providesTags: ["Stock"],
      }),
  }),
});

export const { useUpdateStockMutation, useGetAllProductStocksQuery } = stockApi;