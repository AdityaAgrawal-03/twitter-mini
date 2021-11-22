import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constant"

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password
  });


  return { token: response.data.token, user: response.data.user };
})

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: JSON.parse(localStorage?.getItem("token"))?.token || null,
    status: "idle",
    currentUser: JSON.parse(localStorage?.getItem("user"))?.user || null,
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
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.status = "signing in";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "signed in";
      state.token = action.payload.token;
      localStorage?.setItem("token", JSON.stringify({ token: state.token }));

      state.currentUser = action.payload.user;
      localStorage?.setItem(
        "user",
        JSON.stringify({ user: state.currentUser })
      );
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  }
})

export const { logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer