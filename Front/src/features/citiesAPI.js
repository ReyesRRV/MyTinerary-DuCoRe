import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiurl from "../api";

const citiesAPI = createApi({
  reducerPath: "citiesAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: apiurl,
  }),

  endpoints: (builder) => ({
    getAllCities: builder.query({
      query: () => "/cities",
    }),
    searchCities: builder.query({
      query: (search) => `/cities/?city=${search}`,
    }),
    createCity: builder.mutation({
      query: (data) => ({
        url: "/cities/",
        method: "POST",
        body: data,
      }),
    }),
    getCity: builder.query({
      query: (id) => `/cities/${id}`,
    }),

    editCity: builder.mutation({
      query: ({ dataCity, id }) => ({
        url: `/cities/${id}`,
        method: "PATCH",
        body: dataCity,
      }),
    }),
  }),
});

export default citiesAPI;
export const {
  useGetAllCitiesQuery,
  useSearchCitiesQuery,
  useCreateCityMutation,
  useEditCityMutation,
  useGetCityQuery,
} = citiesAPI;
