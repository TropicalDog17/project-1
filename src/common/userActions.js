import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, usersAtom } from "../state";
import { useNavigate, Navigate } from "react-router-dom";
export { useUserActions };
function useUserActions() {
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);

  return {
    login,
    logout,
  };
  function login(email, password) {
    let user = { email: email, password: password };
    user.authData = email + ":" + password;
    localStorage.setItem("user", JSON.stringify(user));
    return <Navigate to="/" />;
  }
  function logout() {
    localStorage.removeItem("user");
    setAuth(null);
    return <Navigate to="/" replace={true} />;
  }
  function deleteArticle() {}
}
