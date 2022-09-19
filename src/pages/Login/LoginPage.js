import * as React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Login } from "../../_components/ui/Login";

export default function LoginPage() {
  const { login } = useAuth();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return <Login handleSubmit={handleSubmit} />;
}
