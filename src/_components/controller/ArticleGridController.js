import React, { useEffect } from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PaginationComponent } from "../ui";
import { ArticleGrid } from "../view/ArticleGrid";
import { articleAtom, articleIndexAtom, authAtom } from "../../state";
import axios from "axios";
function ArticleGridController() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleIndex, setArticleIndex] = useRecoilState(articleIndexAtom);
  const [article, setArticle] = useRecoilState(articleAtom);
  const authToken = useRecoilValue(authAtom);
  const [articles, setArticles] = useRecoilState(articleAtom);
  const [isFail, setIsFail] = useState(false);
  return (
    <React.Fragment>
      <ArticleGrid
        onDeleteClick={onDeleteClick}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleErrorClose={handleErrorClose}
        isModalOpen={isModalOpen}
        articles={articles}
        isFail={isFail}
      />
      <PaginationComponent />
    </React.Fragment>
  );
  function onDeleteClick(articleId) {
    setIsModalOpen(true);
    setArticleIndex(parseInt(articleId));
  }
  function handleClose() {
    setIsModalOpen(false);
    setArticleIndex(-1);
  }
  function handleDelete() {
    deleteArticle(articleIndex, authToken);
    setArticleIndex(-1);
    setIsModalOpen(false);
  }
  function handleErrorClose() {
    setIsFail(false);
  }
  async function deleteArticle(articleId, authToken) {
    try {
      console.log(authToken);

      const response = await axios.delete(
        `http://localhost:5010/articles/${articleId}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setArticles(articles.filter((article) => article.id !== articleId));
    } catch (err) {
      setIsFail(true);
      console.log(err);
    }
  }
}
export { ArticleGridController };
