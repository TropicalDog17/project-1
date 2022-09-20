import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Article } from "./Article";
import { useRecoilValue } from "recoil";
import { articleAtom } from "../../state/articles";
export { ArticleGrid };
function ArticleGrid() {
  const articles = useRecoilValue(articleAtom);
  console.log(articles);
  return (
    <Row xs={2} md={5} className="g-3 m-2">
      {articles.map((article, idx) => (
        <Col key={idx}>
          <Article articleId={idx} {...article} />
        </Col>
      ))}
    </Row>
  );
}
