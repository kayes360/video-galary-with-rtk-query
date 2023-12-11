import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({

  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.31.120:9000",
  }),

  endpoints: (builder) => ({

    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 5
    }),

    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      keepUnusedDataFor: 5
    }),

    getRelatedVideos: builder.query({
      query: (generatedQueryStringIdExcluded) => `/videos?${generatedQueryStringIdExcluded}`,
      keepUnusedDataFor: 5

    }),

  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery} = apiSlice;
