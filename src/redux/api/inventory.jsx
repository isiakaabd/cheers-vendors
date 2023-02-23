import { api } from "./api";

export const inventorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getInventories: builder.query({
      query: () => ({
        url: "/inventories",
        method: "GET",
      }),
      providesTags: ["inventory"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.message,
    }),
    getInventory: builder.query({
      query: (id) => ({
        url: `/inventories/${id}`,
        method: "GET",
      }),
      providesTags: ["inventory"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.message,
    }),

    deleteInventory: builder.mutation({
      query: (id) => ({
        url: `inventories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["inventory"],
      transformErrorResponse: (error) => error.message,
    }),
    createInventory: builder.mutation({
      query: (body) => ({
        url: `inventories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["inventory"],
    }),
    updateInventory: builder.mutation({
      query: ({ body, id }) => ({
        url: `inventories/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["inventory"],
    }),
  }),
});
export const {
  useCreateInventoryMutation,
  useGetInventoriesQuery,
  useDeleteInventoryMutation,
  useGetInventoryQuery,
  useUpdateInventoryMutation,
} = inventorySlice;
