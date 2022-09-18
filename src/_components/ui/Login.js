import { InputEmail } from "../form/InputEmail";
import { InputPassword } from "../form/InputPassword";
import { SubmitButton } from "../form/SubmitButton";
import Form from "react-bootstrap/Form";
function Login() {
  return (
    <Form className="mx-auto" style={{ width: "500px" }}>
      <InputEmail />
      <InputPassword />
      <SubmitButton />
    </Form>
  );
}
export { Login };
