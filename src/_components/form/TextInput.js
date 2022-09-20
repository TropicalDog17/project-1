import Form from "react-bootstrap/Form";
export { TextInput };
function TextInput({ label, value, handleChange }) {
  const newLabel = label.charAt(0).toUpperCase() + label.slice(1); //Capitalize first letter
  return (
    <Form.Group className="mb-3" controlId={`formBasic${newLabel}`}>
      <Form.Label>{newLabel}</Form.Label>
      <Form.Control
        type="text"
        placeholder={"Enter " + label}
        onChange={(e) => handleChange(e)}
        value={value}
        name={label}
      />
    </Form.Group>
  );
}
