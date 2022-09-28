import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../state";
import React, { useState } from "react";
export { Article };
function Article({ articleId, link, title, content, onDeleteClick }) {
  const isAuth = useRecoilValue(authAtom);
  return (
    <React.Fragment>
      <Card
        style={{ width: "15rem", height: "20rem" }}
        className="position-relative"
      >
        <Card.Body>
          <Card.Title>{shortenTitle(title)}</Card.Title>
          <Card.Text>{shortenContent(content)}</Card.Text>
          <div className="position-absolute bottom-0 m-3 d-flex flex-column align-items-center">
            <Link variant="primary" to={`/article/${articleId}`}>
              View more
            </Link>
            {isAuth && (
              <div>
                <Button
                  variant="success"
                  href={`/article/edit/${articleId}`}
                  className="m-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="m-2"
                  onClick={() => onDeleteClick(articleId)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

function shortenTitle(title) {
  if (title.length < 30) return title;
  return title.slice(0, 30) + "...";
}
function shortenContent(content) {
  if (content.length < 100) return content;
  return content.slice(0, 100) + "...";
}
