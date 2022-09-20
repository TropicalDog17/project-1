import * as React from "react";
import { Nav } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../state";
import { useUserActions } from "../../common/userActions";
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
      <Nav.Item as="li" className="bg-success m-2 pe-3 ps-3">
        <Nav.Link href="/article/add" eventKey="link-2" className="text-light">
          Add Article
        </Nav.Link>
      </Nav.Item>
      {!isAuth ? <LoginButton /> : <LogoutButton />}
    </Nav>
  );
}
function LoginButton() {
  return (
    <Nav.Item as="li" className="bg-success m-2 pe-3 ps-3">
      <Nav.Link href="/login" eventKey="link-2" className="text-light">
        Login
      </Nav.Link>
    </Nav.Item>
  );
}
function LogoutButton() {
  const { logout } = useUserActions();
  return (
    <Nav.Item as="li" className="bg-danger m-2 pe-3 ps-3" onClick={logout}>
      <Nav.Link eventKey="link-2" className="text-light">
        Logout
      </Nav.Link>
    </Nav.Item>
  );
}
