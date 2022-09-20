import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SubmitButton } from "../form/SubmitButton";
import { TextInput } from "../form/TextInput";
import {
  singleArticleState,
  articleIndexAtom,
  articleAtom,
} from "../../state/articles";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { replaceItemAtIndex } from "../../common/utils";
import { useSubmitForm } from "../../hooks";
export { EditArticleForm };
function EditArticleForm({ articleId }) {
  const [isFail, editArticle] = useSubmitForm(newArticle);

  const setArticleIndex = useSetRecoilState(articleIndexAtom);
  useEffect(() => {
    setArticleIndex(articleId);
  }, []);
  const article = useRecoilValue(singleArticleState);
  const setArticles = useSetRecoilState(articleAtom); //Handle updating articles list
  const [newArticle, setNewArticle] = useState({
    link: article.link,
    title: article.title,
    content: article.content,
  });

  function handleChange(e) {
    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <Form className="mx-auto" style={{ width: "500px" }} onSubmit={onSubmit}>
      <h1>Article id {articleId}</h1>
      <TextInput
        label="link"
        value={newArticle.link || ""}
        handleChange={handleChange}
      />
      <TextInput
        label="title"
        value={newArticle.title || ""}
        handleChange={handleChange}
      />
      <TextInput
        label="content"
        value={newArticle.content || ""}
        handleChange={handleChange}
      />
      <SubmitButton />
    </Form>
  );
}
