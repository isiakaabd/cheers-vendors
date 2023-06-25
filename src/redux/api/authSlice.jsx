import { api } from "./api";

export const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
      transformErrorResponse: (error) => error.data.message,
      transformResponse: (data) => data,
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
      transformErrorResponse: (error) => error.data.errors,
      transformResponse: (data) => data.message,
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/verify",
        method: "PUT",
        body,
      }),
      transformErrorResponse: (error) => error.data.message,
      transformResponse: (data) => data.message,
    }),
    resendToken: builder.mutation({
      query: (body) => ({
        url: "/verify/resend-token",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.data.message,
      transformResponse: (data) => data.message,
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.data.errors,
      transformResponse: (data) => data.message,
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.message,
      transformResponse: (data) => data.data,
    }),
    refreshToken: builder.mutation({
      query: (body) => ({
        url: "/refresh-token",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.message,
      transformResponse: (data) => data.data,
    }),
    logout: builder.mutation({
      query: (body) => ({
        url: "/logout",
        method: "POST",
        body,
      }),
      invalidatesTags: ["user"],
      transformErrorResponse: (error) => error.message,
      transformResponse: (data) => data.message,
    }),
    getVendorProfile: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["vendor"],
      transformErrorResponse: (error) => error.data.message,
      transformResponse: (response) => response.data.vendor,
    }),
  }),
});

export const {
  useLoginMutation,
  useResendTokenMutation,
  useVerifyEmailMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetVendorProfileQuery,
} = authSlice;
