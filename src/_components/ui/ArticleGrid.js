import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Article } from "./Article";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { articleAtom, articleIndexAtom } from "../../state/articles";
import { DeleteModal } from "./DeleteModal";
import React, { useState } from "react";
import { useUserActions } from "../../common";
export { ArticleGrid };
function ArticleGrid() {
  const [articles, setArticles] = useRecoilState(articleAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleIndex, setArticleIndex] = useRecoilState(articleIndexAtom);
  return (
    <React.Fragment>
      {isModalOpen && (
        <DeleteModal
          isModalOpen={isModalOpen}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      )}
      <Row xs={2} md={5} className="g-3 m-2">
        {articles.map((article, idx) => (
          <Col key={idx}>
            <Article
              articleId={idx}
              {...article}
              onDeleteClick={onDeleteClick}
            />
          </Col>
        ))}
      </Row>
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
    setArticles(newArticles);
    localStorage.setItem("article", JSON.stringify(newArticles));
  }
}
