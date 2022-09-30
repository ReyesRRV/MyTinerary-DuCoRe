import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import apiurl from '../api'

export const activitiesAPI = createApi({
    reducerPath: "activitiesAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: apiurl
        }),
        endpoints: (builder)=>({
            createActivity: builder.mutation({
                query: (activity) =>({
                url: `/activities`,
                method:'POST',
                body: activity
                    })
                }),

                getAllActivities: builder.mutation({
                    query: (id) => ({
                        url: `/activities/?itinerary=${id}`,
                        method: "GET"
                    }),
        })
    })
})

export const {
        useCreateActivityMutation,
        useGetAllActivitiesMutation,
    } = activitiesAPI