import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserDetails, logOut } from "redux/auth/auth.reducers";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.cheers.global/api/vendors",

  prepareHeaders: (headers, { getState, endpoint, type }) => {
    const token = getState().auth.token;
    if (
      endpoint === "createInventory" ||
      endpoint === "updateInventory" ||
      endpoint === "updateProfile"
    ) {
      headers.append("Accept", "application/json");
    } else {
      headers.append("Content-Type", "application/json");
    }
    if (token) {
      headers.append("AUTHORIZATION", `Bearer ${token}`);
    }
  },
});

const baseQuerywithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery("/refresh-token", api, extraOptions);

    if (refreshResult?.token) {
      api.dispatch(getUserDetails(refreshResult));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery("/logout", api, extraOptions);
      api.dispatch(logOut());
    }
  }

  return result;
};

export const api = createApi({
  // reducerPath: "api",
  baseQuery: baseQuerywithAuth,
  tagTypes: ["vendor", "categories", "inventory", "user"],
  endpoints: () => ({}),
});
