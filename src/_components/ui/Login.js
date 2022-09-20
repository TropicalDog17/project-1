import { InputEmail } from "../form/InputEmail";
import { InputPassword } from "../form/InputPassword";
import { SubmitButton } from "../form/SubmitButton";
import { useEffect, useState } from "react";
import { authAtom } from "../../state";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { useUserActions } from "../../common/userActions";
import { useRecoilValue } from "recoil";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Login() {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const [user, setUser] = useState({ email: "", password: "" });
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  function onSubmit(e) {
    let myUser = { ...user };
    myUser.authData = "123";
    localStorage.setItem("user", JSON.stringify(myUser));
    return <Navigate to="/edit" />;
  }
  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <Form className="mx-auto" style={{ width: "500px" }} onSubmit={onSubmit}>
      <InputEmail handleChange={handleChange} value={user.email} />
      <InputPassword handleChange={handleChange} value={user.password} />
      <SubmitButton />
    </Form>
  );
}
export { Login };
