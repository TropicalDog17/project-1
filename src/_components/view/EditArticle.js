import Form from "react-bootstrap/Form";
import { SubmitButton } from "../form/SubmitButton";
import { TextInput } from "../form/TextInput";

export { EditArticle };
function EditArticle({
  editArticle,
  article,
  handleChange,
  isFail,
  errMessage,
}) {
  function onSubmitWrapped(e) {
    e.preventDefault();
    editArticle();
  }

  return (
    <Form
      className="mx-auto"
      style={{ width: "500px" }}
      onSubmit={onSubmitWrapped}
    >
      <h1>Edit article</h1>
      <TextInput
        label="link"
        value={article.link || ""}
        handleChange={handleChange}
      />
      <TextInput
        label="title"
        value={article.title || ""}
        handleChange={handleChange}
      />
      <TextInput
        label="content"
        value={article.content || ""}
        handleChange={handleChange}
      />
      {isFail && <p className="text-danger">{errMessage}</p>}
      <SubmitButton />
    </Form>
  );
}
