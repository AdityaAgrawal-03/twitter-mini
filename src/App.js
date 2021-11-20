import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import {
  Posts,
  Login,
  Signup,
  selectToken,
  fetchPosts,
  fetchUsers,
  selectPostStatus,
  selectUserStatus
} from "./features/index";
import { PrivateRoute } from "./components/index";
import { setUpAuthHeaderForServiceCalls } from "./utils/setUpAuthHeaderForServiceCalls";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const token = useSelector(selectToken);
  const postStatus = useSelector(selectPostStatus);
  const userStatus = useSelector(selectUserStatus);

  const dispatch = useDispatch();

  token && setUpAuthHeaderForServiceCalls(token);

  useEffect(() => {
    if (token && postStatus === "idle") {
      dispatch(fetchPosts())
    }
  }, [token, postStatus, dispatch])

  useEffect(() => {
    if (token && userStatus === "idle") {
      dispatch(fetchUsers())
    }
  }, [token, dispatch, userStatus])

  return (
    <div className="bg-coolGray-200 min-h-screen">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Posts />
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
