import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitButton } from "../form/SubmitButton";
import { TextInput } from "../form/TextInput";
import {
  singleArticleState,
  articleIndexAtom,
  articleAtom,
} from "../../state/articles";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { replaceItemAtIndex } from "../../common/utils";
import { useSubmitForm } from "../../hooks";
export { EditArticleForm };
function EditArticleForm({ articleId }) {
  const setArticleIndex = useSetRecoilState(articleIndexAtom);

  useEffect(() => {
    setArticleIndex(articleId);
  }, []);
  const [article, setArticle] = useRecoilState(singleArticleState);
  const { isFail, editArticle } = useSubmitForm(article);
  function onSubmit(e) {
    e.preventDefault();
    editArticle();
  }
  function handleChange(e) {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <Form className="mx-auto" style={{ width: "500px" }} onSubmit={onSubmit}>
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
      <SubmitButton />
    </Form>
  );
}
