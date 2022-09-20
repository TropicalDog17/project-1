import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
export { Article as Article };
function Article({ articleId, link, title, content }) {
  return (
    <Card
      style={{ width: "15rem", height: "20rem" }}
      className="position-relative"
    >
      <Card.Body>
        <Card.Title>{shortenTitle(title)}</Card.Title>
        <Card.Text>{shortenContent(content)}</Card.Text>
        <div className="position-absolute bottom-0 m-3">
          <Button variant="primary" href={`/article/${articleId}`}>
            View more
          </Button>
          <Button
            variant="success"
            href={`/article/edit/${articleId}`}
            className="m-2"
          >
            Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
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
