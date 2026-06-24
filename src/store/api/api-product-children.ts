import { customBaseQueryWithReauth } from "@/lib/api";
import type { ProductChildren } from "@/types/product-children";
import type { BaseResponse, PaginatedResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";

type GetProductChildrenByProductIdRequest = {
  keyword?: string;
  productId?: number;
  pageNumber?: number;
  pageSize?: number;
};

export const ProductChildrenApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "productChildrenApi",
  tagTypes: ["product-children"],
  endpoints: (builder) => ({
    getProductChildren: builder.query<
      PaginatedResponse<ProductChildren>,
      GetProductChildrenByProductIdRequest
    >({
      query: (params) => ({
        url: "/product-children",
        method: "GET",
        params,
        credentials: "include",
      }),
      transformResponse: (
        response: BaseResponse<PaginatedResponse<ProductChildren>>,
      ) => {
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
      transformErrorResponse: (response) => {
        const data = response.data as BaseResponse;
        return data.message;
      },
    }),
  }),
});

export const { useGetProductChildrenQuery } = ProductChildrenApi;
