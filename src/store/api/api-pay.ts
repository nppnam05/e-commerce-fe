import { baseApi } from "./base-api";
import type { BaseResponse } from "@/types/response";

interface VNPayResponse {
    qrCode: string;
    checkoutUrl: string;
    paymentLinkId: string;
}

export const payApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentUrl: builder.mutation<VNPayResponse, number>({
            query: (orderId) => ({
                url: `/payment/create-link/${orderId}`,
                method: "POST",
                credentials: "include",
            }),
            transformResponse: (response: BaseResponse<VNPayResponse>) => {
                if (response.succeeded && response.data) {
                    return response.data;
                }
                throw new Error(response.message ?? "Failed to get payment URL");
            },
            invalidatesTags: ["Order"],
        }),
    })
})

export const { useGetPaymentUrlMutation } = payApi;