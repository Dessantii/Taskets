
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types'


function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated ? children : <Navigate to="/login" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.func.isRequired,
}
export default PrivateRoute;
