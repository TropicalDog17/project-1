import { useNavigate, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useState, useEffect } from "react";
import { useUserActions } from "../common";
import Form from "react-bootstrap/Form";
import { InputEmail, InputPassword, SubmitButton } from "../_components/form";
import { authAtom } from "../state";
import { Formik } from "formik";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useRecoilValue(authAtom);
  const { isFail, login } = useUserActions();
  const [user, setUser] = useState({ email: "", password: "" });
  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    login(user.email, user.password);
  }
  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }
  return (
    <Form
      className="mx-auto"
      style={{ width: "500px" }}
      onSubmit={onSubmit}
      noValidate
    >
      <InputEmail handleChange={handleChange} value={user.email} />
      <InputPassword handleChange={handleChange} value={user.password} />
      {isFail && (
        <p className="text-danger">An error occurred when trying to login</p>
      )}
      <SubmitButton />
    </Form>
  );
}
export { LoginPage };
