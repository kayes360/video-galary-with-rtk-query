import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({

  reducerPath: 'api',

  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.31.120:9000",
  }),

  tagTypes: ["Videos"],

  endpoints: (builder) => ({ 
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["Videos"]
    }),

    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      // keepUnusedDataFor: 5
    }),

    getRelatedVideos: builder.query({
      query: (generatedQueryStringIdExcluded) => `/videos?${generatedQueryStringIdExcluded}`,
      // keepUnusedDataFor: 5

    }),
    addVideo: builder.mutation({
      query: (videoData) => ({
        url: `/videos`,
        method: 'POST',
        body: videoData,
      }),

      invalidatesTags: ["Videos"]

    }),
    editVideo: builder.mutation({
      query: (videoData) => ({
        url: `/videos`,
        method: 'PUT',
        body: videoData,
      }),

      invalidatesTags: ["Videos"]

    }),

  }),
});

export const { useGetVideosQuery, useGetVideoQuery, useGetRelatedVideosQuery, useAddVideoMutation, useEditVideoMutation} = apiSlice;
