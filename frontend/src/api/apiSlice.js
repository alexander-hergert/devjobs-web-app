import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/",
      staleTime: 1000 * 60 * 5,
    }),
    // Mutation endpoint to create a new post
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
      invalidates: [{ type: "User", id: "list" }], // Invalidate the 'Post' type with ID 'list' after creating a new post
    }),
    // Mutation endpoint to update a post by ID
    updatePost: builder.mutation({
      query: ({ id, updatedPost }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body: updatedPost,
      }),
      invalidates: [{ type: "Post", id: "list" }], // Invalidate the 'Post' type with ID 'list' after creating a new post
    }),
    // Mutation endpoint to delete a post by ID
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidates: [{ type: "Post", id: "list" }], // Invalidate the 'Post' type with ID 'list' after creating a new post
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreateUserMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
