import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditArticle } from "../view";
import * as yup from "yup";
import axios from "axios";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { articleIndexAtom, authAtom, singleArticleState } from "../../state";
function EditArticleController() {
  let { articleId } = useParams();
  let navigate = useNavigate();
  const authToken = useRecoilValue(authAtom);
  const [isFail, setIsFail] = useState(false);
  const [article, setArticle] = useState({ link: "", title: "", content: "" });
  const [errMessage, setErrMessage] = useState("");
  async function getArticle() {
    try {
      let response = await axios.get(
        `http://localhost:5000/articles/${articleId}`,
        { headers: { Authorizaton: `Bearer ${authToken}` } }
      );
      return setArticle(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getArticle();
  }, []);
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
  function editArticle() {
    schema.isValid(article).then(async function (valid) {
      if (!valid) {
        setIsFail(true);
        // return <Navigate to="/article/add" />;
      } else {
        try {
          const response = await axios.put(
            `http://localhost:5000/articles/${articleId}`,
            { ...article },
            { headers: { Authorization: `Bearer ${authToken}` } }
          );
          setIsFail(false);
          alert("Article edited successfully");
          navigate("/");
        } catch (err) {
          setIsFail(true);
          setErrMessage(err.message);
        }
      }
    });
  }
  return (
    <EditArticle
      article={article}
      editArticle={editArticle}
      handleChange={handleChange}
      isFail={isFail}
      errMessage={errMessage}
    />
  );
}
export { EditArticleController };
