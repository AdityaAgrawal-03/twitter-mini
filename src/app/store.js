import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentication/authSlice";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice"
 
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer
  },
});
