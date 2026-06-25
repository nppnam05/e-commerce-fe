import { customBaseQueryWithReauth } from "@/lib/api";
import type { Color } from "@/types/color";
import type { BaseResponse } from "@/types/response";
import { createApi } from "@reduxjs/toolkit/query/react";

export const colorApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "colorApi",
  tagTypes: ["Color"],
  endpoints: (builder) => ({
    getAllColors: builder.query<Color[], void>({
      query: () => ({
        url: "/color",
        method: "GET",
        credentials: "include",
        providesTags: ["Color"],
      }),
      transformResponse: (response: BaseResponse<Color[]>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return [];
      },
    }),
    getColorsWithStockByProductId: builder.query<Color[], number>({
      query: (productId) => ({
        url: `/color/product/${productId}`,
        method: "GET",
        credentials: "include",
        providesTags: ["Color"],
      }),
      transformResponse: (response: BaseResponse<Color[]>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return [];
      },
    }),
  }),
});

export const { useGetAllColorsQuery, useGetColorsWithStockByProductIdQuery } =
  colorApi;
