import { api } from "./api";

export const adminSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      providesTags: ["categories"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.message,
    }),
    getUtilizeCategories: builder.query({
      query: () => ({
        url: `/inventories/get-utilized-categories`,
      }),
      invalidatesTags: ["categories"],
      transformResponse: (response) => response.data.no_of_utilized_categories,
    }),
    getCategory: builder.query({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["categories"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: `/update`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.message,

      invalidatesTags: ["vendor"],
    }),
    createSupport: builder.mutation({
      query: (body) => ({
        url: `/support`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.message,

      invalidatesTags: ["support"],
    }),
    replySupport: builder.mutation({
      query: (body) => ({
        url: `/support/reply`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.message,

      invalidatesTags: ["support"],
    }),
    getSupport: builder.query({
      query: () => ({
        url: `/support`,
      }),
      transformResponse: (response) => response.data,

      providesTags: ["support"],
    }),
    getSupportsReply: builder.query({
      query: (body) => ({
        url: `/support/get-all-supports-replies/${body}`,
      }),
      transformResponse: (response) => response.data,
      // transformResponse: (response) => response.data,

      providesTags: ["support"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `/notifications`,
      }),
      providesTags: ["notification"],
      transformResponse: (response) => response.data,
    }),
    readNotification: builder.query({
      query: (id) => ({
        url: `/notifications/${id}`,
      }),
      providesTags: ["notification"],
      transformResponse: (response) => response.data,
    }),
    markAsRead: builder.mutation({
      query: () => ({
        url: `/notifications/markall-as-read`,
        method: "POST",
      }),
      invalidatesTags: ["notification"],
      transformResponse: (response) => response.data,
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useGetSupportQuery,
  useGetUtilizeCategoriesQuery,
  useGetSupportsReplyQuery,
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useGetCategoryQuery,
  useReadNotificationQuery,
  useUpdateProfileMutation,
  useCreateSupportMutation,
  useReplySupportMutation,
} = adminSlice;
