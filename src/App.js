import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { Posts, Login, Signup, selectToken } from "./features/index";
import { PrivateRoute } from "./components/index"
import { useSelector } from "react-redux";

function App() {
  const token = useSelector(selectToken);

  
  return (
    <div className="bg-coolGray-200 min-h-screen">
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Posts />  
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
