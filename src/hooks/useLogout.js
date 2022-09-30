import { useSetRecoilState } from "recoil";
import { authAtom, usersAtom } from "../state";
import { useNavigate, Navigate } from "react-router-dom";

export { useLogout };
function useLogout() {
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("auth");
    setAuth(null);
    return <Navigate to="/" replace={true} />;
  }
  return logout;
}
