import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { SubmitButton } from "../form/SubmitButton";
import { TextInput } from "../form/TextInput";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { articleAtom } from "../../state/articles";
export { AddArticleForm };
function AddArticleForm({ articleId }) {
  const [newArticle, setNewArticle] = useState({
    link: "",
    title: "",
    content: "",
  });
  const [isFail, addArticle] = useSubmitForm(newArticle);

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
function useSubmitForm(state) {
  const [isFail, setIsFail] = useState(false);
  const [articles, setArticle] = useRecoilState(articleAtom);
  const navigate = useNavigate();
  let schema = yup.object().shape({
    link: yup.string().required(),
    title: yup.string().required(),
    content: yup.string().required(),
  });
  function addArticle(state) {
    schema.isValid(state).then(function (valid) {
      if (!valid) {
        setIsFail(true);
        // return <Navigate to="/article/add" />;
      } else {
        console.log(state);
        const newArticles = [...articles, state];
        console.log(newArticles);
        localStorage.setItem("article", JSON.stringify(newArticles));
        setArticle(newArticles);
        setIsFail(false);
        alert("Article added successfully");
        navigate("/");
      }
    });
  }

  return [isFail, addArticle];
}
