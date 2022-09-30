import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import apiurl from "../api";

export const commentsAPI = createApi({
  reducerPath: "commentsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: apiurl,
  }),
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (comment) => ({
        url: `/comments`,
        method: "POST",
        body: comment,
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}      }),
    }),
    editComment: builder.mutation({
      query: ({ commentUpdate, id }) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body: commentUpdate,
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}    

      }),
    }),
    delComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}    

      }),
    }),
    getItinerariesComments: builder.mutation({
      query: (id) => ({
        url: `/comments/?itinerary=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetItinerariesCommentsMutation,
  useEditCommentMutation,
  useDelCommentMutation
} = commentsAPI;
