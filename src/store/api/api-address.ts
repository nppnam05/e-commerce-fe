import { customBaseQueryWithReauth } from "@/lib/api";
import type { Address } from "@/types/address";
import type { BaseResponse, PaginatedResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";

interface GetAllAddress {
  pageNumber?: number;
  pageSize?: number;
}

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddressesByUserId: builder.query<
      PaginatedResponse<Address>,
      { userId: string; params: GetAllAddress }
    >({
      query: ({ userId, params }) => ({
        url: `/address/user/${userId}`,
        method: "GET",
        credentials: "include",
        params: params,
      }),
      transformResponse: (
        response: BaseResponse<PaginatedResponse<Address>>,
      ) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        throw new Error(response.message ?? "Failed to fetch addresses");
      },
      providesTags: ["Address"],
    }),
    createAddress: builder.mutation<Address, { userId: string,data: Address }>(
      {
        query: ({ userId, data }) => ({
          url: `/address/${userId}`,
          method: "POST",
          credentials: "include",
          body: data,
        }),
        transformResponse: (response: BaseResponse<Address>) => {
          if (response.succeeded && response.data) {
            return response.data;
          }
          throw new Error(response.message ?? "Failed to create address");
        },
        invalidatesTags: ["Address"],
      },
    ),
    updateAddress: builder.mutation<
      Address,
      {  data: Address }
    >(
      {
        query: ({ data }) => ({
          url: `/address`,
          method: "PUT",
          credentials: "include",
          body: data,
        }),
        transformResponse: (response: BaseResponse<Address>) => {
          if (response.succeeded && response.data) {
            return response.data;
          }
          throw new Error(response.message ?? "Failed to update address");
        },
        invalidatesTags: ["Address"],
      },
    ),
    deleteAddress: builder.mutation<void, { addressId: number }>(
      {
        query: ({ addressId }) => ({
          url: `/address/${addressId}`,
          method: "DELETE",
          credentials: "include",
        }),
        transformResponse: (response: BaseResponse<void>) => {
          if (!response.succeeded) {
            throw new Error(response.message ?? "Failed to delete address");
          }
        },
        invalidatesTags: ["Address"],
      },
    ),
    
  }),
});

export const {
  useGetAddressesByUserIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
