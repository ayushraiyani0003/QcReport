import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Solution 1: Using useState to prevent re-renders from causing issues
const ProtectedRoute = ({ children }) => {
    // const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading

    // useEffect(() => {
    //     const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    //     setIsLoggedIn(loggedInStatus);
    // }, []);

    // // Show loading while checking auth status
    // if (isLoggedIn === null) {
    //     return <div>Loading...</div>;
    // }

    // if (!isLoggedIn) {
    //     return <Navigate to="/login" replace />;
    // }

    return children;
};

export default ProtectedRoute;

// Alternative Solution 2: Using useMemo to memoize the result
/*
import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useMemo(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
*/

// Alternative Solution 3: Using a custom hook for auth state
/*
import React from "react";
import { Navigate } from "react-router-dom";

// Custom hook to manage auth state
const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const login = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
*/
