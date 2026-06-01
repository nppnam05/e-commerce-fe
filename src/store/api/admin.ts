import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQueryWithReauth } from "@/lib/api";
import type { TotalDashboard } from "@/types/total-dashboard";
import type { BaseResponse } from "@/types/response";

export const adminApi = createApi({
    baseQuery: customBaseQueryWithReauth,
    reducerPath: "adminApi",
    endpoints: (builder) => ({
        getTotalDashboard: builder.query<TotalDashboard, void>({
            query: () => ({
                url: "/admin/total-dashboard",
                method: "GET",
                credentials: "include",
            }),
            transformResponse: (response: BaseResponse<TotalDashboard>) => {
                if (response.succeeded && response.data) {
                    return response.data;
                }
                return null;
            },
        }),
    }),
});

export const { useGetTotalDashboardQuery } = adminApi;