import { useNavigate, Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { authAtom } from "../../state";
import * as yup from "yup";
import { Login } from "../view";
import axios from "axios";
import qs from "qs";
import { Register } from "../view";
function RegisterController() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const [isFail, setIsFail] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);
  function register(email, password) {
    let user = { username: email, password: password }; //Api model has username as field
    let schema = yup.object().shape({
      username: yup.string().email().required(),
      password: yup.string().required(),
    });
    schema
      .isValid(user)
      .then(async function (valid) {
        if (!valid) {
          setIsFail(true);
        }
        try {
          let axiosConfig = {
            headers: {
              "content-type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
          };
          const response = await axios.post(
            "http://localhost:5000/users",
            qs.stringify(user),
            axiosConfig
          );
          const authToken = response.data.data.access_token;
          console.log(authToken);
          if (!authToken) {
            setIsFail(true);
          }
          localStorage.setItem("auth", authToken);
          setAuth(authToken);
          navigate("/");
        } catch (err) {
          setIsFail(true);
          console.log(err);
        }
      })
      .catch(function (err) {
        console.log(err);
        navigate("/");
      });
  }
  return <Register register={register} isFail={isFail} />;
}
export { RegisterController };
