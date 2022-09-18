export { InputEmail };
import Form from "react-bootstrap/Form";

function InputEmail() {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter Email" />
    </Form.Group>
  );
}
