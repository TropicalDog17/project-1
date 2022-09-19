import { useSetRecoilState } from "recoil";
import { authAtom, usersAtom } from "../state";
import { Navigate } from "react-router-dom";
export { useUserActions };
function useUserActions() {
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);

  return {
    login,
    logout,
  };
}
function login(email, password) {
  let user = { email: email, password: password };
  user.authData = email + ":" + password;
  alert(user.authData);
  localStorage.setItem("user", JSON.stringify(user));
  <Navigate to="/" replace={true} />;
}
function logout() {
  localStorage.removeItem("user");
  setAuth(null);
  <Navigate to="/" replace={true} />;
}
