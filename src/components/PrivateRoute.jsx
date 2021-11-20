import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";
import { selectToken } from "../features/index";

export function PrivateRoute({ path, ...props }) {
  const token = useSelector(selectToken)
  

  return (
    <>
      {token ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
}
