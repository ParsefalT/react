import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import BASIC_URL from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASIC_URL.BASE_URL });
// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery,
    endpoints: () => ({}),
});

// export const {} = apiSlice;
