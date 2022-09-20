import { useRecoilValue, selector, useSetRecoilState } from "recoil";
import { articleAtom, articleIndexAtom } from "../state/articles";
import { useParams } from "react-router-dom";
import { singleArticleState } from "../state/articles";
import React, { useEffect } from "react";
export default function ArticlePage() {
  const { articleId } = useParams();
  const setArticleIndex = useSetRecoilState(articleIndexAtom);
  useEffect(() => {
    setArticleIndex(articleId);
  }, []);
  const article = useRecoilValue(singleArticleState);
  return (
    <div className="p-5">
      <h1 className="mt-1">{article.title}</h1>
      <p className="mt-3">{article.content}</p>
    </div>
  );
}
