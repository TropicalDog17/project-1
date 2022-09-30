import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Article } from "./ArticleCard";
import { useRecoilState, useRecoilValue } from "recoil";
import { articleAtom } from "../../state/articles";
import { DeleteModal } from "../ui/DeleteModal";
import React, { useState } from "react";
import { currentPageIndexSelector } from "../../state";
import { ErrorModal } from "../ui";

export { ArticleGrid };
function ArticleGrid({
  onDeleteClick,
  isModalOpen,
  handleClose,
  handleDelete,
  articles,
  isFail,
  handleErrorClose,
}) {
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
      {isFail && (
        <ErrorModal isModalOpen={isFail} handleClose={handleErrorClose} on />
      )}
      <Row xs={2} md={3} lg={4} xl={5} className="g-3 m-2">
        {currentPageIndex.map((idx) => (
          <Col key={idx}>
            <Article
              articleId={articles[idx].id}
              {...articles[idx]}
              onDeleteClick={() => onDeleteClick(articles[idx].id)}
            />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
}
