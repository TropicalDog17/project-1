import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitButton } from "../form/SubmitButton";
import { TextInput } from "../form/TextInput";
export { EditArticleForm };
function EditArticleForm({ articleId }) {
  return (
    <Form className="mx-auto" style={{ width: "500px" }}>
      <h1>Article id {articleId}</h1>
      <TextInput label="link" />
      <TextInput label="title" />
      <TextInput label="content" />
      <SubmitButton />
    </Form>
  );
}
