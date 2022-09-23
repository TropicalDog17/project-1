import { useRecoilValue, useSetRecoilState } from "recoil";
import { authAtom, usersAtom } from "../state";
import { useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
export { useUserActions };
function useUserActions() {
  const [isFail, setIsFail] = useState(false);
  const setAuth = useSetRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const navigate = useNavigate();
  return {
    isFail,
    login,
    logout,
  };
  function login(email, password) {
    let user = { email: email, password: password };
    let schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    schema
      .isValid(user)
      .then(function (valid) {
        if (!valid) {
          setIsFail(true);
        } else {
          const authToken = email + ":" + password;
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("auth", authToken);
          setAuth(authToken);
          navigate("/");
        }
      })
      .catch(function (err) {
        console.log(err);
        return <Navigate to="/" />;
      });
  }
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("auth");
    setAuth(null);
    return <Navigate to="/" replace={true} />;
  }
  function deleteArticle() {}
}
