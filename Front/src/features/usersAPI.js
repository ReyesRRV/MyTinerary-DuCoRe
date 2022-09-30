import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiurl from "../api";

const userAPI = createApi({
  reducerPath: "userAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: apiurl,
  }),
  endpoints: (builder) => ({



    getOneUser: builder.mutation({
      query: (id) => ({
        url: `/auth/${id}`,
        method: "GET",
      }),
    }),
    signUp: builder.mutation({
      query: (dataCity) => ({
        url: `/auth/signup`,
        method: "POST",
        body: dataCity,
      }),
    }),
    signIn: builder.mutation({
      query: (dataCity) => ({
        url: `/auth/signin`,
        method: "POST",
        body: dataCity,
      }),
    }),
    signOut: builder.mutation({
      query: (id) => ({
        url: `/auth/signout`,
        method: "POST",
        body: id,
      }),
    }),
    signInToken: builder.mutation({
      query: (token) => ({
        url: 'auth/token',
        method: 'GET',
        headers: {Authorization: 'Bearer ' + token}
      }),
    }),
    editCity: builder.mutation({
      query: ({ dataUser, id }) => ({
        url: `/auth/${id}`,
        method: "PATCH",
        body: dataUser,
      }),
    }),
  })
});

export default userAPI;

export const {
  useSignInMutation,
  useSignOutMutation,
  useSignUpMutation,
  useGetOneUserMutation,
  useSignInTokenMutation,
  useEditCityMutation
} = userAPI;
