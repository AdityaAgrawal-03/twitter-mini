import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthStatus, selectAuthError } from "../index";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const dispatch = useDispatch();

  return (
    <>
      <h1> Login </h1>
    </>
  );
}
