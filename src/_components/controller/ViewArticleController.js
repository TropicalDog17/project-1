import { useRecoilValue } from "recoil";
import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { authAtom } from "../../state";
import { getArticle } from "../../common";
import { ViewArticle } from "../view";
import ErrorPage from "../../ErrorPage";
export { ViewArticleController };
function ViewArticleController() {
  const { articleId } = useParams();
  const authToken = useRecoilValue(authAtom);
  const [article, setArticle] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchArticle() {
      const data = await getArticle(articleId, authToken);
      if (!data) {
        navigate("/error", { replace: true });
      }
      setArticle(data);
    }
    fetchArticle();
  }, []);

  return <ViewArticle article={article} />;
}
