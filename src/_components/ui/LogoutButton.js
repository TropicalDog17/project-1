import * as React from "react";
import { Nav } from "react-bootstrap";
import { useLogout } from "../../hooks";
export { LogoutButton };
function LogoutButton() {
  const logout = useLogout();
  return (
    <Nav.Item as="li" className="" onClick={logout}>
      <Nav.Link
        eventKey="link-2"
        className="bg-danger m-2 pe-3 ps-3 text-light"
      >
        Logout
      </Nav.Link>
    </Nav.Item>
  );
}
