import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constant"

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${API_URL}/users`);

  return response.data.users;
})

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
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
  }
});

export const selectAllUsers = (state) => state.users.users;
export const selectUserStatus = (state) => state.users.status;

export default usersSlice.reducer;