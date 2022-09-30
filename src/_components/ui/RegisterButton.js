import * as React from "react";
import { Nav } from "react-bootstrap";
export { RegisterButton };
function RegisterButton() {
  return (
    <Nav.Item as="li" className="">
      <Nav.Link
        href="/register"
        eventKey="link-2"
        className="bg-secondary m-2 pe-3 ps-3 text-light"
      >
        Register
      </Nav.Link>
    </Nav.Item>
  );
}
