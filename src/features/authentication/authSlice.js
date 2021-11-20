import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    status: "idle",
    currentUser: null,
    error: null
  },
  reducers: {
    logout: () => {
      localStorage?.removeItem("token");
      localStorage?.removeItem("user");

      return {
        token: null,
        status: "idle",
        currentUser: null,
        error: null
      }

    }
  },
  extraReducers: {}
})

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer