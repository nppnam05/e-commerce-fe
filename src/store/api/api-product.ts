import { customBaseQueryWithReauth } from "@/lib/api";
import type { Product, ProductDetail, ProductFilter } from "@/types/product";
import type { BaseResponse, PaginatedResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";

interface GetAllProductsParams {
  pageNumber?: number;
  pageSize?: number;
  keyword?: string;
}
interface CreateProductRequest {
  id?: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  images: File[];
}
export const productApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "productApi",
  tagTypes: ["Product", "Stock"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<
      PaginatedResponse<Product>,
      GetAllProductsParams
    >({
      query: (params) => ({
        url: "/product",
        method: "GET",
        params,
        credentials: "include",
      }),
      transformResponse: (
        response: BaseResponse<PaginatedResponse<Product>>,
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
      providesTags: ["Product"],
    }),
    getProductFilters: builder.query<ProductFilter[], void>({
      query: () => ({
        url: "/product/filters",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<ProductFilter[]>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return [];
      },
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<
      BaseResponse<Product>,
      CreateProductRequest
    >({
      query: (body) => {
        const form = new FormData();
        form.append("name", body.name);
        form.append("description", body.description);
        form.append("price", body.price.toString());
        form.append("categoryId", body.categoryId.toString());
        body.images.forEach((image) => {
          form.append("images", image);
        });
        return {
          url: "/product",
          method: "POST",
          body: form,
          credentials: "include",
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<BaseResponse<Product>, number>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<boolean, CreateProductRequest>({
      query: (body) => {
        const form = new FormData();
        form.append("name", body.name);
        form.append("description", body.description);
        form.append("price", body.price.toString());
        form.append("categoryId", body.categoryId.toString());
        body.images.forEach((image) => {
          form.append("images", image);
        });
        return {
          url: `/product/${body.id}`,
          method: "PUT",
          body: form,
          credentials: "include",
        };
      },
      transformResponse: (response: BaseResponse<boolean>) => {
        if (response.succeeded) {
          return true;
        }
        return false;
      },
      invalidatesTags: ["Product"],
    }),
    getProductById: builder.query<ProductDetail, number>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
        credentials: "include",
        providesTags: ["Product"],
      }),
      transformResponse: (response: BaseResponse<ProductDetail>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return {
          id: 0,
          name: "",
          description: "",
          price: 0,
          categoryId: 0,
          sizeId: 0,
          colorCode: "",
          imageUrls: [],
        };
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductFiltersQuery,
} = productApi;
