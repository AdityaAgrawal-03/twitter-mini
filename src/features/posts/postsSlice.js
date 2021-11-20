import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constant"
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data.posts;
});

export const addPost = createAsyncThunk("posts/addPost", async ({ content }) => {
  const response = await axios.post(`${API_URL}/posts`, {
    content: content,
  });

  return response.data.post;
})

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.status = "loading"
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "success";
      console.log(action.payload)
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addPost.pending]: (state, action) => {
      state.status = "pending";
    },
    [addPost.fulfilled]: (state, action) => {
      state.status = "success";
      state.posts.push(action.payload);
    },
    [addPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  }
})

export const selectAllPosts = (state) => state.posts.posts;
export const selectPostStatus = (state) => state.posts.status;

export default postsSlice.reducer;