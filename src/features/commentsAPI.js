import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import apiurl from '../api'

export const commentsAPI = createApi({
    reducerPath: "commentsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: apiurl
        }),
        endpoints: (builder)=>({
            createComments: builder.mutation({
                query: (comment) =>({
                url: `/comments`,
                method:'POST',
                body: comment
                    })
                }),

                getItinerariesComments: builder.mutation({
                    query: (id) => ({
                        url: `/comments/?itinerary=${id}`,
                        method: "GET"
                    })
                }),
        })
})

export const {
        useCreateCommentsMutation,
        useGetItinerariesCommentsMutation,
    } = commentsAPI