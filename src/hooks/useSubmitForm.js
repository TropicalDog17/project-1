import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { articleAtom } from "../state/articles";
import { useEffect, useState } from "react";
import * as yup from "yup";

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
  function editArticle() {
    schema.isValid(state).then(function (valid) {
      if (!valid) {
        setIsFail(true);
        // return <Navigate to="/article/add" />;
      } else {
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
  return [isFail, addArticle, editArticle];
}
export { useSubmitForm };
