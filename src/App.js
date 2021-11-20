import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import {
  Login,
  Signup,
  selectToken,
  fetchPosts,
  fetchUsers,
  selectPostStatus,
  selectUserStatus,
  getUser,
  selectCurrentUser,
} from "./features/index";
import { PrivateRoute, Home } from "./components/index";
import { setUpAuthHeaderForServiceCalls } from "./utils/setUpAuthHeaderForServiceCalls";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const token = useSelector(selectToken);
  const postStatus = useSelector(selectPostStatus);
  const userStatus = useSelector(selectUserStatus);
  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  token && setUpAuthHeaderForServiceCalls(token);

  useEffect(() => {
    if (token && postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [token, postStatus, dispatch]);

  useEffect(() => {
    if (token && userStatus === "idle") {
      dispatch(fetchUsers());
      dispatch(getUser({ username: currentUser?.username }));
    }
  }, [token, dispatch, userStatus, currentUser]);

  return (
    <div className="bg-coolGray-200 min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
