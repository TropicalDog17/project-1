import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { InputEmail, InputPassword, SubmitButton } from "../form";
function Register({ register, isFail }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  function onSubmitWrapped(e) {
    e.preventDefault();
    register(user.email, user.password);
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
      onSubmit={onSubmitWrapped}
      noValidate
    >
      <h1>Register</h1>
      <InputEmail handleChange={handleChange} value={user.email} />
      <InputPassword handleChange={handleChange} value={user.password} />

      {isFail && (
        <p className="text-danger">An error occurred when trying to register</p>
      )}
      <SubmitButton />
    </Form>
  );
}
export { Register };
