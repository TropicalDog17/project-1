import * as React from "react";
import { Nav } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../state";
import { LogoutButton, LoginButton, RegisterButton } from "./";
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
      <div className="d-flex">
        {!isAuth && <RegisterButton />}
        {!isAuth ? <LoginButton /> : <LogoutButton />}
      </div>
    </Nav>
  );
}
