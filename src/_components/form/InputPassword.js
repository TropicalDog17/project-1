export { InputPassword };
import Form from "react-bootstrap/Form";

function InputPassword() {
  return (
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  );
}
