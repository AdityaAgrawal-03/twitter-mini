import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constant";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${API_URL}/users`);

  return response.data.users;
});

//user lookup
export const getUser = createAsyncThunk(
  "users/getUser",
  async ({ username }) => {
    const response = await axios.get(`${API_URL}/users/${username}`);

    return response.data.user;
  }
);

// getFollowing
export const fetchFollowing = createAsyncThunk(
  "users/fetchFollowing",
  async ({ username }) => {
    const {
      data: { userId, userFollowing },
    } = await axios.get(`${API_URL}/users/${username}/following`);

    return { userId, userFollowing };
  }
);

// update following and followers
export const updateFollowingAndFollowers = createAsyncThunk(
  "users/updateFollowingAndFollowers",
  async ({ username, target_userId }) => {
    const {
      data: { sourceUser, targetUser },
    } = await axios.post(`${API_URL}/users/${username}/${target_userId}`);

    return { sourceUser, targetUser };
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    fetchedUser: null,
    status: "idle",
    error: null,
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = "pending";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = state.users.concat(action.payload);
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [getUser.pending]: (state) => {
      state.status = "pending";
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.fetchedUser = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchFollowing.pending]: (state) => {
      state.status = "pending";
    },
    [fetchFollowing.fulfilled]: (state, action) => {
      state.status = "success";
      console.log(action.payload);
      const user = state.users.find(
        (user) => user._id === action.payload.userId
      );

      user.following = action.payload.userFollowing;
    },
    [fetchFollowing.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
    [updateFollowingAndFollowers.pending]: (state) => {
      state.status = "pending";
    },
    [updateFollowingAndFollowers.fulfilled]: (state, action) => {
      const targetUser = state.users.find(
        (user) => user?._id === action.payload.targetUser?._id
      );

      const isInTargetUserFollowers = targetUser?.followers.includes(
        state.fetchedUser?._id
      );

      if (!isInTargetUserFollowers) {
        state.fetchedUser?.following.push(targetUser?._id);
      } else {
        const indexOfTargetUser = state.fetchedUser?.following.findIndex(
          (userId) => userId === targetUser?._id
        );

        if (indexOfTargetUser > -1) {
          state.fetchedUser?.following.splice(indexOfTargetUser, 1);
        }
      }

      state.status = "success";
    },
    [updateFollowingAndFollowers.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    },
  },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUserStatus = (state) => state.users.status;
export const selectFetchedUser = (state) => state.users.fetchedUser;

export default usersSlice.reducer;
