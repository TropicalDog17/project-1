export { SubmitButton };
import Button from "react-bootstrap/Button";

function SubmitButton({ isSubmitting }) {
  return (
    <Button variant="primary" type="submit" disabled={isSubmitting}>
      {isSubmitting && (
        <span className="spinner-border spinner-border-sm mr-1"></span>
      )}
      Submit
    </Button>
  );
}
