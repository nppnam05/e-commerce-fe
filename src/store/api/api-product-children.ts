import { customBaseQueryWithReauth } from "@/lib/api";
import type { ProductChildren } from "@/types/product";
import type { BaseResponse, PaginatedResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";

interface UpdateProductChildren {
  id: number;
  sizeId: number;
  colorId: number;
}

interface GetAllProductChildrenParams {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
  productId?: number;
}

export const productChildrenApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "productChildrenApi",
  tagTypes: ["ProductChildren"],
  endpoints: (builder) => ({
    getAllProductChildren: builder.query<PaginatedResponse<ProductChildren>, GetAllProductChildrenParams>({
      query: (params) => ({
        url: "/product-children",
        method: "GET",
        params,
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<PaginatedResponse<ProductChildren>>) => {
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
      providesTags: ["ProductChildren"],
    }),
    updateProductChildren: builder.mutation<boolean, UpdateProductChildren>({
      query: (body) => ({
        url: "/product-children",
        method: "PUT",
        body,
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<boolean>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return false;
      },
      invalidatesTags: ["ProductChildren"],
    }),
  }),
});

export const {
  useGetAllProductChildrenQuery,
  useUpdateProductChildrenMutation,
} = productChildrenApi;