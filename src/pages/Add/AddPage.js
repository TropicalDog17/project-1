import * as React from "react";
import { Outlet } from "react-router-dom";
export default function AddPage() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
