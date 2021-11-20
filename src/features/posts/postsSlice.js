import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constant"
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data.posts;
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
    }
  }
})

export default postsSlice.reducer;