import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { articleIndexAtom, authAtom, singleArticleState } from "../../state";
import { AddArticle } from "../view";
function AddArticleController() {
  let navigate = useNavigate();
  const authToken = useRecoilValue(authAtom);
  const [isFail, setIsFail] = useState(false);
  const [article, setArticle] = useState({ link: "", title: "", content: "" });
  const [errMessage, setErrMessage] = useState("");

  function handleChange(e) {
    setArticle({
      ...article,
      [e.target.name]: e.target.value,
    });
  }
  let schema = yup.object().shape({
    link: yup.string().required(),
    title: yup.string().required(),
    content: yup.string().required(),
  });
  function addArticle() {
    schema.isValid(article).then(async function (valid) {
      if (!valid) {
        setIsFail(true);
        // return <Navigate to="/article/add" />;
      } else {
        try {
          const response = await axios.post(
            `http://localhost:5000/articles/`,
            { ...article },
            { headers: { Authorization: `Bearer ${authToken}` } }
          );
          setIsFail(false);
          alert("Article added successfully");
          navigate("/");
        } catch (err) {
          setIsFail(true);
          setErrMessage(err.message);
        }
      }
    });
  }
  return (
    <AddArticle
      article={article}
      addArticle={addArticle}
      handleChange={handleChange}
      isFail={isFail}
      errMessage={errMessage}
    />
  );
}
export { AddArticleController };
