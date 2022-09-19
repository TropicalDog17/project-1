import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./ui/Navbar";

export const HomeLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
};
