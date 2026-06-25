import type { Order, OrderDetail } from "@/types/order";
import { baseApi } from "./base-api";
import type { BaseResponse, PaginatedResponse } from "@/types/response";
import type { MonthlyRevenueResponse } from "@/types/monthly-revenue";

interface GetAllOrdersRequest {
  status?: string;
  dateTime?: string;
  pageNumber?: number;
  pageSize?: number;
}

interface CreateOrderRequest {
  userId: number;
  addressId: number;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<Order, CreateOrderRequest>({
      query: (params) => ({
        url: "/order",
        method: "POST",
        body: params,
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<Order>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return {
          id: 0,
          status: "",
          customerName: "",
          address: "",
          code: "",
          createdOn: new Date(),
          totalAmount: 0,
          products: [],
        };
      },
      invalidatesTags: ["Order", "cart"],
    }),
    getOrders: builder.query<PaginatedResponse<Order>, GetAllOrdersRequest>({
      query: (params) => ({
        url: "/order",
        method: "GET",
        params,
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<PaginatedResponse<Order>>) => {
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
      providesTags: ["Order"],
    }),
    updateStatusOrder: builder.mutation<
      boolean,
      { id: number; status: string }
    >({
      query: ({ id, status }) => ({
        url: `/order/${id}/status`,
        method: "PUT",
        params: { status },
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<boolean>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return false;
      },
      invalidatesTags: ["Order"],
    }),
    getMonthlyRevenue: builder.query<MonthlyRevenueResponse[], void>({
      query: () => ({
        url: "/order/revenue/monthly",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<MonthlyRevenueResponse[]>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return [];
      },
      providesTags: ["Order"],
    }),
    getOrderDetail: builder.query<OrderDetail, number>({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<OrderDetail>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return {
          id: 0,
          status: "",
          customerName: "",
          address: "",
          code: "",
          createdOn: new Date(),
          totalAmount: 0,
          products: [],
        };
      },
      providesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDetailQuery,
  useUpdateStatusOrderMutation,
  useGetMonthlyRevenueQuery,
  useCreateOrderMutation,
} = orderApi;
