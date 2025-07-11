// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Wait for auth context to load
  if (isLoading) return null;

  let role = user?.role;

  // Fallback for page reload (if context lost, but token exists)
  if (!role) {
    const token = localStorage.getItem("token");
    if (!token) return <Navigate to="/" />;
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      return <Navigate to="/" />;
    }
  }

  if (!isAuthenticated && !role) return <Navigate to="/" />;

  return role === requiredRole ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
