import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Article } from "./ArticleCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { articleAtom } from "../../state/articles";
import { DeleteModal } from "../ui/DeleteModal";
import React, { useState } from "react";
import { currentPageIndexSelector } from "../../state";

export { ArticleGrid };
function ArticleGrid({
  onDeleteClick,
  isModalOpen,
  handleClose,
  handleDelete,
}) {
  const [articles, setArticles] = useRecoilState(articleAtom);
  const currentPageIndex = useRecoilValue(currentPageIndexSelector);
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
        {currentPageIndex.map((idx) => (
          <Col key={idx}>
            <Article
              articleId={articles[idx].id}
              {...articles[idx]}
              onDeleteClick={onDeleteClick}
            />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}
