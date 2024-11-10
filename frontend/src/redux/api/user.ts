import { apiSlice } from "./apiSlice";
import BASIC_URL from "../constants";

interface Register {
    email: string;
    username: string;
    password: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data: Omit<Register, "username">) => ({
                url: `${BASIC_URL.USER_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),

        register: builder.mutation({
            query: (data: Register) => ({
                url: `${BASIC_URL.USER_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: `${BASIC_URL.USER_URL}/logout`,
                method: "POST",
            }),
        }),

        profile: builder.mutation({
            query: (data) => ({
                url: `${BASIC_URL.USER_URL}/profile`,
                method: "PUT",
                body: data
            })
        })
    }),
});
export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useProfileMutation } =
    userApiSlice;
