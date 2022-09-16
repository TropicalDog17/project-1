import * as React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./_components/ui/Navbar";

export default function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}