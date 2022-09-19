export { InputPassword };
import Form from "react-bootstrap/Form";
function InputPassword({ handleChange }) {
  return (
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
    </Form.Group>
  );
}
