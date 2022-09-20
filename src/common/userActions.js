import { useSetRecoilState } from "recoil";
import { authAtom, usersAtom } from "../state";
import { useNavigate, Navigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
export { useUserActions };
function useUserActions() {
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);

  return {
    login,
    logout,
  };
  function login(email, password) {
    const navigate = useNavigate();
    let user = { email: email, password: password };
    user.authData = email + ":" + password;
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/edit");
  }
  function logout() {
    localStorage.removeItem("user");
    setAuth(null);
    return <Navigate to="/" replace={true} />;
  }
}
