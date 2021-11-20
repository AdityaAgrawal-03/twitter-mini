export { Posts } from "./posts/Posts";
export { Login } from "./authentication/Login";
export { Signup } from "./authentication/Signup";

export { fetchPosts } from "./posts/postsSlice";
export {
  selectAuthStatus,
  selectToken,
  selectCurrentUser,
  selectAuthError,
  loginUser
} from "./authentication/authSlice";
