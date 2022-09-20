export { InputPassword };
import Form from "react-bootstrap/Form";
function InputPassword({ handleChange, value }) {
  return (
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => handleChange(e)}
        value={value}
      />
    </Form.Group>
  );
}
