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
      transformResponse: (response) => response.data,
    }),
    getCategory: builder.query({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["categories"],
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useGetUtilizeCategoriesQuery,
  useGetCategoryQuery,
} = adminSlice;
