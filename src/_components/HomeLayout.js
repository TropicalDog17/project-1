import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../state";
import Navbar from "./ui/Navbar";

export const HomeLayout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
};
