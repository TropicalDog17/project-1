export { InputEmail };
import Form from "react-bootstrap/Form";
function InputEmail({ handleChange, value }) {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={(e) => handleChange(e)}
        value={value}
      />
    </Form.Group>
  );
}
