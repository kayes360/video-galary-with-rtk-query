import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({

  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.31.120:9000",
  }),

  endpoints: (builder) => ({

    getVideos: builder.query({
      query: () => "/videos",
    }),

    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`
    }),

    getRelatedVideos: builder.query({
      query: (generatedQueryStringIdExcluded) => `/videos?${generatedQueryStringIdExcluded}`

    }),

  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery} = apiSlice;
