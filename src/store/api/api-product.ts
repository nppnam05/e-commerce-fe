import { customBaseQueryWithReauth } from "@/lib/api";
import type { Product } from "@/types/product";
import type { BaseResponse, PaginatedResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";

interface GetAllProductsParams {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
}
interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  colorId:  number;
  sizeId: number;
  images: File[];
}
export const productApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "productApi",
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<PaginatedResponse<Product>, GetAllProductsParams>({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params,
        credentials: "include",
        providesTags: ["Product"],
      }),
      transformResponse: (response: BaseResponse<PaginatedResponse<Product>>) => {
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
    }),
    createProduct: builder.mutation<BaseResponse<Product>, CreateProductRequest>({
      query: (body) => {
        const form = new FormData();
        form.append("name", body.name);
        form.append("description", body.description);
        form.append("price", body.price.toString());
        form.append("categoryId", body.categoryId.toString());
        form.append("colorId", body.colorId.toString());
        form.append("sizeId", body.sizeId.toString());
        body.images.forEach((image) => {
          form.append("images", image);
        });
        return {
          url: "/product",
          method: "POST",
          body:form,
          credentials: "include",
        }
      },
      invalidatesTags: ["Product"], 
    }),
  }),
});

export const { useGetAllProductsQuery, useCreateProductMutation } = productApi;