import * as React from "react";
import { Nav } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
export default function Navbar() {
  return (
    <Nav
      className="justify-content-between bg-primary mb-5"
      activeKey="/"
      as="ul"
    >
      <Nav.Item as="li" className="m-2 pe-3 ps-3">
        <Nav.Link href="/" eventKey="link-1" className="text-white">
          FOSEC
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li" className="bg-success m-2 pe-3 ps-3">
        <Nav.Link href="/article/add" eventKey="link-2" className="text-light">
          Add Article
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li" className="bg-success m-2 pe-3 ps-3">
        <Nav.Link href="/login" eventKey="link-2" className="text-light">
          Login
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
