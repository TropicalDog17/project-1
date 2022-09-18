import * as React from "react";
import { Outlet } from "react-router-dom";
export default function EditPage() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}
