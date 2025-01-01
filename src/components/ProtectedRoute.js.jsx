// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  console.log("Token is ____________", token);
  if (!token) {
    return <Navigate to="/" />;
  }

  let role;
  try {
    const decodedToken = jwtDecode(token);
    role = decodedToken.role; // Assuming 'role' is a field in your token
  } catch (error) {
    return <Navigate to="/" />;
  }

  return role === requiredRole ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
