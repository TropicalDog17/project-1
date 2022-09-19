import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../state";
import Navbar from "./ui/Navbar";

export const HomeLayout = () => {
  const user = useRecoilValue(authAtom);

  useEffect(() => {
    if (user) {
      <Navigate to="/" />;
    }
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
};
