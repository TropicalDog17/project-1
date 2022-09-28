import React from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { PaginationComponent } from "../ui";
import { ArticleGrid } from "../view/ArticleGrid";
import { articleIndexAtom } from "../../state";
function ArticleGridController() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleIndex, setArticleIndex] = useRecoilState(articleIndexAtom);

  return (
    <React.Fragment>
      <ArticleGrid
        onDeleteClick={onDeleteClick}
        handleClose={handleClose}
        handleDelete={handleDelete}
        isModalOpen={isModalOpen}
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
    deleteArticle();
    setArticleIndex(-1);
    setIsModalOpen(false);
  }

  function deleteArticle() {
    const newArticles = articles.filter(
      (article) => article !== articles[articleIndex]
    );
    // const newCurrentPage = currentPage.filter(
    //   (article) => article !== currentPage[articleIndex]
    // );
    setArticles(newArticles);
    localStorage.setItem("article", JSON.stringify(newArticles));
  }
}
export { ArticleGridController };
