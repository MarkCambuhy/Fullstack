import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem("token");
  return user != null ? children : <Navigate to={"/"} />;
};

export default PrivateRoute;
