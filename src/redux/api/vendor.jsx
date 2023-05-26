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
        method: "PUT",
        body,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["vendor"],
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useGetUtilizeCategoriesQuery,
  useGetCategoryQuery,
  useUpdateProfileMutation,
} = adminSlice;
