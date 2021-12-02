import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

function LoginScreen() {
  const { dispatch } = useContext(AuthContext);
  const { login } = types;
  const navigate = useNavigate();

  const handleLogin = () => {
    //history.push("/");

    const lastPath = localStorage.getItem("lastPath") || "/";

    const user = {
      name: "Alberto",
    };

    const action = {
      type: login,
      payload: user,
    };

    dispatch(action);
    navigate(lastPath); //Replace(Mueve el History del navegador)
  };
  return (
    <div className="container mt-5">
      <h1>LoginScreen</h1>
      <hr />
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default LoginScreen;
