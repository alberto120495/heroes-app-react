import React from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ isAuthenticated, component: Component, ...rest }) {
  const { q = "" } = queryString.parse(rest.location.search);
  const search = !q
    ? rest.location.pathname
    : `${rest.location.pathname}?q=${q}`;

  localStorage.setItem("lastPath", search);
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
export default PrivateRoute;
