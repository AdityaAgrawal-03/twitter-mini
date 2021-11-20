import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from "../features/authentication/authSlice";
import postsReducer from "../features/posts/postsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    posts: postsReducer
  },
});
