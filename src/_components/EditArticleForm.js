import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function EditArticleForm() {
  return (
    <Form className="mx-auto" style={{ width: "500px" }}>
      <Form.Group className="mb-3" controlId="formBasicTitle">
        <Form.Label>Link</Form.Label>
        <Form.Control type="text" placeholder="Enter Link" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter Title" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Content</Form.Label>
        <Form.Control type="text" placeholder="Enter Content" />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="danger" type="submit">
          Reset
        </Button>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}
export default EditArticleForm;
