import * as React from "react";
import { Nav } from "react-bootstrap";
import { useUserActions } from "../../common/userActions";
export { LogoutButton };
function LogoutButton() {
  const { logout } = useUserActions();
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
