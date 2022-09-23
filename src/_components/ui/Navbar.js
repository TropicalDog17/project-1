import * as React from "react";
import { Nav } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../state";
import { useUserActions } from "../../common/userActions";
import { LogoutButton, LoginButton } from "./";
export default function Navbar() {
  const isAuth = useRecoilValue(authAtom);

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
      <Nav.Item as="li" className="">
        <Nav.Link
          href="/article/add"
          eventKey="link-2"
          className="bg-success m-2 pe-3 ps-3 text-light"
        >
          Add Article
        </Nav.Link>
      </Nav.Item>
      {!isAuth ? <LoginButton /> : <LogoutButton />}
    </Nav>
  );
}
