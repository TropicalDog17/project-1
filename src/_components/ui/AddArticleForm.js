import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { SubmitButton } from "../form/SubmitButton";
import { TextInput } from "../form/TextInput";
import { useSubmitForm } from "../../hooks";
export { AddArticleForm };
function AddArticleForm({ articleId }) {
  const [newArticle, setNewArticle] = useState({
    link: "",
    title: "",
    content: "",
  });
  const { isFail, addArticle } = useSubmitForm(newArticle);

  function onSubmit(e) {
    e.preventDefault();
    addArticle(newArticle);
  }
  function handleChange(e) {
    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Form className="mx-auto" style={{ width: "500px" }} onSubmit={onSubmit}>
      <h1>Add Article</h1>
      <TextInput
        label="link"
        value={newArticle.link}
        handleChange={handleChange}
      />
      <TextInput
        label="title"
        value={newArticle.title}
        handleChange={handleChange}
      />
      <TextInput
        label="content"
        value={newArticle.content}
        handleChange={handleChange}
      />
      {isFail && <p className="text-danger">Something wrong happened</p>}

      <SubmitButton />
    </Form>
  );
}
