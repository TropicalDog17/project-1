export { TextInput };
function TextInput({ label }) {
  return (
    <Form.Group className="mb-3" controlId="formBasicTitle">
      <Form.Label>{label}</Form.Label>
      <Form.Control type="text" placeholder={"Enter " + label} />
    </Form.Group>
  );
}
