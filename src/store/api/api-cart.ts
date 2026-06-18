import { customBaseQueryWithReauth } from "@/lib/api";
import type { Cart } from "@/types/cart";
import type { BaseResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";

type GetAllCartParams = {
  userId: number;
};

export type UpdateCartRequest = {
  id: number;
  quantity: number;
  singlePrice: number;
};

export type CreateCartRequest = {
  userId: number;
  productId: number;
  quantity: number;
  singlePrice: number;
};

export const cartApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "cartApi",
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getAllCartsByUserId: builder.query<BaseResponse<Cart[]>, number>({
      query: (param) => ({
        url: `/cart/${param}`,
        method: "GET",
        include: "credentials",
      }),

      providesTags: ["cart"],
    }),

    updateCart: builder.mutation<BaseResponse<boolean>, UpdateCartRequest>({
      query: ({ id, ...body }) => ({
        url: `/cart/${id}`,
        method: "PUT",
        body,
        include: "credentials",
      }),

      invalidatesTags: ["cart"],
    }),

    deleteCart: builder.mutation<BaseResponse<boolean>, number>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
        include: "credentails",
      }),

      invalidatesTags: ["cart"],
    }),

    createCart: builder.mutation<BaseResponse<Cart>, CreateCartRequest>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        include: "credentails",
        body,
      }),

      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetAllCartsByUserIdQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useCreateCartMutation,
} = cartApi;
