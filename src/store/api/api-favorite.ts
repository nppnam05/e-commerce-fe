import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQueryWithReauth } from "@/lib/api";
import type { BaseResponse, PaginatedResponse } from "@/types/response";
import type { FavoriteProduct } from "@/types/favorite";

interface GetAllFavoriteRequest {
  pageNumber?: number;
  pageSize?: number;
}
export const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: customBaseQueryWithReauth,
  tagTypes: ["Favorite"],
  endpoints: (builder) => ({
    getFavoriteByUserId: builder.query<
      PaginatedResponse<FavoriteProduct>,
      { userId: string; params: GetAllFavoriteRequest }
    >({
      query: ({ userId, params }) => ({
        url: `/favorite/user/${userId}`,
        method: "GET",
        credentials: "include",
        params: params,
      }),
      transformResponse: (
        response: BaseResponse<PaginatedResponse<FavoriteProduct>>,
      ) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        throw new Error(response.message ?? "Failed to fetch favorite data");
      },
      providesTags: ["Favorite"],
    }),

    deleteFavorite: builder.mutation<void, number>({
      query: (id) => ({
        url: `/favorite/delete/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      transformResponse: (
        response: BaseResponse<void>,
      ) => {
        if (response.succeeded) {
          return;
        }
        throw new Error(response.message ?? "Failed to delete favorite");
      },
      invalidatesTags: ["Favorite"],
    }),
  }),
});

export const { useGetFavoriteByUserIdQuery, useDeleteFavoriteMutation } = favoriteApi;
