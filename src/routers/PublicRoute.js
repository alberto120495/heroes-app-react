import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);

  return user.logged ? <Navigate to="/" /> : children;
}

export default PublicRoute;
