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

      invalidatesTags: ["vendor"],
    }),
    replySupport: builder.mutation({
      query: (body) => ({
        url: `/support/reply`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.message,

      invalidatesTags: ["vendor"],
    }),
    getSupport: builder.query({
      query: () => ({
        url: `/support`,
      }),
      transformResponse: (response) => response.data,

      invalidatesTags: ["vendor"],
    }),
    getSupportsReply: builder.query({
      query: (body) => ({
        url: `/support/get-all-supports-replies`,
        body,
      }),
      transformResponse: (response) => response.data,

      invalidatesTags: ["vendor"],
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useGetSupportQuery,
  useGetUtilizeCategoriesQuery,
  useGetSupportsReplyQuery,
  useGetCategoryQuery,
  useUpdateProfileMutation,
  useCreateSupportMutation,
  useReplySupportMutation,
} = adminSlice;
