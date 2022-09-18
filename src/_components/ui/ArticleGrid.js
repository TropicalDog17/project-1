import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Article } from "./Article";

export { ArticleGrid };
function ArticleGrid() {
  return (
    <Row xs={2} md={5} className="g-3 m-2">
      {Array.from({ length: 10 }).map((_, idx) => (
        <Col key={idx}>
          <Article />
        </Col>
      ))}
    </Row>
  );
}
