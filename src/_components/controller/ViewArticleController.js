import { useRecoilValue } from "recoil";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { authAtom } from "../../state";
import { getArticle } from "../../common";
import { ViewArticle } from "../view";
export { ViewArticleController };
function ViewArticleController() {
  const { articleId } = useParams();
  const authToken = useRecoilValue(authAtom);
  const [article, setArticle] = useState({});
  useEffect(() => {
    async function fetchArticle() {
      const data = await getArticle(articleId, authToken);
      setArticle(data);
    }
    fetchArticle();
  });
  return <ViewArticle article={article} />;
}
