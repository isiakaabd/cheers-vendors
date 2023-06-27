import { api } from "./api";

export const inventorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getInventories: builder.query({
      query: ({ search }) => ({
        url: `/inventories${search && `/search?search=${search}`}`,
      }),
      providesTags: ["inventory"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.message,
    }),
    getOrders: builder.query({
      query: () => ({
        url: `/orders`,
      }),
      providesTags: ["order"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.message,
    }),
    getInventory: builder.query({
      query: (id) => ({
        url: `/inventories/${id}`,
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
    multipleAction: builder.mutation({
      query: (body) => ({
        url: `/inventories/inventory-multiple-actions`,
        method: "POST",
        body,
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
  useMultipleActionMutation,
  useDeleteInventoryMutation,
  useGetInventoryQuery,
  useUpdateInventoryMutation,
  useLazyGetInventoriesQuery,
  useGetOrdersQuery,
} = inventorySlice;
