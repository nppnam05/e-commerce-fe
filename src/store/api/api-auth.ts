import { customBaseQueryWithReauth } from "@/lib/api";
import type { BaseResponse } from "@/types/response";
import type { User } from "@/types/user";
import { createApi } from "@reduxjs/toolkit/query/react";

interface SignInRequest {
  email?: string;
  password: string;
}

interface RegisterRequest {
  displayName: string;
  email: string;
  location: string;
  phone: string;
  password: string;
}

export const authApi = createApi({
  baseQuery: customBaseQueryWithReauth,
  reducerPath: "authApi",
  tagTypes: ["Auth", "UserProfile"],
  endpoints: (builder) => ({
    signIn: builder.mutation<User, SignInRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<User>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return null;
      },
      invalidatesTags: ["Auth", { type: "UserProfile" }],
    }),
    register: builder.mutation<User, RegisterRequest>({
      query: (credentials) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse: (response: BaseResponse<User>) => {
        if (response.succeeded && response.data) {
          return response.data;
        }
        return null;
      },
    }),
  }),
});

export const { useSignInMutation, useRegisterMutation } = authApi;
