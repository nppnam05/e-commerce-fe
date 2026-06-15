import { createApi } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/user";
import { customBaseQueryWithReauth } from "@/lib/api";
import type { BaseResponse, PaginatedResponse } from "@/types/response";
import type { OrderUser } from "@/types/order";

export interface UpdateProfileRequest {
  email: string;
  displayName: string;
  phone: string;
}

interface GetAllOrdersRequest {
  pageNumber?: number;
  pageSize?: number;
}

export const userApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "userApi",
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => ({
        url: "user/me",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<User>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        throw new Error(response.message ?? "Failed to fetch user data");
      },
      providesTags: ["USER"],
    }),
    getMeOrder: builder.query<
      PaginatedResponse<OrderUser>,
      { userId: string; params: GetAllOrdersRequest }
    >({
      query: ({ userId, params }) => ({
        url: `order/user/${userId}`,
        method: "GET",
        credentials: "include",
        params,
      }),
      transformResponse: (
        response: BaseResponse<PaginatedResponse<OrderUser>>,
      ) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        throw new Error(response.message ?? "Failed to fetch user data");
      },
      providesTags: ["USER"],
    }),
    updateProfile: builder.mutation<
      boolean,
      { id: string; data: UpdateProfileRequest }
    >({
      query: ({ id, data }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<boolean>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        throw new Error(response.message ?? "Failed to fetch user data");
      },
      invalidatesTags: ["USER"],
    }),
  }),
});

export const { useGetMeQuery, useUpdateProfileMutation, useGetMeOrderQuery } =
  userApi;
