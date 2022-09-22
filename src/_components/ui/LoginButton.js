import * as React from "react";
import { Nav } from "react-bootstrap";
export { LoginButton };
function LoginButton() {
  return (
    <Nav.Item as="li" className="">
      <Nav.Link
        href="/login"
        eventKey="link-2"
        className="bg-success m-2 pe-3 ps-3 text-light"
      >
        Login
      </Nav.Link>
    </Nav.Item>
  );
}
